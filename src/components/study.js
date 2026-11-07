import katex from 'katex';
import { extendedLessons } from '../content/extended.js';
import { chapters } from '../content/chapters.js';
import { learning } from '../content/learning.js';

const units={'ψ':'m⁻³/² para um orbital tridimensional normalizado em SI','|ψ|²':'m⁻³ em coordenadas SI; a cena utiliza raios de Bohr','P(y)':'m⁻¹ quando expressa como densidade por posição na tela','ψ₁ e ψ₂':'m⁻¹/² após normalização na coordenada da tela',E:'joule (J) ou elétron-volt (eV)',h:'J·s',f:'hertz (Hz = s⁻¹)',λ:'metro (m)',L:'metro (m)',d:'metro (m)',Δy:'metro (m)',p:'kg·m/s',Kmax:'J ou eV',hf:'J ou eV',φ:'J ou eV','|ΔE|':'J ou eV',Δx:'metro (m)',Δp:'kg·m/s',ℏ:'J·s',θ:'radianos ou graus, conforme a função utilizada',n:'inteiro sem unidade'};
function paragraphs(root,text){for(const value of text.split('\n\n')){const p=document.createElement('p');p.textContent=value;root.append(p);}}
function section(root,label,id){const details=document.createElement('details');details.className='reading-section';details.dataset.reading=id;const summary=document.createElement('summary');summary.textContent=label;const body=document.createElement('div');body.className='reading-body';details.append(summary,body);root.append(details);return body;}
export function mountStudy(root,index,progress,onStudied){
 const lesson=extendedLessons[index];root.replaceChildren();
 const outer=document.createElement('details');outer.id='full-lesson';outer.className='study-card';const summary=document.createElement('summary');summary.innerHTML='<span>Estudar este capítulo</span><small>Teoria · história · exemplos</small>';outer.append(summary);root.append(outer);
 const intro=section(outer,'1. Introdução','introduction');paragraphs(intro,lesson.introduction);
 const deep=section(outer,'2. Entenda em profundidade','explanation');for(const part of lesson.sections){const h=document.createElement('h3');h.textContent=part.title;deep.append(h);paragraphs(deep,part.text);}
 paragraphs(section(outer,'3. Contexto histórico','history'),lesson.history);
 const examples=section(outer,'4. Exemplos e aplicações','examples');lesson.examples.forEach((text,i)=>{const p=document.createElement('p');p.textContent=(i+1)+'. '+text;examples.append(p);});
 paragraphs(section(outer,'5. Você sabia?','curiosity'),lesson.curiosity);
 if(chapters[index].formula){
  const math=section(outer,'6. Fórmula, unidades e exemplo resolvido','formula');const formula=document.createElement('div');formula.className='formula';math.append(formula);katex.render(chapters[index].formula,formula,{displayMode:true,throwOnError:false});
  const list=document.createElement('dl');list.className='study-symbols';for(const [symbol,meaning]of learning[index].words){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=symbol;dd.textContent=meaning+(units[symbol]?' Unidade: '+units[symbol]+'.':'');list.append(dt,dd);}math.append(list);
  for(const line of lesson.solved||[])paragraphs(math,line);
 }
 paragraphs(section(outer,'Resumo do capítulo','conclusion'),lesson.conclusion);
 const refs=section(outer,'Fontes e leituras','references');const ul=document.createElement('ul');for(const [text,url]of lesson.references){const li=document.createElement('li');if(url){const a=document.createElement('a');a.textContent=text;a.href=url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);}else li.textContent=text;ul.append(li);}refs.append(ul);
 const finish=document.createElement('div');finish.className='reading-finish';const b=document.createElement('button');b.id='mark-studied';b.textContent=progress.studied.has(index)?'✓ Capítulo marcado como estudado':'Marcar como estudado';b.disabled=progress.studied.has(index);finish.append(b);const note=document.createElement('small');note.textContent='Uma marcação pessoal de leitura, sem pontos extras ou medição de tempo.';finish.append(note);outer.append(finish);
 b.addEventListener('click',()=>{onStudied(index);b.disabled=true;b.textContent='✓ Capítulo marcado como estudado';});
}
