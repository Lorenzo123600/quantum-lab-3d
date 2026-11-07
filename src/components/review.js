import { reviews } from '../content/review.js';
import { icon } from './icons.js';

export function mountReview(host, index, progress, onComplete) {
  const [question, choices, answer, explanation] = reviews[index];
  host.replaceChildren();
  host.innerHTML = '<div class="review-heading"><span class="section-label">'+icon('target')+' CONFIRA SUA DESCOBERTA</span><span class="xp-tag">+20 XP simbólicos</span></div><h2></h2><p class="review-intro">Uma pergunta rápida para conversar com a turma. Pode tentar sem medo.</p><div class="review-options"></div><div class="review-feedback" role="status" hidden></div><div class="review-finish"><button class="primary-button" id="complete-lesson" disabled>Concluir lição</button><span>Você pode navegar livremente, mesmo sem responder.</span></div>';
  host.querySelector('h2').textContent = question;
  const options = host.querySelector('.review-options'), feedback = host.querySelector('.review-feedback'), complete = host.querySelector('#complete-lesson');
  function completedState() { const done=progress.completed.has(index);complete.textContent=done?'✓ Lição concluída':'Concluir lição · +20 XP';complete.disabled=done; }
  choices.forEach((text,i)=>{
    const b=document.createElement('button');b.className='review-option';b.type='button';b.setAttribute('aria-pressed','false');
    const letter=document.createElement('span');letter.className='option-letter';letter.textContent='ABC'[i];const label=document.createElement('span');label.textContent=text;b.append(letter,label);
    b.addEventListener('click',()=>{
      for(const child of options.children){child.classList.remove('selected','correct','incorrect');child.setAttribute('aria-pressed','false');}
      b.setAttribute('aria-pressed','true');b.classList.add('selected',i===answer?'correct':'incorrect');
      options.children[answer].classList.add('correct');feedback.hidden=false;feedback.className='review-feedback '+(i===answer?'success':'retry');
      feedback.textContent=(i===answer?'✓ Isso mesmo! ':'↻ Vamos entender: ')+explanation;completedState();
    });options.append(b);
  });
  if(progress.completed.has(index)){complete.textContent='✓ Lição concluída';}
  complete.addEventListener('click',()=>{onComplete(index);completedState();host.classList.remove('celebrate');requestAnimationFrame(()=>host.classList.add('celebrate'));});
}
