import {test,expect} from '@playwright/test';

test('progress rewards effort, survives reload and never locks the trail',async({page})=>{
 await page.goto('/#capitulo-4');
 await page.locator('.review-options button').nth(1).click();
 await expect(page.locator('.review-feedback')).toContainText('Vamos entender');
 await page.locator('#complete-lesson').click();
 await expect(page.locator('#xp-count')).toHaveText('20 XP');
 await expect(page.locator('#complete-lesson')).toBeDisabled();
 await page.reload();
 await expect(page.locator('#xp-count')).toHaveText('20 XP');
 await expect(page.locator('#complete-lesson')).toBeDisabled();
 await page.locator('#menu-button').click();
 await expect(page.locator('#chapter-links button')).toHaveCount(16);
 await expect(page.locator('.path-item.completed')).toHaveCount(1);
 await page.locator('#chapter-links button').last().click();
 await expect(page.locator('#chapter-counter')).toHaveText('16 / 16');
 await expect(page.locator('#learning-summary')).toBeVisible();
 await page.locator('#settings-button').click();await page.locator('#clear-progress').click();
 await expect(page.locator('#xp-count')).toHaveText('0 XP');
});

test('every lesson can be completed with explanatory feedback and no penalties',async({page})=>{
 test.setTimeout(90000);await page.goto('/#capitulo-1');
 for(let i=1;i<=16;i++){
  await page.evaluate(n=>location.hash='capitulo-'+n,i);
  await expect(page.locator('#chapter-counter')).toHaveText(String(i).padStart(2,'0')+' / 16');
  await page.locator('.review-options button').first().click();
  await expect(page.locator('.review-feedback')).not.toBeEmpty();
  await page.locator('#complete-lesson').click();
  await expect(page.locator('#xp-count')).toHaveText(i*20+' XP');
 }
 await expect(page.locator('.course-progress')).toHaveAttribute('aria-valuenow','16');
 await page.locator('#achievement-continue').click();
 await page.locator('#menu-button').click();
 await expect(page.locator('.achievement.earned')).toHaveCount(4);
 await expect(page.locator('.path-item.completed')).toHaveCount(16);
});

test('Quantum UI has local Nunito, light surfaces and a visible 3D laboratory',async({page},testInfo)=>{
 test.setTimeout(60000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#capitulo-4');await page.evaluate(()=>document.fonts.ready);
 expect(await page.evaluate(()=>document.fonts.check('900 24px Nunito'))).toBeTruthy();
 expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
 await expect(page.locator('#stage canvas')).toBeVisible();
 await page.screenshot({path:testInfo.outputPath('quantum-ui-lesson.png'),fullPage:true});
 await page.locator('#notes-button').click();
 await page.screenshot({path:testInfo.outputPath('quantum-ui-presenter.png')});
 await page.locator('#close-notes').click();await page.locator('#menu-button').click();
 await expect(page.locator('#chapter-links button').first()).toBeInViewport();
 await expect(page.locator('#trail-title')).toHaveText('Uma descoberta leva a outra.');
 await page.screenshot({path:testInfo.outputPath('quantum-ui-trail.png')});
 await page.locator('#chapter-links button').nth(14).click();
 await page.locator('.answers button').first().click();
 await expect(page.locator('.answers button[aria-pressed=true]')).toHaveCount(1);
 await expect(page.locator('.readout')).toContainText('Resposta correta');
 await page.screenshot({path:testInfo.outputPath('quantum-ui-quiz.png'),fullPage:true});
 expect(errors).toEqual([]);
});
