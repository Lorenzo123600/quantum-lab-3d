import {test} from 'node:test';
import assert from 'node:assert/strict';
import {LearningProgress,PROGRESS_KEY} from '../src/utils/progress.js';
import {MaximumAchievement,CELEBRATION_KEY,hasMaximumPoints} from '../src/utils/maximum-achievement.js';
const memory=()=>{const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};};
test('only sixteen unique completed lessons unlock 320; automatic celebration is claimed once',()=>{
 const storage=memory(),progress=new LearningProgress(storage),award=new MaximumAchievement(progress,storage);
 for(let i=0;i<15;i++)progress.complete(i);
 assert.equal(progress.xp,300);assert.equal(award.claimAutomatic(),false);
 progress.complete(15);const before=storage.getItem(PROGRESS_KEY);
 assert.equal(progress.xp,320);assert.equal(award.claimAutomatic(),true);assert.equal(award.claimAutomatic(),false);
 assert.equal(storage.getItem(PROGRESS_KEY),before);
 assert.equal(new MaximumAchievement(new LearningProgress(storage),storage).claimAutomatic(),false);
 assert.equal(new MaximumAchievement(progress,storage).unlocked,true);
 progress.clear();assert.equal(award.unlocked,false);assert.ok(storage.getItem(CELEBRATION_KEY));
});
test('stored XP and unlock markers cannot fabricate an achievement',()=>{
 const storage=memory();storage.setItem(PROGRESS_KEY,JSON.stringify({version:1,completed:[0,0,16,-1,'2'],xp:320}));
 storage.setItem(CELEBRATION_KEY,JSON.stringify({version:1,celebrated:true}));
 const progress=new LearningProgress(storage),award=new MaximumAchievement(progress,storage);
 assert.equal(progress.xp,20);assert.equal(award.unlocked,false);assert.equal(award.claimAutomatic(),false);
 assert.equal(hasMaximumPoints({xp:320,completed:new Set(Array.from({length:15},(_,i)=>i))}),false);
});
test('denied and corrupt storage preserve the once-per-session gate',()=>{
 for(const storage of [{getItem(){throw Error('denied');},setItem(){throw Error('denied');}}, {getItem(){return 'broken JSON';},setItem(){}}]){
  const progress=new LearningProgress(storage);for(let i=0;i<16;i++)progress.complete(i);
  const award=new MaximumAchievement(progress,storage);assert.equal(award.claimAutomatic(),true);assert.equal(award.claimAutomatic(),false);assert.equal(progress.xp,320);
 }
});
