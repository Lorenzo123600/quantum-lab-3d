import {test,expect} from '@playwright/test';

test('each chapter teaches a key idea, an example and an experiment observation',async({page})=>{
  test.setTimeout(60000);
  await page.goto('/#capitulo-1');
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

test('oral notes cover all chapters while long explanations stay off the main screen',async({page})=>{
  test.setTimeout(60000);
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/#capitulo-1');
  await page.locator('#notes-button').click();
  for(let chapter=1;chapter<=16;chapter++){
    await page.evaluate(n=>location.hash='capitulo-'+n,chapter);
    await expect(page.locator('#notes-chapter')).toContainText('Capítulo '+chapter+' ·');
    await expect(page.locator('#notes-text')).toBeVisible();
    expect((await page.locator('#notes-text').textContent()).length).toBeGreaterThan(100);
    await expect(page.locator('#intro')).toBeVisible();
    expect((await page.locator('#intro').textContent()).length).toBeLessThan(200);
    for(const id of ['notes-explanation','notes-example','notes-demonstration','notes-model']){
      const section=page.locator('#'+id).locator('..');
      await section.locator('summary').click();
      await expect(page.locator('#'+id)).toBeVisible();
      await expect(page.locator('#'+id)).not.toBeEmpty();
    }
  }
  await page.goto('/#capitulo-4');
  await page.locator('#notes-example').locator('..').locator('summary').click();
  await expect(page.locator('#notes-example')).toContainText('Δy ≈ 2 mm');
  await page.locator('#close-notes').click();
  await page.goto('/#capitulo-16');
  await page.getByText('Referências e leituras',{exact:true}).click();
  await expect(page.getByText(/Halliday, Resnick/)).toBeVisible();
  await expect(page.locator('#experiment a[href="null"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('the supplied ten-question quiz supports a complete correct run',async({page})=>{
  await page.goto('/#capitulo-15');
  for(const [i,answer] of [1,2,0,3,1,2,0,3,1,0].entries()){
    await page.locator('.answers button').nth(answer).click();
    await expect(page.locator('.readout')).toContainText('Correto!');
    await page.getByRole('button',{name:i===9?'Ver resultado →':'Próxima pergunta →',exact:true}).click();
  }
  await expect(page.locator('#experiment h3')).toHaveText('Resultado: 10 / 10');
});
