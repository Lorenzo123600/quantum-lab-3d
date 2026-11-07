import {test} from 'node:test';
import assert from 'node:assert/strict';
import {extendedLessons} from '../src/content/extended.js';
import {investigationData,experimentSnapshot,investigationSatisfied} from '../src/simulations/investigations.js';
import {LearningProgress} from '../src/utils/progress.js';
const words=text=>text.trim().split(/\s+/).length;
const base={lambda:550,d:.25,L:1.8,frequency:700,intensity:50,metal:'cesio',level:1,momentum:1,voltage:54,theta:50,sigma:.8,orbital:'1s'};
const snap=changes=>experimentSnapshot({...base,...changes});
test('all sixteen chapters contain the requested depth, examples, history and complete oral cues',()=>{
 assert.equal(extendedLessons.length,16);
 for(const [i,lesson]of extendedLessons.entries()){
  const intro=words(lesson.introduction),deep=words(lesson.sections.map(p=>p.text).join(' '));
  assert.ok(intro>=80&&intro<=130,'introduction '+(i+1)+': '+intro);assert.ok(deep>=180&&deep<=300,'explanation '+(i+1)+': '+deep);
  assert.ok(lesson.history.length>100);assert.ok(lesson.examples.length>=2);assert.ok(lesson.curiosity.length>40);assert.ok(lesson.conclusion.length>25);
  for(const key of ['opening','science','example','curiosity','demonstration','question','transition'])assert.ok(lesson.presenter[key].length>15,key+' '+i);
 }
});
test('a single click or unchanged snapshot cannot complete any of the nine investigations',()=>{
 assert.equal(Object.keys(investigationData).length,9);for(const key of Object.keys(investigationData)){assert.equal(investigationSatisfied(+key,[]),false);assert.equal(investigationSatisfied(+key,[snap({}),snap({})]),false);}
});
test('Young, Planck, de Broglie and uncertainty require a coherent parameter comparison',()=>{
 assert.ok(investigationSatisfied(3,[snap({lambda:500}),snap({lambda:700})]));
 assert.equal(investigationSatisfied(3,[snap({lambda:500}),snap({lambda:700,d:.4})]),false);
 assert.ok(investigationSatisfied(4,[snap({frequency:500}),snap({frequency:900})]));
 assert.ok(investigationSatisfied(7,[snap({momentum:1}),snap({momentum:2})]));
 assert.ok(investigationSatisfied(10,[snap({sigma:1}),snap({sigma:.5})]));
});
test('photoelectric investigation verifies high flux below threshold before emission in the same metal',()=>{
 const below=snap({frequency:300,intensity:90,metal:'zinco'}),above=snap({frequency:1500,intensity:90,metal:'zinco'});
 assert.ok(investigationSatisfied(5,[below,above]));assert.equal(investigationSatisfied(5,[below,snap({frequency:1500,metal:'cesio'})]),false);
 assert.equal(investigationSatisfied(5,[snap({frequency:300,intensity:10}),snap({frequency:1500})]),false);
});
test('Bohr, crystal and orbitals require their specific observations',()=>{
 assert.ok(investigationSatisfied(6,[snap({level:1}),snap({level:3}),snap({level:2})]));assert.equal(investigationSatisfied(6,[snap({level:1}),snap({level:3})]),false);
 assert.ok(investigationSatisfied(8,[snap({theta:50}),snap({theta:67})]));
 assert.ok(investigationSatisfied(11,[snap({orbital:'1s'}),snap({orbital:'2s'}),snap({orbital:'2px'})]));assert.equal(investigationSatisfied(11,[snap({orbital:'2px'})]),false);
});
test('electron investigation requires a single event, coherent buildup and a separate path-informed buildup',()=>{
 const h=[snap({electrons:{total:1,path:false}}),snap({electrons:{total:1000,path:false}}),snap({electrons:{total:100,path:true}})];
 assert.ok(investigationSatisfied(9,h));assert.equal(investigationSatisfied(9,[h[1],h[2]]),false);assert.equal(investigationSatisfied(9,[h[0],h[1]]),false);
});
test('reading and investigation progress persist without increasing lesson XP',()=>{
 const data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)},p=new LearningProgress(storage);
 assert.ok(p.markStudied(0));assert.ok(p.completeChallenge(3));assert.equal(p.completeChallenge(3),false);assert.equal(p.completeChallenge(15),false);assert.equal(p.xp,0);
 const restored=new LearningProgress(storage);assert.ok(restored.studied.has(0));assert.ok(restored.challenges.has(3));p.clear();assert.equal(p.studied.size,0);assert.equal(p.challenges.size,0);
});
