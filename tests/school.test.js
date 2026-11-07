import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {schoolWork} from '../src/content/school.js';
import {chapters} from '../src/content/chapters.js';
test('official work metadata preserves all five exact names, including distinct Heloisa and Heloísa',()=>{
 assert.equal(schoolWork.title,'Trabalho sobre física quântica');
 assert.deepEqual(schoolWork.members,['Lorenzo','Maria','Rafaella','Heloisa','Heloísa']);
 assert.equal(new Set(schoolWork.members).size,5);assert.equal(schoolWork.classroom,'3º ano do Ensino Médio');assert.equal(schoolWork.year,2026);
 assert.equal('teacher' in schoolWork,false);assert.equal('classNumber' in schoolWork,false);
});
test('opening and thanks do not change the sixteen scientific chapters; HTML has the official title',()=>{
 assert.equal(chapters.length,16);assert.match(chapters[0].title,/Dualidade/);assert.match(chapters[15].title,/natureza/);
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');assert.ok(html.includes('<title>'+schoolWork.title+'</title>'));assert.ok(html.includes('Heloisa e Heloísa'));
});
