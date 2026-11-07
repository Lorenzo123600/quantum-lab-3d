import {test,expect} from '@playwright/test';

test('all chapters expose rich reading, examples, curiosity, history and a complete presenter script',async({page},testInfo)=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/#capitulo-1');
 for(let chapter=1;chapter<=16;chapter++){
  await page.evaluate(n=>location.hash='capitulo-'+n,chapter);await expect(page.locator('#chapter-counter')).toHaveText(String(chapter).padStart(2,'0')+' / 16');
  await page.locator('#full-lesson>summary').click();
  for(const name of ['introduction','explanation','history','examples','curiosity','conclusion']){
   const section=page.locator('[data-reading="'+name+'"]');await section.locator('summary').click();await expect(section.locator('.reading-body')).toBeVisible();await expect(section.locator('.reading-body')).not.toBeEmpty();
  }
  await expect(page.locator('.katex-error')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
 await page.locator('#mark-studied').click();await page.reload();await page.locator('#full-lesson>summary').click();await expect(page.locator('#mark-studied')).toBeDisabled();
 await page.locator('#notes-button').click();for(const id of ['notes-curiosity','notes-question','notes-transition'])await expect(page.locator('#'+id)).not.toBeEmpty();
 await page.screenshot({path:testInfo.outputPath('v3-presenter-notes.png')});expect(errors).toEqual([]);
});

test('investigation requires evidence and a correct interpretation; mascot and presentation controls work',async({page},testInfo)=>{
 test.setTimeout(60000);await page.goto('/#capitulo-6');
 await page.locator('#investigation summary').click();await page.locator('.hypothesis-options button').last().click();
 await expect(page.locator('.interpretation')).toBeHidden();
 const sliders=page.locator('#experiment input[type=range]');await sliders.first().fill('300');await sliders.first().dispatchEvent('input');await sliders.nth(1).fill('90');await sliders.nth(1).dispatchEvent('input');
 await expect(page.locator('.readout')).toContainText('Sem emissão');
 await page.waitForTimeout(200);await sliders.first().fill('1500');await sliders.first().dispatchEvent('input');
 await expect(page.locator('.interpretation')).toBeVisible();await expect(page.locator('#finish-investigation')).toBeDisabled();
 await page.locator('.conclusion-options button').last().click();await page.locator('#finish-investigation').click();await expect(page.locator('.evidence-status')).toContainText('Evidências verificadas');
 await page.locator('#settings-button').click();await page.locator('#mascot-enabled').uncheck();await page.locator('[data-close=settings]').click();await expect(page.locator('#quantico')).toBeHidden();await page.reload();await expect(page.locator('#quantico')).toBeHidden();
 await page.locator('#settings-button').click();await page.locator('#mascot-enabled').check();await page.locator('#presentation-toggle').click();
 await expect(page.locator('body')).toHaveClass(/presentation-mode/);await expect(page.locator('#presenter-notes')).toBeHidden();await expect(page.locator('#experiment')).toBeVisible();
 await page.locator('#pause-all').check();await page.locator('#camera-captions').uncheck();await expect(page.locator('.scene-hint')).toBeHidden();await expect(page.locator('.scene-label')).toBeVisible();
 await page.screenshot({path:testInfo.outputPath('v3-presentation.png')});await page.locator('#restart-current').click();await page.locator('#leave-presentation').click();await expect(page.locator('body')).not.toHaveClass(/presentation-mode/);await expect(page.locator('#quantico')).toBeVisible();
 await page.screenshot({path:testInfo.outputPath('v3-learning.png'),fullPage:true});
});
