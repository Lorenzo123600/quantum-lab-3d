import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const AUDIO_KEY='lorenzos-physics-audio-v1';
async function probe(page){await page.addInitScript(()=>{
 const Native=window.AudioContext||window.webkitAudioContext;
 window.audioProbe={contexts:[],oscillators:[],gains:[]};
 if(Native)window.AudioContext=class extends Native{
  constructor(...args){super(...args);window.audioProbe.contexts.push(this);}
  createOscillator(){const node=super.createOscillator();const set=node.frequency.setValueAtTime.bind(node.frequency);node.frequency.setValueAtTime=(value,time)=>{node.__frequency=value;return set(value,time);};window.audioProbe.oscillators.push(node);return node;}
  createGain(){const node=super.createGain();window.audioProbe.gains.push(node);return node;}
  createDynamicsCompressor(){const node=super.createDynamicsCompressor();this.outputProbe=this.createAnalyser();this.outputProbe.fftSize=2048;node.connect(this.outputProbe);return node;}
 };
});}
async function openAudio(page){await page.locator('#audio-button').click();await expect(page.locator('#audio-panel')).toBeVisible();}
async function waitRunning(page){await expect.poll(()=>page.evaluate(()=>window.audioProbe.contexts[0]?.state)).toBe('running');}

test('silent classroom defaults preserve independent saved controls',async({page},testInfo)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await probe(page);await page.goto('/#capitulo-4');
 expect(await page.evaluate(()=>window.audioProbe.contexts.length)).toBe(0);await openAudio(page);
 await expect(page.locator('#audio-music')).not.toBeChecked();await expect(page.locator('#audio-effects')).not.toBeChecked();await expect(page.locator('#audio-music-volume')).toHaveValue('100');await expect(page.locator('#audio-effects-volume')).toHaveValue('100');await expect(page.locator('#audio-button')).toHaveAttribute('data-muted','true');
 await page.screenshot({path:testInfo.outputPath('audio-panel.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await page.locator('#audio-music').check();await waitRunning(page);await expect(page.locator('#audio-music')).toBeChecked();await expect(page.locator('#audio-effects')).not.toBeChecked();
 await page.locator('#audio-music-volume').fill('24');await expect(page.locator('#music-volume-label')).toHaveText('24%');
 await page.locator('#audio-effects').check();await page.locator('#audio-effects-volume').fill('18');
 expect(await page.evaluate(()=>window.audioProbe.contexts.length)).toBe(1);
 const prefs=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),AUDIO_KEY);expect(prefs).toMatchObject({music:true,effects:true,musicVolume:.24,effectsVolume:.18});
 await page.locator('#close-audio').click();await page.reload();await expect(page.locator('#chapter-counter')).toHaveText('04 / 16');
 expect(await page.evaluate(()=>window.audioProbe.contexts.length)).toBe(0);
 await openAudio(page);await waitRunning(page);await expect(page.locator('#audio-music')).toBeChecked();await expect(page.locator('#audio-effects')).toBeChecked();await expect(page.locator('#audio-music-volume')).toHaveValue('24');
 await page.locator('#audio-music').uncheck();await expect(page.locator('#audio-effects')).toBeChecked();await page.locator('#audio-effects').uncheck();
 await expect.poll(()=>page.evaluate(()=>window.audioProbe.contexts[0].state)).toBe('suspended');await expect(page.locator('#audio-button')).toHaveAttribute('data-muted','true');expect(errors).toEqual([]);
});

test('real answers produce distinct effects; sliders stay silent and the old switch stays synchronized',async({page})=>{
 await probe(page);await page.goto('/#capitulo-4');await openAudio(page);await page.locator('#audio-music').uncheck();await page.locator('#audio-effects').check();await waitRunning(page);await page.locator('#close-audio').click();
 await page.evaluate(()=>window.audioProbe.oscillators.length=0);
 await page.locator('.review-options button').nth(1).click();
 expect(await page.evaluate(()=>window.audioProbe.oscillators.map(n=>Math.round(n.__frequency)))).toEqual([196,175]);
 await page.evaluate(()=>window.audioProbe.oscillators.length=0);
 await page.locator('.review-options button').first().click();
 expect(await page.evaluate(()=>window.audioProbe.oscillators.map(n=>Math.round(n.__frequency)))).toEqual([523,659,784]);
 await page.evaluate(()=>window.audioProbe.oscillators.length=0);
 await page.locator('#experiment input[type=range]').first().fill('650');expect(await page.evaluate(()=>window.audioProbe.oscillators.length)).toBe(0);
 await page.locator('#complete-lesson').click();await expect(page.locator('#xp-count')).toHaveText('20 XP');expect(await page.evaluate(()=>window.audioProbe.oscillators.length)).toBeGreaterThanOrEqual(5);
 await page.locator('#settings-button').click();await expect(page.locator('#sound')).toBeChecked();await page.locator('#sound').uncheck();await page.locator('[data-close=settings]').click();await openAudio(page);await expect(page.locator('#audio-effects')).not.toBeChecked();
});

test('hidden pages suspend audio; return resumes a single context and a single music layer',async({page})=>{
 await probe(page);await page.goto('/#capitulo-1');await openAudio(page);await page.locator('#audio-music').check();await waitRunning(page);
 await page.evaluate(()=>{window.testHidden=true;Object.defineProperty(document,'hidden',{configurable:true,get:()=>window.testHidden});document.dispatchEvent(new Event('visibilitychange'));});
 await expect.poll(()=>page.evaluate(()=>window.audioProbe.contexts[0].state)).toBe('suspended');
 await page.evaluate(()=>{window.testHidden=false;document.dispatchEvent(new Event('visibilitychange'));});await waitRunning(page);expect(await page.evaluate(()=>window.audioProbe.contexts.length)).toBe(1);
});

test('the genuine 320-point event plays one seven-second fanfare, ducks and restores music',async({page})=>{
 test.setTimeout(45000);await probe(page);await page.addInitScript(()=>localStorage.setItem('quantum-lab-progress-v1',JSON.stringify({version:1,completed:Array.from({length:15},(_,i)=>i)})));
 await page.goto('/#capitulo-16');await openAudio(page);await page.locator('#audio-music').check();await page.locator('#audio-effects').check();await page.locator('#audio-music-volume').fill('100');await page.locator('#audio-music-volume').dispatchEvent('input');await waitRunning(page);await page.locator('#close-audio').click();
 await page.locator('.review-options button').first().click();await page.evaluate(()=>window.audioProbe.oscillators.length=0);await page.locator('#complete-lesson').click();
 await expect(page.locator('#maximum-celebration')).toBeVisible();await expect(page.locator('#xp-count')).toHaveText('320 XP');
 expect(await page.evaluate(()=>window.audioProbe.oscillators.length)).toBe(15);
 await expect.poll(()=>page.evaluate(()=>window.audioProbe.gains[3].gain.value)).toBeCloseTo(.18,2);
 await expect.poll(()=>page.evaluate(()=>window.audioProbe.gains[3].gain.value),{timeout:11000}).toBeCloseTo(1,2);
 expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).musicVolume,AUDIO_KEY)).toBe(1);
 await page.locator('#achievement-continue').click();await page.evaluate(()=>window.audioProbe.oscillators.length=0);await page.locator('#achievements-button').click();
 expect(await page.evaluate(()=>window.audioProbe.oscillators.length)).toBeLessThan(15);
});

test('unavailable audio leaves all chapters functional and explains the limitation',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined;});
 await page.goto('/#capitulo-10');await openAudio(page);await page.locator('#audio-music').check();await expect(page.locator('#audio-status')).toContainText('Áudio indisponível');await page.locator('#close-audio').click();await page.locator('#next').click();await expect(page.locator('#chapter-counter')).toHaveText('11 / 16');expect(errors).toEqual([]);
});

// Render the same synthesis with OfflineAudioContext: verify audible, bounded
// output and retain a WAV of the original victory melody as a review artifact.
test('original synthesis renders a smooth bounded score without external audio',async({page},testInfo)=>{
 await page.goto('/#capitulo-1');
 const result=await page.evaluate(async()=>{
  const {AudioManager,EFFECT_SCORES,AMBIENT_CHORDS}=await import('/src/utils/audio.js');
  async function render(kind){
   const seconds=kind==='victory'?7.5:33,ctx=new OfflineAudioContext(1,22050*seconds,22050),audio=new AudioManager();audio.context=ctx;audio.musicBus=ctx.createGain();audio.effectsBus=ctx.createGain();audio.musicBus.gain.value=.15;audio.effectsBus.gain.value=.3;
   const master=ctx.createGain();master.gain.value=.6;audio.musicBus.connect(master);audio.effectsBus.connect(master);master.connect(ctx.destination);
   if(kind==='victory')for(const [delay,frequency,duration,amplitude]of EFFECT_SCORES.victory)audio.voice({frequency,start:.02+delay,duration,amplitude});
   else for(let bar=0;bar<5;bar++)for(const frequency of AMBIENT_CHORDS[bar%4])audio.voice({frequency,start:bar*8,duration:10,amplitude:.09,channel:'music',attack:1.8,release:2.5});
   const buffer=await ctx.startRendering(),samples=buffer.getChannelData(0);let peak=0,energy=0;for(const sample of samples){peak=Math.max(peak,Math.abs(sample));energy+=sample*sample;}
   const joins=[8,16,24,32].map(time=>{let sum=0;for(let i=(time-.1)*22050;i<(time+.1)*22050;i++)sum+=samples[Math.floor(i)]**2;return Math.sqrt(sum/4410);});
   return {peak,rms:Math.sqrt(energy/samples.length),end:Math.abs(samples.at(-1)),joins,samples:kind==='victory'?Array.from(samples):[],rate:buffer.sampleRate};
  }return {victory:await render('victory'),ambient:await render('ambient')};
 });
 for(const clip of Object.values(result)){expect(clip.peak).toBeGreaterThan(.005);expect(clip.peak).toBeLessThan(.5);expect(clip.rms).toBeGreaterThan(.0001);}
 expect(result.victory.end).toBeLessThan(.00001);for(const rms of result.ambient.joins)expect(rms).toBeGreaterThan(.0001);
 const samples=result.victory.samples,bytes=Buffer.alloc(44+samples.length*2);bytes.write('RIFF',0);bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(result.victory.rate,24);bytes.writeUInt32LE(result.victory.rate*2,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(samples.length*2,40);samples.forEach((sample,i)=>bytes.writeInt16LE(Math.round(Math.max(-1,Math.min(1,sample))*32767),44+i*2));await writeFile(testInfo.outputPath('original-victory.wav'),bytes);
});


test('explicit activation produces a real output signal for music and effects, including touch',async({page},testInfo)=>{
 await probe(page);await page.goto('/#capitulo-4');await openAudio(page);
 if(testInfo.project.name==='mobile')await page.locator('#audio-enable').tap();else await page.locator('#audio-enable').click();
 await waitRunning(page);await expect(page.locator('#audio-music')).toBeChecked();await expect(page.locator('#audio-effects')).toBeChecked();
 const rms=()=>page.evaluate(()=>{const analyser=window.audioProbe.contexts[0].outputProbe,data=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(data);return Math.sqrt(data.reduce((sum,x)=>sum+x*x,0)/data.length);});
 await page.locator('#audio-effects').uncheck();await expect.poll(rms).toBeGreaterThan(.00005);
 await page.locator('#audio-effects').check();await page.locator('#audio-music').uncheck();
 await expect.poll(rms,{timeout:5000}).toBeLessThan(.00001);
 await page.locator('#audio-test').click();await expect.poll(rms).toBeGreaterThan(.00005);await expect(page.locator('#audio-status')).toContainText('Teste reproduzido');
 expect(await page.evaluate(()=>window.audioProbe.contexts.length)).toBe(1);
});
