import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildScene } from '../scenes/experiments.js';
import { disposeTree,points } from '../scenes/primitives.js';
export class Stage {
  constructor(host,onQuality,onStatus) {
    this.host=host;this.onQuality=onQuality;this.onStatus=onStatus;this.quality='medium';this.lost=false;this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.onMotion=e=>this.reduced=e.matches;this.motion=matchMedia('(prefers-reduced-motion: reduce)');this.motion.addEventListener('change',this.onMotion);
    try {this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch(e){onStatus('WebGL indisponível. Os textos, controles e gráficos continuam disponíveis.');return;}
    this.renderer.setClearColor(0x000000,0);this.renderer.outputColorSpace=THREE.SRGBColorSpace;host.prepend(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-label','Cena tridimensional. Arraste para girar e use pinça ou rolagem para aproximar.');
    this.renderer.domElement.setAttribute('role','img');
    this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();this.lost=true;onStatus('Contexto WebGL interrompido. Aguardando restauração…');});
    this.renderer.domElement.addEventListener('webglcontextrestored',()=>{this.lost=false;this.setChapter(this.index,this.state);onStatus('Renderização 3D restaurada.');});
    this.scene=new THREE.Scene();this.scene.fog=new THREE.FogExp2(0x050b18,.035);
    this.camera=new THREE.PerspectiveCamera(42,1,.1,100);this.camera.position.set(6,3.5,8);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableDamping=true;this.controls.dampingFactor=.06;this.controls.enablePan=false;this.controls.minDistance=3;this.controls.maxDistance=18;this.controls.maxPolarAngle=Math.PI*.88;
    this.controls.addEventListener('start',()=>this.interacted=true);
    this.scene.add(new THREE.AmbientLight(0xaacaff,1.5));
    const light=new THREE.PointLight(0x55e6ff,70,30);light.position.set(1,4,4);this.scene.add(light);
    const light2=new THREE.PointLight(0x9e72ff,50,30);light2.position.set(-3,0,-2);this.scene.add(light2);
    const stars=new Float32Array(500*3);for(let i=0;i<stars.length;i++)stars[i]=(Math.random()-.5)*45;
    this.stars=points(this.scene,stars,0x8aa6c9,.035,.55);
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(host);
    this.setQuality('medium');this.resize();this.slow=0;this.frames=0;this.last=performance.now();this.loop=this.loop.bind(this);this.frame=requestAnimationFrame(this.loop);
  }
  resize(){if(!this.renderer)return;const {width,height}=this.host.getBoundingClientRect();this.renderer.setSize(width,height,false);this.camera.aspect=width/Math.max(1,height);this.camera.updateProjectionMatrix();}
  setQuality(q){this.quality=q;if(!this.renderer)return;this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,q==='low'?1:q==='medium'?1.5:2));this.resize();if(this.state)this.setChapter(this.index,this.state);this.onQuality(q);}
  setChapter(index,state){
    this.index=index;this.state=state;if(!this.renderer)return;
    if(this.current){this.scene.remove(this.current.group);disposeTree(this.current.group);this.current.dispose();}
    this.current=buildScene(index,state,this.quality);this.scene.add(this.current.group);this.interacted=false;
    this.camera.position.set(...([3,8,9].includes(index)?[6,3.8,8]:index===11?[4,2.5,7]:[5,2.7,8]));this.controls.target.set(0,0,0);this.controls.update();
  }
  loop(now){
    this.frame=requestAnimationFrame(this.loop);
    const raw=(now-this.last)/1000;this.last=now;if(document.hidden||this.lost||this.suspended)return;
    const dt=Math.min(raw,.05);
    this.onTick?.(dt);
    if(this.current&&!this.animationsPaused)this.current.update(this.reduced?0:dt);
    if(this.index===0&&!this.interacted&&!this.reduced&&!this.animationsPaused){this.camera.position.multiplyScalar(Math.max(.9995,1-dt*.007));if(this.camera.position.length()<7)this.interacted=true;}
    this.controls.update();this.renderer.render(this.scene,this.camera);
    // Adaptive quality only after enough active frames; never use background-tab delays.
    if(raw<.25){this.frames++;if(raw>.045)this.slow++;if(this.frames>=180){if(this.slow>80&&this.quality!=='low'){this.setQuality(this.quality==='high'?'medium':'low');this.onStatus('Qualidade ajustada para manter a fluidez.');}this.frames=0;this.slow=0;}}
  }
  resetCamera(){if(this.state)this.setChapter(this.index,this.state);}
  dispose(){cancelAnimationFrame(this.frame);this.observer?.disconnect();this.motion.removeEventListener('change',this.onMotion);if(this.scene)disposeTree(this.scene);this.controls?.dispose();this.renderer?.dispose();}
}
