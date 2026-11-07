import {test} from 'node:test';
import assert from 'node:assert/strict';
import {presenterScripts,assignments,presenters} from '../src/content/presenters.js';
import {notebookTopics,mysteries} from '../src/content/notebook.js';
import {classroomChallenges} from '../src/content/classroom.js';
import {gaussianDensity,gaussianAmplitude,momentumDensity,sampleGaussian} from '../src/physics/gaussian.js';
import {Milestones} from '../src/utils/milestones.js';
import {LearningProgress} from '../src/utils/progress.js';
test('sixteen complete scripts retain the exact ownership distribution and colors',()=>{
 assert.deepEqual(assignments,['Heloá','Rafaella','Maria',...Array(10).fill('Lorenzo'),'Maria','Rafaella','Heloísa']);assert.equal(presenters.Lorenzo,'#1CB0F6');assert.equal(presenterScripts.length,16);
 for(const s of presenterScripts){for(const key of ['opening','speech','demonstration','participation','question','explanation','transition'])assert.ok(s[key].length>15,key);assert.ok(s.answer.length>0);assert.ok(s.essentials.length>=2&&s.essentials.length<=4);assert.ok(s.minutes>=1);assert.equal(s.owner,assignments[s.chapter]);}
});
test('notebook adaptations identify provenance, three levels and scientific caveats',()=>{
 assert.ok(notebookTopics.length>=16);for(const t of notebookTopics){assert.ok(t.chapter>=0&&t.chapter<16);for(const key of ['pages','quick','more','advanced','kind'])assert.ok(t[key].length>0);}
 assert.ok(notebookTopics.some(t=>t.title.includes('Pósitrons')&&t.quick.includes('1932')));assert.ok(notebookTopics.some(t=>t.title.includes('Fotoelétrico')&&t.advanced.includes('relatividade especial')));assert.equal(mysteries.length,6);assert.equal(classroomChallenges.length,5);assert.equal(new Set(classroomChallenges.map(c=>c.id)).size,5);
});
test('normalized Gaussian amplitudes, position and momentum densities obey reciprocal widths',()=>{
 const integrate=(fn,extent=20)=>{let sum=0;const dx=2*extent/20000;for(let i=0;i<20000;i++)sum+=fn(-extent+(i+.5)*dx)*dx;return sum;};
 for(const sigma of [.2,.8,2.5]){assert.ok(Math.abs(integrate(x=>gaussianDensity(x,sigma))-1)<1e-8);assert.ok(Math.abs(integrate(q=>momentumDensity(q,sigma))-1)<1e-8);assert.ok(Math.abs(gaussianAmplitude(.3,sigma)**2-gaussianDensity(.3,sigma))<1e-12);const vx=integrate(x=>x*x*gaussianDensity(x,sigma)),vq=integrate(q=>q*q*momentumDensity(q,sigma));assert.ok(Math.abs(Math.sqrt(vx*vq)-.5)<1e-8);}
});
test('independent simulated measurements approach the Gaussian mean and variance',()=>{
 let seed=4291;const rng=()=>{seed=(1664525*seed+1013904223)>>>0;return (seed+.5)/4294967296;};let sum=0,sq=0;for(let i=0;i<30000;i++){const x=sampleGaussian(.8,rng);sum+=x;sq+=x*x;}assert.ok(Math.abs(sum/30000)<.02);assert.ok(Math.abs(sq/30000-.64)<.025);
});
test('new medals persist without adding XP; investigation and completion medals derive from real progress',()=>{
 const data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)},progress=new LearningProgress(storage),m=new Milestones(storage,progress);
 m.record('experiment');m.record('correct');assert.equal(m.record('extra-points'),false);assert.equal(progress.xp,0);assert.equal(m.badges.filter(b=>b[1]).length,2);assert.equal(new Milestones(storage,progress).flags.correct,true);
 progress.completeChallenge(3);assert.equal(m.badges[1][1],true);for(let i=0;i<16;i++)progress.complete(i);assert.equal(progress.xp,320);assert.equal(m.badges.filter(b=>b[1]).length,6);m.clear();assert.equal(progress.xp,320);
});
