import * as THREE from 'three';
export const CYAN=0x5ce5ed, VIOLET=0xa087ff, WHITE=0xdffaff;
export function material(color=CYAN,opacity=1) { return new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.55,metalness:.35,roughness:.3,transparent:opacity<1,opacity}); }
export function sphere(parent,r,pos,color=CYAN,opacity=1) { const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,20,14),material(color,opacity));mesh.position.set(...pos);parent.add(mesh);return mesh; }
export function box(parent,size,pos,color=CYAN,opacity=1){const m=new THREE.Mesh(new THREE.BoxGeometry(...size),material(color,opacity));m.position.set(...pos);parent.add(m);return m;}
export function line(parent,points,color=CYAN,opacity=.8){const geo=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));const m=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity}));parent.add(m);return m;}
export function ring(parent,r,color=CYAN,opacity=.6){const pts=Array.from({length:129},(_,i)=>[Math.cos(i/128*Math.PI*2)*r,Math.sin(i/128*Math.PI*2)*r,0]);return line(parent,pts,color,opacity);}
export function points(parent,data,color=CYAN,size=.035,opacity=.8){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(data,3));const p=new THREE.Points(geo,new THREE.PointsMaterial({color,size,sizeAttenuation:true,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending}));parent.add(p);return p;}
export function disposeTree(group){group.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose();}}});}
