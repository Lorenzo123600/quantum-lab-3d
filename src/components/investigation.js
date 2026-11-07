import {soundFeedback} from '../utils/audio-events.js';
import {investigationData,experimentSnapshot,investigationSatisfied} from '../simulations/investigations.js';
import {mascotFeedback} from './mascot.js';
export function mountInvestigation(root,index,getState,progress,onComplete){
 root.replaceChildren();const data=investigationData[index];root.hidden=!data;if(!data)return {update(){}};
 const history=[];let active=false,last='',evidence=false,lastUpdate=0;
 const panel=document.createElement('details');panel.className='investigation';panel.innerHTML='<summary>Investigue: uma hipótese para testar <span>opcional</span></summary><div class="investigation-body"><h3></h3><p>Primeiro, escolha sua previsão. Nenhum controle será bloqueado.</p><div class="hypothesis-options"></div><ol class="investigation-steps" hidden></ol><p class="evidence-status" role="status"></p><div class="interpretation" hidden><h4>Que conclusão os resultados apoiam?</h4><div class="conclusion-options"></div><p class="investigation-feedback" role="status"></p><button class="primary-button" id="finish-investigation" disabled>Concluir investigação</button></div></div>';
 root.append(panel);panel.querySelector('h3').textContent=data.question;
 const hypothesis=panel.querySelector('.hypothesis-options'),steps=panel.querySelector('ol'),status=panel.querySelector('.evidence-status'),interpretation=panel.querySelector('.interpretation'),finish=panel.querySelector('#finish-investigation');
 for(const text of data.steps){const li=document.createElement('li');li.textContent=text;steps.append(li);}
 if(progress.challenges.has(index))status.textContent='✓ Investigação já concluída. Você pode refazê-la.';
 data.choices.forEach((text,i)=>{
  const b=document.createElement('button');b.textContent=text;b.type='button';b.className='hypothesis-choice';b.setAttribute('aria-pressed','false');
  b.addEventListener('click',()=>{active=true;history.length=0;last='';evidence=false;interpretation.hidden=true;finish.disabled=true;for(const el of hypothesis.children)el.setAttribute('aria-pressed',String(el===b));steps.hidden=false;status.textContent='Hipótese registrada. Faça a sequência no simulador e compare os resultados.';capture();mascotFeedback('curious','Boa pergunta! Mude uma condição de cada vez e observe os valores calculados.');});hypothesis.append(b);
  const answer=document.createElement('button');answer.type='button';answer.textContent=text;answer.className='conclusion-choice';answer.setAttribute('aria-pressed','false');
  answer.addEventListener('click',()=>{for(const el of panel.querySelector('.conclusion-options').children)el.setAttribute('aria-pressed',String(el===answer));finish.disabled=!(evidence&&i===data.answer);panel.querySelector('.investigation-feedback').textContent=(i===data.answer?'✓ Isso mesmo. ':'↻ Releia as evidências. ')+data.explanation;soundFeedback(i===data.answer?'correct':'incorrect');mascotFeedback(i===data.answer?'happy':'curious',i===data.answer?'Você relacionou os dados à explicação científica!':'Quase! Compare os resultados com a relação física e tente novamente.');});panel.querySelector('.conclusion-options').append(answer);
 });
 finish.addEventListener('click',()=>{if(!evidence||finish.disabled)return;onComplete(index);finish.disabled=true;finish.textContent='✓ Investigação concluída';status.textContent='✓ Evidências verificadas e conclusão interpretada. '+data.explanation;mascotFeedback('celebrate','Nova descoberta! Você testou uma hipótese e interpretou os resultados.');});
 function capture(){if(!active||evidence)return;const snapshot=experimentSnapshot(getState()),key=JSON.stringify(snapshot);if(last===key)return;last=key;history.push(snapshot);if(history.length>512)history.splice(256,1);if(investigationSatisfied(index,history)){evidence=true;interpretation.hidden=false;status.textContent='✓ A sequência exigida foi observada nos valores do simulador. Agora interprete os resultados.';mascotFeedback('happy','Você reuniu as evidências! Qual conclusão elas apoiam?');}}
 return {update(now=performance.now()){if(now-lastUpdate<100)return;lastUpdate=now;capture();}};
}
