import {XP_PER_LESSON} from './progress.js';

export const MAXIMUM_POINTS=16*XP_PER_LESSON;
export const CELEBRATION_KEY='quantum-maximum-achievement-v1';

// Never trust a stored numeric XP field or the celebration marker as eligibility.
export function hasMaximumPoints(progress){
 return progress?.xp===MAXIMUM_POINTS&&progress.completed?.size===16&&Array.from({length:16},(_,i)=>i).every(i=>progress.completed.has(i));
}

export class MaximumAchievement {
 constructor(progress,storage){this.progress=progress;this.storage=storage;this.seen=false;try{const data=JSON.parse(storage?.getItem(CELEBRATION_KEY)||'null');this.seen=data?.version===1&&data.celebrated===true;}catch{}}
 get unlocked(){return hasMaximumPoints(this.progress);}
 claimAutomatic(){
  if(!this.unlocked||this.seen)return false;
  this.seen=true;
  try{this.storage?.setItem(CELEBRATION_KEY,JSON.stringify({version:1,celebrated:true}));}catch{}
  return true;
 }
}
