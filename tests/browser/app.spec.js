import {test,expect} from '@playwright/test';
test('all chapters render with no console or page errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('fonts.googleapis'))errors.push(m.text());});
 await page.goto('/#capitulo-1');await expect(page.locator('#chapter-title')).toContainText('Dualidade');
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
 await page.goto('/#capitulo-10');await page.getByRole('button',{name:'Emitir 100 elétrons',exact:true}).click();
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
 await page.goto('/#capitulo-1');await page.locator('body').click({position:{x:2,y:100}});
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

test('exercise ranges, selects, toggles, pause, reset and camera in every experiment',async({page})=>{
 test.setTimeout(90000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#capitulo-1');
 for(let chapter=2;chapter<=14;chapter++){
  await page.evaluate(n=>location.hash='capitulo-'+n,chapter);
  await expect(page.locator('#chapter-counter')).toHaveText(String(chapter).padStart(2,'0')+' / 16');
  const ranges=page.locator('#experiment input[type=range]');
  for(let i=0;i<await ranges.count();i++){
   const range=ranges.nth(i);
   for(const bound of ['max','min']){
    const value=await range.getAttribute(bound);await range.fill(value);await range.dispatchEvent('input');await expect(range).toHaveValue(value);
   }
  }
  const selects=page.locator('#experiment select');
  for(let i=0;i<await selects.count();i++){
   const values=await selects.nth(i).locator('option').evaluateAll(options=>options.map(o=>o.value));
   for(const value of values){await selects.nth(i).selectOption(value);await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>resolve())));}
  }
  const toggles=page.locator('#experiment input[type=checkbox]');
  for(let i=0;i<await toggles.count();i++){await toggles.nth(i).check();await toggles.nth(i).uncheck();}
  const pause=page.getByRole('button',{name:'Pausar',exact:true});
  if(await pause.count()){await pause.click();await page.getByRole('button',{name:'Continuar',exact:true}).click();}
  const reset=page.getByRole('button',{name:'Reiniciar experimento',exact:true});if(await reset.count())await reset.click();
  await page.locator('#camera-reset').click();
  await expect(page.locator('.katex-error')).toHaveCount(0);
 }
 await page.goto('/#capitulo-13');
 const events=page.locator('.timeline button');
 for(let i=0;i<await events.count();i++){await events.nth(i).click();await expect(page.locator('.readout')).toContainText('Marco '+(i+1)+' / 12');}
 await page.locator('#settings-button').click();
 for(const q of ['low','high','medium'])await page.locator('#quality').selectOption(q);
 await page.locator('[data-close=settings]').click();
 expect(errors).toEqual([]);
});
test('touch navigation and camera gestures retain a functional scene',async({page},testInfo)=>{
 await page.goto('/#capitulo-1');
 await page.getByRole('button',{name:'Iniciar exploração →',exact:true}).click();
 await expect(page.locator('#chapter-counter')).toHaveText('02 / 16');
 await page.locator('#previous').click();await page.locator('#next').click();
 await expect(page.locator('#chapter-counter')).toHaveText('02 / 16');
 const scene=page.locator('#stage canvas');await expect(scene).toBeVisible();
 const bounds=await scene.boundingBox();expect(bounds.width).toBeGreaterThan(200);
 await page.mouse.move(bounds.x+bounds.width*.5,bounds.y+bounds.height*.5);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width*.7,bounds.y+bounds.height*.6,{steps:6});await page.mouse.up();
 await page.locator('#camera-reset').click();
 await page.screenshot({path:testInfo.outputPath('quantum-lab.png'),fullPage:true});
});
