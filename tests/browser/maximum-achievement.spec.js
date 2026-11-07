import {test,expect} from '@playwright/test';
const key='quantum-lab-progress-v1',awardKey='quantum-maximum-achievement-v1';
async function seed(page,count,{seen=false,fakeXP=0}={}){await page.addInitScript(({key,awardKey,count,seen,fakeXP})=>{
 if(sessionStorage.getItem('award-test-seeded'))return;
 localStorage.setItem(key,JSON.stringify({version:1,completed:Array.from({length:count},(_,i)=>i),xp:fakeXP,lastChapter:15}));
 if(seen)localStorage.setItem(awardKey,JSON.stringify({version:1,celebrated:true}));sessionStorage.setItem('award-test-seeded','yes');
},{key,awardKey,count,seen,fakeXP});}
test('300 points never celebrates; actual final lesson unlocks once and preserves the laboratory',async({page},testInfo)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await seed(page,15,{fakeXP:999999});await page.goto('/#capitulo-16');
 await expect(page.locator('#xp-count')).toHaveText('300 XP');await expect(page.locator('#maximum-celebration')).not.toBeVisible();
 await page.locator('.review-options button').first().click();await page.locator('#complete-lesson').click();
 await expect(page.locator('#maximum-celebration')).toBeVisible();await expect(page.locator('#xp-count')).toHaveText('320 XP');
 await expect(page.locator('.award-signature')).toContainText('Lorenzo, Maria, Rafaella, Heloá e Heloísa.');
 await expect(page.locator('#award-medal canvas')).toBeVisible();expect(await page.locator('canvas[data-engine]').count()).toBe(1);
 await page.screenshot({path:testInfo.outputPath('maximum-achievement.png')});
 await page.locator('#achievement-continue').click();await expect(page.locator('#stage canvas')).toBeVisible();
 await page.reload();await expect(page.locator('#xp-count')).toHaveText('320 XP');await expect(page.locator('#maximum-celebration')).not.toBeVisible();
 await page.locator('#achievements-button').click();await expect(page.locator('#maximum-celebration')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.locator('#maximum-celebration')).not.toBeVisible();
 await page.locator('#menu-button').click();await page.locator('.trail-achievements summary').click();await page.locator('#maximum-achievement').click();
 await expect(page.locator('#maximum-celebration')).toBeVisible();await page.locator('#achievement-continue').click();
 await expect(page.locator('#xp-count')).toHaveText('320 XP');expect(errors).toEqual([]);
});
test('a numeric XP field and saved marker do not unlock unfinished lessons',async({page})=>{
 await seed(page,0,{seen:true,fakeXP:320});await page.goto('/#capitulo-1');await expect(page.locator('#xp-count')).toHaveText('0 XP');
 await page.locator('#achievements-button').click();await expect(page.locator('#chapter-menu')).toBeVisible();await expect(page.locator('#maximum-achievement')).not.toBeVisible();await expect(page.locator('#maximum-celebration')).not.toBeVisible();
});
test('digital medal previews and saves as PNG; native sharing receives the real card',async({page})=>{
 await seed(page,16,{seen:true});await page.goto('/#capitulo-10');await page.locator('#achievements-button').click();
 await page.locator('#achievement-mine').click();await expect(page.locator('#achievement-card-preview')).toBeVisible();
 await expect.poll(()=>page.locator('#achievement-card-preview').evaluate(img=>img.naturalWidth)).toBe(1200);
 const download=page.waitForEvent('download');await page.locator('#achievement-save').click();expect((await download).suggestedFilename()).toBe('lorenzos-physics-conquista-320.png');
 await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.sharedCard={name:data.files[0].name,type:data.files[0].type,size:data.files[0].size};}});});
 await page.locator('#achievement-share').click();await expect(page.locator('.award-status')).toContainText('Compartilhamento concluído');
 expect(await page.evaluate(()=>window.sharedCard)).toMatchObject({name:'lorenzos-physics-conquista-320.png',type:'image/png'});
 expect(await page.evaluate(()=>window.sharedCard.size)).toBeGreaterThan(10000);
});
test('reduced motion and unavailable WebGL retain an accessible fallback medal',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await seed(page,16);
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type.startsWith('webgl'))return null;return original.call(this,type,...args);};});
 await page.goto('/#capitulo-4');await expect(page.locator('#maximum-celebration')).toBeVisible();
 await expect(page.locator('.award-medal-fallback')).toBeVisible();await expect(page.locator('.award-particle')).toHaveCount(0);
 await page.locator('#achievement-continue').click();await expect(page.locator('#chapter-counter')).toHaveText('04 / 16');await expect(page.locator('#xp-count')).toHaveText('320 XP');
});
