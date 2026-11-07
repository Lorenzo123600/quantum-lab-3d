import {test,expect} from '@playwright/test';
test('all chapters render with no console or page errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('fonts.googleapis'))errors.push(m.text());});
 await page.goto('/');await expect(page.locator('#chapter-title')).toContainText('Dualidade');
 for(let i=1;i<=16;i++){
  await page.evaluate(n=>{location.hash='capitulo-'+n;},i);
  await expect(page.locator('#chapter-counter')).toHaveText(String(i).padStart(2,'0')+' / 16');
  await expect(page.locator('#chapter-title')).not.toBeEmpty();
  await expect(page.locator('#experiment')).not.toBeEmpty();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
 expect(errors).toEqual([]);
});
test('sliders, buttons and scientific state respond',async({page})=>{
 await page.goto('/#capitulo-4');
 const before=await page.locator('.readout').textContent();
 await page.locator('input[type=range]').first().fill('700');await page.locator('input[type=range]').first().dispatchEvent('input');
 await expect(page.locator('.readout')).not.toHaveText(before);
 await page.goto('/#capitulo-6');
 await page.locator('#experiment select').selectOption('zinco');
 const frequency=page.locator('input[type=range]').first();await frequency.fill('300');await frequency.dispatchEvent('input');
 await expect(page.locator('.readout')).toContainText('Sem emissão');
 await frequency.fill('1500');await frequency.dispatchEvent('input');await expect(page.locator('.readout')).toContainText('Kmax');
 await page.goto('/#capitulo-10');await page.getByRole('button',{name:'Emitir 100',exact:true}).click();
 await expect(page.locator('.readout')).toContainText('100 eventos');
 await page.getByLabel('Obter informação de caminho').check();await expect(page.locator('.readout')).toContainText('0 eventos');
 await page.goto('/#capitulo-13');await page.locator('.timeline button').last().click();await expect(page.locator('.selection-detail')).toContainText('biprisma');
 await page.goto('/#capitulo-14');await page.locator('#experiment select').selectOption('5');await expect(page.locator('.readout')).toContainText('fotovoltaico');
});
test('quiz completes, gives explanations and can restart',async({page})=>{
 await page.goto('/#capitulo-15');
 for(let i=0;i<10;i++){
  await page.locator('.answers button').first().click();await expect(page.locator('.answers .correct')).toHaveCount(1);
  await page.getByRole('button',{name:i===9?'Ver resultado →':'Próxima pergunta →',exact:true}).click();
 }
 await expect(page.locator('#experiment h3')).toContainText('Resultado:');
 await page.getByRole('button',{name:'Refazer quiz'}).click();await expect(page.locator('#experiment h3')).toContainText('1.');
});
test('keyboard, chapter menu, notes and restored interface',async({page})=>{
 await page.goto('/');await page.locator('body').click({position:{x:2,y:100}});
 await page.keyboard.press('ArrowRight');await expect(page.locator('#chapter-counter')).toHaveText('02 / 16');
 await page.keyboard.press('Space');await expect(page.locator('#chapter-counter')).toHaveText('03 / 16');
 await page.keyboard.press('n');await expect(page.locator('#presenter-notes')).toBeVisible();
 await page.locator('#close-notes').click();await page.locator('#menu-button').click();await page.locator('#chapter-links button').nth(11).click();
 await expect(page.locator('#chapter-counter')).toHaveText('12 / 16');
 await page.locator('#settings-button').click();await page.locator('#hide-ui').click();await expect(page.locator('#restore-ui')).toBeVisible();
 await page.locator('#restore-ui').click();await expect(page.locator('.topbar')).toBeVisible();
});
test('range arrows do not navigate away',async({page})=>{
 await page.goto('/#capitulo-4');await page.locator('input[type=range]').first().focus();await page.keyboard.press('ArrowRight');
 await expect(page.locator('#chapter-counter')).toHaveText('04 / 16');
});
