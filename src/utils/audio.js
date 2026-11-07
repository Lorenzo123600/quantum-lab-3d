export const AUDIO_KEY='lorenzos-physics-audio-v1';
export const AUDIO_DEFAULTS=Object.freeze({music:false,effects:false,musicVolume:1,effectsVolume:1});
const volume=(value,fallback)=>typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(1,value)):fallback;
export function readAudioPreferences(storage){
 try{const data=JSON.parse(storage?.getItem(AUDIO_KEY)||'null');if(data?.version===1)return {music: data.music===true,effects:data.effects===true,musicVolume:volume(data.musicVolume,AUDIO_DEFAULTS.musicVolume),effectsVolume:volume(data.effectsVolume,AUDIO_DEFAULTS.effectsVolume)};}catch{}
 return {...AUDIO_DEFAULTS};
}
// Original score: four eight-second bars in C major. Overlapping envelopes join
// Cmaj7 → Am7 → Fmaj7 → Gsus2 without a recorded loop boundary or external audio.
export const AMBIENT_CHORDS=[[130.81,164.81,196,246.94],[110,130.81,164.81,196],[87.31,130.81,164.81,220],[98,146.83,196,220]];
export const EFFECT_SCORES=Object.freeze({
 click:[[0,520,.09,.09]],hover:[[0,880,.12,.025]],
 correct:[[0,523.25,.23,.16],[.14,659.25,.25,.14],[.3,783.99,.38,.14]],
 incorrect:[[0,196,.32,.14],[.14,174.61,.38,.09]],
 reward:[[0,392,.15,.13],[.1,523.25,.17,.14],[.22,659.25,.3,.15]],
 complete:[[0,392,.16,.12],[.1,523.25,.18,.13],[.22,659.25,.24,.14],[.48,783.99,.3,.14],[.73,1046.5,.6,.1]],
 achievement:[[0,392,.2,.12],[.12,523.25,.23,.14],[.26,659.25,.27,.13],[.5,783.99,.4,.13],[.82,1046.5,.65,.1],[.82,523.25,.8,.1]],
 simulation:[[0,261.63,.3,.1],[.15,392,.38,.1],[.32,523.25,.45,.08]],
 transition:[[0,659.25,.35,.12],[.18,523.25,.4,.1]],
 victory:[[0,261.63,1.4,.12],[0,392,1.5,.09],[.16,523.25,.45,.15],[.52,659.25,.45,.14],[.9,783.99,.6,.15],[1.6,659.25,.4,.13],[1.95,783.99,.45,.14],[2.32,1046.5,.9,.12],[3.3,783.99,.5,.13],[3.7,880,.5,.12],[4.12,1046.5,.65,.12],[4.8,523.25,2.3,.12],[4.8,659.25,2.3,.1],[4.8,783.99,2.3,.1],[4.8,1046.5,2.1,.08]],
});
export const VICTORY_SECONDS=7.2;

export class AudioManager {
 constructor({storage,contextFactory=()=>new (globalThis.AudioContext||globalThis.webkitAudioContext)(),hidden=()=>globalThis.document?.hidden===true,onChange=()=>{}}={}){
  this.storage=storage;this.preferences=readAudioPreferences(storage);this.contextFactory=contextFactory;this.hidden=hidden;this.onChange=onChange;this.context=null;this.interacted=false;this.unavailable=false;this.voices=new Set();this.lastEffect=new Map();this.semanticAt=-Infinity;this.victoryUntil=0;this.disposed=false;
 }
 get audible(){return (this.preferences.music&&this.preferences.musicVolume>0)||(this.preferences.effects&&this.preferences.effectsVolume>0);}
 notify(){this.onChange({...this.preferences,unavailable:this.unavailable,running:this.context?.state==='running',interacted:this.interacted});}
 setPreference(key,value){
  if(!Object.hasOwn(AUDIO_DEFAULTS,key))return;
  this.preferences[key]=key.endsWith('Volume')?volume(value,AUDIO_DEFAULTS[key]):value===true;
  try{this.storage?.setItem(AUDIO_KEY,JSON.stringify({version:1,...this.preferences}));}catch{}
  this.applyVolumes();if(!this.preferences.music||this.preferences.musicVolume===0)this.stopMusic();if(!this.preferences.effects||this.preferences.effectsVolume===0)this.stopEffects();
  if(!this.audible){this.suspend();}else if(this.interacted)this.activate();
  this.notify();
 }
 interact(){
  this.interacted=true;
  // Mobile browsers may leave an early resume pending until a *completed*
  // trusted gesture. Retry synchronously in that gesture, even when activate()
  // is already waiting. Reuse the context and its one music scheduler.
  if(!this.disposed&&this.audible&&!this.hidden()&&this.context&&this.context.state!=='running'){
   try{this.context.resume().catch(()=>{this.unavailable=true;this.notify();});}catch{this.unavailable=true;this.notify();}
  }
  return this.activate();
 }
 async activate(){
  if(this.disposed||!this.interacted||this.hidden()||(!this.audible))return false;
  if(this.context?.state==='running'){if(this.preferences.music)this.startMusic();return true;}
  if(this.activating)return this.activating;
  this.activating=this.startContext();try{return await this.activating;}finally{this.activating=null;}
 }
 async startContext(){
  try{
   if(this.suspending)await this.suspending;
   if(!this.context){
    const context=this.contextFactory();this.context=context;
    this.master=context.createGain();this.master.gain.value=.6;
    this.musicBus=context.createGain();this.effectsBus=context.createGain();this.duck=context.createGain();this.duck.gain.value=1;
    this.filter=context.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=1900;this.filter.Q.value=.5;
    this.musicBus.connect(this.filter);this.filter.connect(this.duck);this.duck.connect(this.master);this.effectsBus.connect(this.master);
    this.limiter=context.createDynamicsCompressor();this.limiter.threshold.value=-12;this.limiter.knee.value=18;this.limiter.ratio.value=4;this.limiter.attack.value=.003;this.limiter.release.value=.25;this.master.connect(this.limiter);this.limiter.connect(context.destination);
    context.onstatechange=()=>this.notify();this.applyVolumes();
   }
   if(this.context.state!=='running')await this.context.resume();
   if(this.disposed)return false;
   if(this.hidden()||(!this.audible)){this.suspend();return false;}
   this.unavailable=false;if(this.preferences.music)this.startMusic();this.notify();return this.context.state==='running';
  }catch{this.unavailable=true;this.notify();return false;}
 }
 ramp(param,value,seconds=.25){if(!this.context||!param)return;const now=this.context.currentTime;if(param.cancelAndHoldAtTime)param.cancelAndHoldAtTime(now);else{param.cancelScheduledValues(now);param.setValueAtTime(param.value,now);}param.linearRampToValueAtTime(value,now+seconds);}
 applyVolumes(){if(!this.context)return;this.ramp(this.musicBus?.gain,this.preferences.music?this.preferences.musicVolume:0,.4);this.ramp(this.effectsBus?.gain,this.preferences.effects?this.preferences.effectsVolume:0,.12);}
 voice({frequency,start,duration,amplitude=.1,type='sine',channel='effects',attack=.015,release=.2}){
  if(!this.context||this.voices.size>=48)return;
  const context=this.context,osc=context.createOscillator(),gain=context.createGain(),end=start+duration;
  osc.type=type;osc.frequency.setValueAtTime(frequency,start);
  gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(amplitude,start+Math.min(attack,duration*.4));gain.gain.setValueAtTime(amplitude,Math.max(start+Math.min(attack,duration*.4),end-release));gain.gain.linearRampToValueAtTime(0,end);
  osc.connect(gain);gain.connect(channel==='music'?this.musicBus:this.effectsBus);
  const voice={osc,gain,channel};this.voices.add(voice);osc.onended=()=>{osc.disconnect();gain.disconnect();this.voices.delete(voice);};osc.start(start);osc.stop(end+.015);return voice;
 }
 stopVoices(channel){if(!this.context)return;for(const voice of this.voices){if(voice.channel!==channel)continue;this.ramp(voice.gain.gain,0,.04);try{voice.osc.stop(this.context.currentTime+.05);}catch{}}}
 startMusic(){
  if(this.musicTimer||!this.preferences.music||this.preferences.musicVolume===0||this.hidden()||this.context?.state!=='running')return;
  this.nextBar=this.context.currentTime+.08;this.bar=0;this.scheduleMusic();this.musicTimer=setInterval(()=>this.scheduleMusic(),250);
 }
 scheduleMusic(){
  if(!this.preferences.music||this.preferences.musicVolume===0||this.hidden()||this.context?.state!=='running')return;
  const now=this.context.currentTime;if(this.nextBar<now-.2)this.nextBar=now+.08;
  if(this.nextBar>now+.65)return;
  const chord=AMBIENT_CHORDS[this.bar%4],start=this.nextBar;
  for(const frequency of chord)this.voice({frequency,start,duration:10,amplitude:.09,channel:'music',attack:1.8,release:2.5});
  for(let i=0;i<3;i++)this.voice({frequency:chord[(this.bar+i)%4]*4,start:start+1.5+i*2,duration:1.8,amplitude:.038,channel:'music',attack:.06,release:1.6});
  this.bar++;this.nextBar+=8;
 }
 stopMusic(){clearInterval(this.musicTimer);this.musicTimer=null;this.stopVoices('music');}
 effect(name){
  if(!EFFECT_SCORES[name]||(!this.preferences.effects||this.preferences.effectsVolume===0)||this.context?.state!=='running'||this.hidden()||this.disposed)return false;
  const now=this.context.currentTime;
  if(now<this.victoryUntil&&name!=='victory')return false;
  const quiet=name==='click'||name==='hover';
  if(quiet&&now-this.semanticAt<.2)return false;
  if(now-(this.lastEffect.get(name)??-Infinity)<(quiet?.1:.25))return false;
  this.lastEffect.set(name,now);if(!quiet)this.semanticAt=now;
  for(const [delay,frequency,duration,amplitude]of EFFECT_SCORES[name])this.voice({frequency,start:now+.02+delay,duration,amplitude,type:name==='simulation'?'triangle':'sine'});
  return true;
 }
 celebrate(){
  if((!this.preferences.effects||this.preferences.effectsVolume===0)||this.context?.state!=='running'||this.hidden()||this.disposed)return false;
  if(this.context.currentTime<this.victoryUntil)return false;
  this.stopEffects();this.ramp(this.duck.gain,.18,.3);
  if(!this.effect('victory')){this.ramp(this.duck.gain,1,.5);return false;}
  this.victoryUntil=this.context.currentTime+VICTORY_SECONDS;
  this.victoryTimer=setTimeout(()=>this.endCelebration(),VICTORY_SECONDS*1000);return true;
 }
 endCelebration(){clearTimeout(this.victoryTimer);this.victoryTimer=null;this.victoryUntil=0;this.ramp(this.duck?.gain,1,1.2);}
 stopEffects(){this.stopVoices('effects');this.endCelebration();}
 suspend(){this.stopMusic();this.stopEffects();if(this.context?.state==='running'&&!this.suspending)this.suspending=this.context.suspend().catch(()=>{}).finally(()=>{this.suspending=null;});}
 visibilityChanged(){if(this.hidden())this.suspend();else if(this.interacted)this.activate();}
 dispose(){this.disposed=true;this.suspend();if(this.context){this.context.onstatechange=null;this.context.close().catch(()=>{});}this.voices.clear();}
}
