import {test} from 'node:test';
import assert from 'node:assert/strict';
import {H,HBAR,E_CHARGE,photonEV,photoelectric,fringeSpacing,deBroglie,hydrogenEnergy,transition,gaussianUncertainty,doubleSlitIntensity,distribution,sampleDistribution,orbitalDensity,braggIntensity} from '../src/physics/models.js';
import {ElectronExperiment} from '../src/simulations/electrons.js';
const near=(a,b,epsilon=1e-10)=>assert.ok(Math.abs(a-b)<=epsilon*Math.max(Math.abs(a),Math.abs(b)),a+' != '+b);
test('Young: lambda and L enlarge spacing, d reduces it',()=>{
 const s=fringeSpacing(500e-9,2,.25e-3);near(s,.004);near(fringeSpacing(1000e-9,2,.25e-3),s*2);near(fringeSpacing(500e-9,4,.25e-3),s*2);near(fringeSpacing(500e-9,2,.5e-3),s/2);
});
test('photoelectric threshold is independent of flux; energy balance',()=>{
 const phi=4.3,f0=phi*E_CHARGE/H;
 assert.equal(photoelectric(f0*.99,phi).emits,false);assert.equal(photoelectric(f0*.99,phi).kinetic,0);
 assert.equal(photoelectric(f0*1.1,phi).emits,true);near(photoelectric(f0*1.1,phi).kinetic,.43);
 near(photonEV(1e15),4.135667696923859);
});
test('hydrogen emission and absorption conserve transition energy',()=>{
 near(hydrogenEnergy(1),-13.6);near(hydrogenEnergy(2),-3.4);
 assert.equal(transition(1,2).type,'absorção');assert.equal(transition(2,1).type,'emissão');
 near(transition(1,2).frequency,transition(2,1).frequency);
 near(transition(2,1).frequency*H/E_CHARGE,10.2);
});
test('de Broglie inverse relationship and Gaussian lower bound',()=>{
 near(deBroglie(2e-24),deBroglie(1e-24)/2);near(gaussianUncertainty(1e-9).product,HBAR/2);
 near(gaussianUncertainty(.5e-9).sigmaP,2*gaussianUncertainty(1e-9).sigmaP);
});
test('coherent interference has minima; which-path distribution fills them',()=>{
 const p={lambda:5e-12,L:1,d:2e-9,a:.4e-9},minimum=p.lambda*p.L/(2*p.d);
 assert.ok(doubleSlitIntensity(minimum,p)<1e-20);assert.ok(doubleSlitIntensity(minimum,p,true)>.8);
 near(doubleSlitIntensity(.001,p),doubleSlitIntensity(-.001,p));
});
test('CDF normalizes and Monte Carlo follows central probability',()=>{
 const p={lambda:5e-12,L:1,d:2e-9,a:.4e-9},d=distribution(p,false,.012);
 near(d.cdf.at(-1),1);for(let i=1;i<d.cdf.length;i++)assert.ok(d.cdf[i]>=d.cdf[i-1]);
 let seed=123456;const rng=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/2**32;};
 let count=0;const n=20000;
 for(let i=0;i<n;i++){const x=sampleDistribution(d,rng);assert.ok(Math.abs(x)<=.012);if(Math.abs(x)<.001)count++;}
 const left=Math.floor((-.001+.012)/.024*d.cdf.length),right=Math.floor((.001+.012)/.024*d.cdf.length);
 const expected=d.cdf[right]-d.cdf[left];assert.ok(Math.abs(count/n-expected)<.02);
});
test('electron event queue, pause, clearing and which-path reset',()=>{
 const e=new ElectronExperiment();e.clear();e.emit(100);for(let i=0;i<100;i++)e.tick(.02);
 assert.equal(e.total,100);assert.equal(e.points.length,100);assert.equal(e.histogram.reduce((a,b)=>a+b,0),100);
 e.paused=true;e.emit(1);e.tick(1);assert.equal(e.total,100);
 e.setPath(true);assert.equal(e.total,0);assert.equal(e.pending,0);assert.equal(e.path,true);
});
test('hydrogenic nodes and Bragg maximum',()=>{
 assert.equal(orbitalDensity(2,0,0,'2s'),0);assert.equal(orbitalDensity(0,1,0,'2px'),0);
 assert.ok(orbitalDensity(1,0,0,'2px')>0);
 const spacing=.091e-9,theta=.8,lambda=2*spacing*Math.sin(theta);near(braggIntensity(theta,lambda),1);
});
