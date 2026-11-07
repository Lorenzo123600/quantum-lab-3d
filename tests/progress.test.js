import {test} from 'node:test';
import assert from 'node:assert/strict';
import {LearningProgress,PROGRESS_KEY} from '../src/utils/progress.js';
import {reviews} from '../src/content/review.js';
const memory=()=>{const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};};
test('progress persists without duplicate rewards and resumes the last chapter',()=>{
 const storage=memory(),progress=new LearningProgress(storage);progress.visit(9);
 assert.equal(progress.complete(3),true);assert.equal(progress.complete(3),false);assert.equal(progress.xp,20);
 const restored=new LearningProgress(storage);assert.equal(restored.lastChapter,9);assert.equal(restored.xp,20);assert.ok(restored.completed.has(3));
});
test('corrupt storage and invalid chapter IDs cannot inflate progress',()=>{
 const storage=memory();storage.setItem(PROGRESS_KEY,JSON.stringify({version:1,completed:[0,0,-1,16,99,'1',2.5,4],lastChapter:200,xp:100000}));
 const progress=new LearningProgress(storage);assert.equal(progress.xp,40);assert.equal(progress.lastChapter,0);assert.equal(progress.complete(-1),false);assert.equal(progress.complete(16),false);
 storage.setItem(PROGRESS_KEY,'invalid JSON');assert.equal(new LearningProgress(storage).xp,0);
});
test('learning still works when local storage is denied',()=>{
 const storage={getItem(){throw Error('denied');},setItem(){throw Error('denied');}};
 const progress=new LearningProgress(storage);assert.equal(progress.complete(1),true);assert.equal(progress.xp,20);assert.equal(progress.saved,false);
});
test('achievements are awarded once at milestones; reset clears only learning progress',()=>{
 const events=[],storage=memory();storage.setItem('other-data','keep');const progress=new LearningProgress(storage,e=>events.push(e));
 for(let i=0;i<16;i++)progress.complete(i);assert.equal(progress.xp,320);assert.equal(progress.earnedBadges.length,4);assert.equal(events.filter(e=>e.newBadge).length,4);
 progress.clear();assert.equal(progress.xp,0);assert.equal(new LearningProgress(storage).xp,0);assert.equal(storage.getItem('other-data'),'keep');
});
test('all sixteen reviews contain selectable alternatives and explanatory feedback',()=>{
 assert.equal(reviews.length,16);for(const [question,choices,answer,explanation] of reviews){assert.ok(question.length>20);assert.equal(choices.length,3);assert.ok(Number.isInteger(answer)&&answer>=0&&answer<3);assert.ok(explanation.length>40);}
});
