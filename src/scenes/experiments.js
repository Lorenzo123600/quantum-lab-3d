import * as THREE from 'three';
import { CYAN,VIOLET,WHITE,sphere,box,line,ring,points } from './primitives.js';
import { sampleOrbital,braggIntensity,doubleSlitIntensity } from '../physics/models.js';

// Every chapter owns one scene graph. Coordinates are visual units, never claimed as SI scale.
export function buildScene(index,state,quality) {
  const group=new THREE.Group();let updater=()=>{}, cached='', elapsed=0;
  const count=quality==='low'?1300:quality==='high'?6500:3200;
  const pointArray=new Float32Array(12000*3);
  function atom(historical=false){
    sphere(group,.25,[0,0,0],WHITE);
    if(historical){
      const rings=[];
      for(let n=1;n<=5;n++){const r=ring(group,.55+n*.36,n===1?CYAN:VIOLET,.35);r.rotation.x=.35;rings.push(r);}
      const electron=sphere(group,.075,[.91,0,0],CYAN);
      const photon=sphere(group,.09,[0,0,0],0xffd479);photon.visible=false;
      updater=t=>{
        rings.forEach((r,i)=>{r.material.opacity=i+1===state.level?.95:.18;});
        const radius=.55+state.level*.36;electron.position.set(Math.cos(t)*radius,Math.sin(t)*radius*Math.cos(.35),Math.sin(t)*radius*Math.sin(.35));
        // The animated marker belongs to a historical representation only.
        const age=state.transitionAt?(performance.now()-state.transitionAt)/1000:10;photon.visible=age<2;
        if(photon.visible){const p=state.transition?.type==='absorção'?3-age*1.5:age*1.5;photon.position.set(p,.4*Math.sin(age*16),0);}
      };
    }else{
      const cloud=points(group,sampleOrbital('1s',count),CYAN,.035,.55);
      cloud.scale.setScalar(1.25);
      const orbit=ring(group,2.1,VIOLET,.28);orbit.rotation.x=1.05;
      const orbit2=ring(group,2.4,CYAN,.2);orbit2.rotation.y=.8;
      updater=t=>{cloud.rotation.y=t*.08;orbit.rotation.z=t*.04;orbit2.rotation.z=-t*.04;group.rotation.y=Math.sin(t*.15)*.12;};
    }
  }
  function wave(parent,offset=[0,0,0],color=CYAN){
    const positions=new Float32Array(181*3);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const w=new THREE.Line(g,new THREE.LineBasicMaterial({color,transparent:true,opacity:.85}));w.position.set(...offset);parent.add(w);
    return (t,k=3,amp=.5,envelope=false)=>{for(let i=0;i<181;i++){const x=(i/180-.5)*7;positions[i*3]=x;positions[i*3+1]=Math.sin(x*k-t*3)*amp*(envelope?Math.exp(-x*x/(4*state.sigma*state.sigma)):1);positions[i*3+2]=0;}g.attributes.position.needsUpdate=true;};
  }
  function apparatus(electrons=false){
    const L=state.L||1.8;
    sphere(group,.2,[-3,0,0],WHITE);box(group,[.6,.6,.6],[-3.3,0,0],0x2b435f);
    const barrier=new THREE.Group();group.add(barrier);
    // Two real openings, made from three solid sections.
    const slabs=[box(barrier,[.12,1.02,1.5],[0,1,0],0x46516b),box(barrier,[.12,.44,1.5],[0,0,0],0x46516b),box(barrier,[.12,1.02,1.5],[0,-1,0],0x46516b)];
    const screen=box(group,[.08,3.4,2.6],[3,0,0],0x234456,.4);
    const p=points(group,pointArray,CYAN,.04,.9);p.geometry.setDrawRange(0,0);
    let texture, panel, patternKey='';
    if(!electrons){
      const image=document.createElement('canvas');image.width=32;image.height=256;
      texture=new THREE.CanvasTexture(image);texture.colorSpace=THREE.SRGBColorSpace;
      panel=new THREE.Mesh(new THREE.PlaneGeometry(2.4,3.1),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,transparent:true,opacity:.95}));
      panel.rotation.y=Math.PI/2;group.add(panel);
    }
    const fronts=[];
    for(let j=0;j<2;j++)for(let i=0;i<8;i++){const r=ring(group,1,CYAN,.2);r.rotation.y=Math.PI/2;r.position.y=j===0?.38:-.38;fronts.push(r);}
    const incoming=wave(group,[ -1.55,0,0],VIOLET);
    updater=t=>{
      const sep=electrons?.76:state.d*3;const half=sep/2;
      slabs[0].position.y=(half+.09+1.5)/2;slabs[0].scale.y=(1.5-half-.09)/1.02;
      slabs[2].position.y=-(half+.09+1.5)/2;slabs[2].scale.y=(1.5-half-.09)/1.02;
      slabs[1].scale.y=Math.max(.02,sep-.18)/.44;
      screen.position.x=electrons?3:1.5+state.L*.5;
      if(panel){
        panel.position.x=screen.position.x+.06;
        const key=[state.lambda,state.L,state.d].join('/');
        if(key!==patternKey){
          const ctx=texture.image.getContext('2d');
          for(let row=0;row<256;row++){
            const y=(row/255-.5)*.024;
            const intensity=doubleSlitIntensity(y,{lambda:state.lambda*1e-9,L:state.L,d:state.d*1e-3,a:40e-6});
            const value=Math.round(255*Math.sqrt(intensity));
            ctx.fillStyle='rgb('+Math.round(value*.25)+','+Math.round(value*.9)+','+value+')';ctx.fillRect(0,row,32,1);
          }
          texture.needsUpdate=true;patternKey=key;
        }
      }
      incoming(t,electrons?6:7-(state.lambda-380)/100,.1);
      for(let i=0;i<fronts.length;i++){const r=((t*.6+(i%8)/8)%1)*2.8;const fr=fronts[i];fr.visible=electrons?!state.electrons.path:state.fronts;fr.scale.setScalar(r+.02);fr.position.x=r*.55;fr.position.y=i<8?half:-half;fr.material.opacity=(1-r/3)*.22;}
      if(electrons){const samples=state.electrons.points;for(let i=0;i<samples.length;i++){pointArray[i*3]=3.13;pointArray[i*3+1]=samples[i][0]*1.55;pointArray[i*3+2]=samples[i][1]*1.15;}p.geometry.attributes.position.needsUpdate=true;p.geometry.setDrawRange(0,samples.length);}
    };
  }
  if(index===0||index===15) {
    if(index===0)atom();
    else {
      const data=new Float32Array(900*3), targets=new Float32Array(900*3);
      for(let i=0;i<900;i++){targets[i*3]=(Math.random()-.5)*6;targets[i*3+1]=(Math.random()-.5)*3;targets[i*3+2]=Math.random()*.15;}
      const detections=points(group,data,CYAN,.045,.9);
      const w=wave(group,[0,0,0],VIOLET);
      updater=t=>{
        const phase=(t%12)/12;
        const blend=phase<.65?THREE.MathUtils.smoothstep(phase,.15,.65):1-THREE.MathUtils.smoothstep(phase,.85,1);
        w(t,3,.65);group.children[1].material.opacity=1-blend;
        for(let i=0;i<900;i++){
          const x=(i/900-.5)*6;
          data[i*3]=x*(1-blend)+targets[i*3]*blend;
          data[i*3+1]=Math.sin(x*3-t*3)*.65*(1-blend)+targets[i*3+1]*blend;
          data[i*3+2]=targets[i*3+2]*blend;
        }
        detections.geometry.attributes.position.needsUpdate=true;
      };
    }
  } else if(index===1){
    const w=wave(group);const dot=sphere(group,.15,[0,0,0],WHITE);
    const cloud=points(group,sampleOrbital('1s',count),VIOLET,.04,.6);
    updater=t=>{w(t);group.children[0].visible=state.mode!=='particle';dot.visible=state.mode!=='wave';cloud.visible=state.mode==='quantum';dot.position.set(state.mode==='particle'?Math.sin(t)*2:Math.sin(Math.floor(t*2)*93)*2,Math.sin(Math.floor(t*2)*47)*.6,0);};
  } else if(index===2) {
    line(group,[[0,-2,0],[0,2,0]],0x4b526b,.4);
    const dots=[];for(let i=0;i<10;i++)dots.push(sphere(group,.06,[-1.8,0,0],VIOLET));
    const rs=[];for(let i=0;i<7;i++){const r=ring(group,.1,CYAN,.5);r.position.x=1.8;rs.push(r);}
    updater=t=>{dots.forEach((d,i)=>{d.visible=state.mode!=='huygens';d.position.set(-3.4+((t*.5+i/10)%1)*2.7,Math.sin(i*6)*.9,0);});rs.forEach((r,i)=>{r.visible=state.mode!=='newton';const s=((t*.2+i/7)%1)*1.4;r.scale.setScalar(s*10);r.material.opacity=(1-s/1.4)*.5;});};
  } else if(index===3||index===9){apparatus(index===9);}
  else if(index===4){
    const steps=[];for(let i=0;i<6;i++)steps.push(box(group,[.65,.15,1],[-2+i*.8,i*.3-1,0],i%2?VIOLET:CYAN));
    const q=sphere(group,.14,[-2,0,0],WHITE);
    updater=t=>{steps.forEach((s,i)=>s.position.y=i*state.frequency/1800*.8-1);const n=Math.floor(t*1.5)%6;q.position.set(-2+n*.8,steps[n].position.y+.25,0);};
  } else if(index===5) {
    box(group,[.18,3,2.5],[0,0,0],0x8796b6);
    const photons=[], electrons=[];
    for(let i=0;i<40;i++){photons.push(sphere(group,.045,[-3,0,0],VIOLET));electrons.push(sphere(group,.045,[1,0,0],CYAN));}
    updater=t=>{
      const active=Math.round(state.intensity*.4);
      photons.forEach((p,i)=>{const phase=(t*.7+i/40)%1;p.visible=i<active;p.position.set(-3+phase*3,Math.sin(i*17)*1.1,Math.cos(i*13)*.8);p.material.color.setHSL(.75-(state.frequency-300)/1500*.2,.9,.65);});
      electrons.forEach((e,i)=>{const phase=(t*(.3+Math.sqrt(state.photo.kinetic)*.25)+i/40)%1;e.visible=i<active&&state.photo.emits;e.position.set(.2+phase*3,Math.sin(i*17)*1.1+phase*.3,Math.cos(i*13)*.8);});
    };
  } else if(index===6)atom(true);
  else if(index===7){
    const w=wave(group);sphere(group,.16,[0,0,0],WHITE);
    box(group,[.5,.5,.5],[2.7,-1.2,0],VIOLET);
    updater=t=>w(t,state.momentum*3,.5);
  } else if(index===8){
    const geo=new THREE.SphereGeometry(.08,10,8), mat=new THREE.MeshStandardMaterial({color:VIOLET,emissive:VIOLET,emissiveIntensity:.5});
    const crystal=new THREE.InstancedMesh(geo,mat,125);const dummy=new THREE.Object3D();let n=0;
    for(let x=0;x<5;x++)for(let y=0;y<5;y++)for(let z=0;z<5;z++){dummy.position.set((x-2)*.4,(y-2)*.4,(z-2)*.4);dummy.updateMatrix();crystal.setMatrixAt(n++,dummy.matrix);}group.add(crystal);
    const beam=line(group,[[-3,-1.5,0],[0,0,0]],CYAN);
    const scatter=line(group,[[0,0,0],[2,2,0]],WHITE);const detector=sphere(group,.18,[2,2,0],CYAN);
    updater=t=>{const angle=state.theta*Math.PI/180;const x=Math.cos(angle)*3,y=Math.sin(angle)*3;detector.position.set(x,y,0);const arr=scatter.geometry.attributes.position.array;arr[3]=x;arr[4]=y;scatter.geometry.attributes.position.needsUpdate=true;scatter.material.opacity=.1+.9*braggIntensity(angle,state.eLambda);beam.material.opacity=.5+Math.sin(t*4)*.2;};
  } else if(index===10){
    const w=wave(group);const curve=line(group,Array.from({length:181},()=>[0,0,0]),VIOLET);
    updater=t=>{w(t,8,.9,true);const a=curve.geometry.attributes.position.array;for(let i=0;i<181;i++){const x=(i/180-.5)*7;a[i*3]=x;a[i*3+1]=-1.4+Math.exp(-x*x*state.sigma*state.sigma)*1.1;a[i*3+2]=.1;}curve.geometry.attributes.position.needsUpdate=true;};
  } else if(index===11){
    const cloud=points(group,new Float32Array(0),CYAN,.04,state.opacity);sphere(group,.08,[0,0,0],WHITE);
    updater=()=>{
      const key=state.orbital+quality;if(cached!==key){const a=sampleOrbital(state.orbital,count);cloud.geometry.dispose();cloud.geometry=new THREE.BufferGeometry();cloud.geometry.setAttribute('position',new THREE.BufferAttribute(a,3));cloud.scale.setScalar(state.orbital==='1s'?1.1:.32);cached=key;}cloud.material.opacity=state.opacity;
    };
  } else if(index===12) {
    const markers=[];
    line(group,[[-3.3,0,0],[3.3,0,0]],CYAN,.5);
    for(let i=0;i<12;i++){markers.push(sphere(group,.1,[-3.3+i*.6,0,0],VIOLET));line(group,[[-3.3+i*.6,0,0],[-3.3+i*.6,i%2?.6:-.6,0]],CYAN,.25);}
    updater=t=>markers.forEach((m,i)=>{m.scale.setScalar(i===state.event?2.1+Math.sin(t*2)*.15:1);m.material.emissiveIntensity=i===state.event?1.8:.2;});
  } else if(index===13){
    const base=new THREE.Group();group.add(base);
    const rays=[];for(let i=0;i<18;i++)rays.push(sphere(group,.045,[0,0,0],CYAN));
    updater=t=>{
      if(cached!==String(state.tech)){
        while(base.children.length){const c=base.children[0];c.geometry?.dispose();c.material?.dispose();base.remove(c);}
        if(state.tech===0){for(let i=0;i<3;i++){const r=ring(base,.8,CYAN,.7);r.rotation.y=Math.PI/2;r.position.x=-1.3+i*1.3;}box(base,[.1,1,1],[1.8,0,0],VIOLET);}
        if(state.tech===1){box(base,[.2,1.6,1.2],[-2,0,0],VIOLET);box(base,[.2,1.6,1.2],[2,0,0],VIOLET);box(base,[3,.5,.5],[0,0,0],CYAN,.3);}
        if(state.tech===2){for(let i=0;i<2;i++)box(base,[4,.4,1],[0,i?1:-1,0],i?CYAN:VIOLET,.6);}
        if(state.tech===3){box(base,[4,.4,2],[0,-.5,0],VIOLET);box(base,[1,.25,1.5],[0,.45,0],CYAN);box(base,[.4,1,1],[-1.6,0,0],WHITE);box(base,[.4,1,1],[1.6,0,0],WHITE);}
        if(state.tech===4){box(base,[3,.3,2.7],[0,0,0],VIOLET);for(let i=0;i<6;i++)for(let j=0;j<5;j++)box(base,[.25,.15,.25],[-1.2+i*.48,.25,-1+j*.48],CYAN);}
        if(state.tech===5){for(let i=0;i<4;i++)for(let j=0;j<3;j++)box(base,[.8,.08,.8],[-1.4+i*.94,-.5,-.9+j*.94],0x4268c9);}
        cached=String(state.tech);
      }
      rays.forEach((r,i)=>{const phase=(t*.4+i/18)%1;if(state.tech===5)r.position.set(Math.sin(i*13)*1.5,2-phase*2.5,Math.cos(i*7));else if(state.tech===2)r.position.set(Math.sin(i*17)*1.8,Math.floor((t*.7+i/18)%2)*2-1,0);else r.position.set(-3+phase*6,Math.sin(i*19)*.2,.1);});
    };
  } else if(index===14){
    const rings=[ring(group,1.5,CYAN),ring(group,1.7,VIOLET),ring(group,2,CYAN,.3)];
    sphere(group,.35,[0,0,0],WHITE);updater=t=>{rings[0].rotation.y=t*.15;rings[1].rotation.x=t*.2;rings[2].rotation.set(t*.1,t*.1,0);};
  }
  // A shared reference plane provides depth without implying measurable scale.
  const grid=new THREE.GridHelper(14,28,0x193b50,0x101c30);grid.position.y=-2.2;grid.material.transparent=true;grid.material.opacity=.32;group.add(grid);
  return { group, update(dt){if(state.reset!==cachedReset){elapsed=0;cachedReset=state.reset;}if(!state.paused)elapsed+=dt;updater(elapsed);}, dispose(){} };
  var cachedReset;
}
