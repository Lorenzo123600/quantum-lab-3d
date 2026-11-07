import {test} from 'node:test';
import assert from 'node:assert/strict';
import {AudioManager,AUDIO_KEY,AUDIO_DEFAULTS,readAudioPreferences,EFFECT_SCORES,VICTORY_SECONDS} from '../src/utils/audio.js';
function memory(){const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};}
function fakeContext(){
 const parameter=()=>({value:0,ramps:[],setValueAtTime(v){this.value=v;},cancelAndHoldAtTime(){},linearRampToValueAtTime(v,t){this.value=v;this.ramps.push([v,t]);}});
 const node=()=>({gain:parameter(),frequency:parameter(),Q:parameter(),threshold:parameter(),knee:parameter(),ratio:parameter(),attack:parameter(),release:parameter(),connect(){},disconnect(){}});
 const c={state:'suspended',currentTime:10,destination:node(),oscillators:[],resumeCalls:0,suspendCalls:0,createGain:node,createBiquadFilter:node,createDynamicsCompressor:node,createOscillator(){const osc={...node(),start(t){this.started=t;},stop(t){this.stopped=t;}};this.oscillators.push(osc);return osc;},async resume(){this.resumeCalls++;this.state='running';},async suspend(){this.suspendCalls++;this.state='suspended';},async close(){this.state='closed';}};return c;
}
test('new visitors start silent at 15% music and preferences are validated independently',()=>{
 const storage=memory();assert.deepEqual(readAudioPreferences(storage),AUDIO_DEFAULTS);
 storage.setItem(AUDIO_KEY,JSON.stringify({version:1,music:true,effects:'true',musicVolume:20,effectsVolume:-1}));assert.deepEqual(readAudioPreferences(storage),{music:true,effects:false,musicVolume:1,effectsVolume:0});
 storage.setItem(AUDIO_KEY,'broken');assert.deepEqual(readAudioPreferences(storage),AUDIO_DEFAULTS);
});
test('saved opt-in never creates an audio context before interaction; repeated gestures keep one soundtrack',async()=>{
 const storage=memory();storage.setItem(AUDIO_KEY,JSON.stringify({version:1,music:true,musicVolume:.15}));let created=0;const context=fakeContext();const audio=new AudioManager({storage,contextFactory:()=>{created++;return context;}});
 assert.equal(await audio.activate(),false);assert.equal(audio.effect('click'),false);assert.equal(created,0);
 await audio.interact();const timer=audio.musicTimer,voices=audio.voices.size;
 await audio.interact();assert.equal(created,1);assert.equal(audio.musicTimer,timer);assert.equal(audio.voices.size,voices);
 audio.setPreference('effects',true);assert.equal(audio.preferences.music,true);assert.equal(readAudioPreferences(storage).effects,true);
 audio.setPreference('music',false);assert.equal(audio.musicTimer,null);assert.equal(audio.preferences.effects,true);audio.dispose();
});
test('effects use semantic notes once, suppress duplicate clicks and never run when muted',async()=>{
 const context=fakeContext(),audio=new AudioManager({contextFactory:()=>context});audio.setPreference('effects',true);assert.equal(audio.effect('correct'),false);
 await audio.interact();assert.equal(audio.effect('correct'),true);const count=context.oscillators.length;assert.equal(count,3);assert.equal(audio.effect('correct'),false);assert.equal(audio.effect('click'),false);assert.equal(context.oscillators.length,count);
 audio.setPreference('effectsVolume',0);assert.equal(audio.effect('correct'),false);audio.dispose();
});
test('victory lasts 7.2 seconds, ducks music without changing saved volume and restores it',async()=>{
 const context=fakeContext(),audio=new AudioManager({contextFactory:()=>context});audio.setPreference('music',true);audio.setPreference('effects',true);await audio.interact();
 assert.equal(audio.celebrate(),true);assert.equal(audio.duck.gain.value,.18);assert.equal(audio.preferences.musicVolume,.15);assert.equal(audio.victoryUntil,context.currentTime+VICTORY_SECONDS);assert.equal(audio.celebrate(),false);assert.equal(audio.effect('click'),false);
 audio.endCelebration();assert.equal(audio.duck.gain.value,1);assert.equal(audio.victoryUntil,0);assert.ok(Math.max(...EFFECT_SCORES.victory.map(n=>n[0]+n[2]))>=7);audio.dispose();
});
test('background pauses scheduling and context; returning resumes only opted-in audio',async()=>{
 let hidden=false;const context=fakeContext(),audio=new AudioManager({contextFactory:()=>context,hidden:()=>hidden});audio.setPreference('music',true);audio.setPreference('effects',true);await audio.interact();
 hidden=true;audio.visibilityChanged();await audio.suspending;assert.equal(context.state,'suspended');assert.equal(audio.musicTimer,null);assert.equal(audio.effect('victory'),false);
 hidden=false;await audio.activate();assert.equal(context.state,'running');assert.ok(audio.musicTimer);audio.dispose();
});
test('unsupported contexts and denied storage never break the application',async()=>{
 const audio=new AudioManager({storage:{getItem(){throw Error('denied');},setItem(){throw Error('denied');}},contextFactory(){throw Error('unsupported');}});audio.setPreference('music',true);assert.equal(await audio.interact(),false);assert.equal(audio.unavailable,true);assert.equal(audio.effect('click'),false);audio.dispose();
});
