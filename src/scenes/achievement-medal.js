import * as THREE from 'three';

export function createAchievementMedal(){
 const scene=new THREE.Scene(),medal=new THREE.Group();scene.add(medal);
 const gold=new THREE.MeshStandardMaterial({color:0xffcf54,metalness:.85,roughness:.23});
 const inlay=new THREE.MeshStandardMaterial({color:0xe9a92b,metalness:.7,roughness:.36});
 const atom=new THREE.MeshStandardMaterial({color:0xe8fcff,emissive:0x64dfff,emissiveIntensity:1.1,metalness:.3,roughness:.2});
 const disk=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.2,64),gold);disk.rotation.x=Math.PI/2;medal.add(disk);
 const face=new THREE.Mesh(new THREE.CylinderGeometry(.83,.83,.035,64),inlay);face.rotation.x=Math.PI/2;face.position.z=.115;medal.add(face);
 const rim=new THREE.Mesh(new THREE.TorusGeometry(.94,.055,10,64),gold);rim.position.z=.15;medal.add(rim);
 const orbitGeometry=new THREE.TorusGeometry(.49,.024,8,48);
 for(let i=0;i<3;i++){const orbit=new THREE.Mesh(orbitGeometry,atom);orbit.scale.y=.38;orbit.rotation.z=i*Math.PI/3;orbit.position.z=.19;medal.add(orbit);}
 const nucleus=new THREE.Mesh(new THREE.SphereGeometry(.085,16,12),atom);nucleus.position.z=.23;medal.add(nucleus);
 for(const [x,color,rotation]of [[-.28,0x279de6,.24],[.28,0x9865f0,-.24]]){const ribbon=new THREE.Mesh(new THREE.BoxGeometry(.38,.9,.06),new THREE.MeshStandardMaterial({color,roughness:.7}));ribbon.position.set(x,1.1,-.11);ribbon.rotation.z=rotation;medal.add(ribbon);}
 scene.add(new THREE.AmbientLight(0xfff4d8,2.1));
 const key=new THREE.DirectionalLight(0xfff6df,4.5);key.position.set(-2,3,5);scene.add(key);
 const fill=new THREE.PointLight(0x66d5ff,25,20);fill.position.set(3,0,3);scene.add(fill);
 let elapsed=0;
 return {scene,update(dt){if(dt===0){medal.scale.setScalar(1);medal.rotation.set(-.08,.1,0);return;}elapsed+=dt;medal.scale.setScalar(.65+.35*(1-Math.exp(-elapsed*5)));medal.rotation.set(-.08,-.35*Math.exp(-elapsed*4)+Math.sin(elapsed*.8)*.12,Math.sin(elapsed*.55)*.025);}};
}
