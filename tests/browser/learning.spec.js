import {test,expect} from '@playwright/test';

test('each chapter teaches a key idea, an example and an experiment observation',async({page})=>{
  await page.goto('/');
  for(let chapter=1;chapter<=16;chapter++){
    await page.evaluate(n=>location.hash='capitulo-'+n,chapter);
    await expect(page.locator('#chapter-counter')).toHaveText(String(chapter).padStart(2,'0')+' / 16');
    await expect(page.locator('#lesson-key')).not.toBeEmpty();
    await expect(page.locator('#lesson-action')).not.toBeEmpty();
    await page.locator('.everyday-detail summary').click();
    await expect(page.locator('#everyday-example')).toBeVisible();
    await page.locator('.observation summary').click();
    await expect(page.locator('#lesson-observe')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  }
  await page.goto('/#capitulo-4');
  await page.locator('.word-guide summary').click();
  await expect(page.locator('#formula-words dt')).toHaveCount(4);
  await expect(page.locator('#formula-words')).toContainText('Comprimento de onda');
  await expect(page.locator('.katex-error')).toHaveCount(0);
  await page.locator('#next').click();
  await expect(page.locator('.word-guide')).not.toHaveAttribute('open','');
});
