import {test,expect} from '@playwright/test';

test('cinematic opening identifies the work and all five members, skips animation and starts chapter one',async({page},testInfo)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.locator('#school-screen')).toBeVisible();await expect(page.locator('#school-title')).toHaveText('Trabalho sobre física quântica');await expect(page).toHaveTitle('Trabalho sobre física quântica');
 await expect(page.locator('.member-name')).toHaveText(['Lorenzo','Maria','Rafaella','Heloá','Heloísa']);
 await expect(page.locator('.school-classroom')).toHaveText('3º ano do Ensino Médio');await expect(page.locator('.school-year')).toHaveText('2026');
 await page.locator('#skip-opening').click();await expect(page.locator('#school-screen')).toHaveClass(/skip-animation/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await page.screenshot({path:testInfo.outputPath('school-opening.png')});
 await page.locator('#school-start').click();await expect(page.locator('#chapter-counter')).toHaveText('01 / 16');await expect(page.locator('#school-screen')).toBeHidden();
 await expect(page.locator('#stage canvas')).toHaveCount(1);await expect(page.locator('#school-visual canvas')).toHaveCount(0);
 await page.locator('#previous').click();await expect(page.locator('#school-screen')).toBeVisible();
 await expect(page.locator('canvas[aria-label^="Cena tridimensional"]')).toHaveCount(1);expect(errors).toEqual([]);
});

test('direct links bypass opening; sequence ends with thanks and functional final actions',async({page},testInfo)=>{
 test.setTimeout(60000);await page.goto('/#capitulo-10');await expect(page.locator('#chapter-counter')).toHaveText('10 / 16');await expect(page.locator('#school-screen')).toBeHidden();
 await page.goto('/#capitulo-16');await page.locator('#next').click();await expect(page.locator('#school-title')).toHaveText('OBRIGADO PELA ATENÇÃO!');await expect(page).toHaveURL(/#agradecimento$/);
 await expect(page.locator('.school-memberline')).toHaveText('Lorenzo • Maria • Rafaella • Heloá • Heloísa');await expect(page.locator('.school-art-note')).toContainText('Metáfora artística');
 await page.screenshot({path:testInfo.outputPath('school-thanks.png')});
 await page.locator('#school-chapters').click();await expect(page.locator('#chapter-links button')).toHaveCount(16);await page.locator('#chapter-links button').nth(9).click();await expect(page.locator('#chapter-counter')).toHaveText('10 / 16');
 await page.goto('/#agradecimento');await page.locator('#school-experiments').click();await expect(page.locator('#chapter-counter')).toHaveText('04 / 16');
 await page.goto('/#agradecimento');await page.locator('#school-home').click();await expect(page.locator('#school-title')).toHaveText('Trabalho sobre física quântica');
});

test('keyboard presentation traverses opening, chapters and thanks without automatically restarting',async({page})=>{
 await page.goto('/');await page.locator('#skip-opening').click();await page.locator('#school-title').focus();await page.keyboard.press('Space');await expect(page.locator('#chapter-counter')).toHaveText('01 / 16');
 await page.locator('#settings-button').click();await page.locator('#presentation-toggle').click();await expect(page.locator('body')).toHaveClass(/presentation-mode/);
 await page.goto('/#capitulo-16');await page.locator('#chapter-title').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#school-title')).toHaveText('OBRIGADO PELA ATENÇÃO!');
 await page.locator('#school-title').focus();await page.keyboard.press('Space');await expect(page.locator('#school-title')).toHaveText('OBRIGADO PELA ATENÇÃO!');
 await page.keyboard.press('ArrowLeft');await expect(page.locator('#chapter-counter')).toHaveText('16 / 16');
});

test('opening remains readable without WebGL and with reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return original.call(this,type,...args);};});
 await page.goto('/');await expect(page.locator('.school-fallback')).toBeVisible();await expect(page.locator('#school-title')).toHaveText('Trabalho sobre física quântica');
 await page.locator('#school-start').click();await expect(page.locator('#chapter-counter')).toHaveText('01 / 16');
});
