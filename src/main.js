import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import './styles/quantum-ui.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { chapters } from './content/chapters.js';
import { learning } from './content/learning.js';
import { Stage } from './components/stage.js';
import { Plot } from './components/plot.js';
import { mountExperiment } from './simulations/controller.js';
import { AudioEffects } from './utils/audio.js';
import { LearningProgress } from './utils/progress.js';
import { LearningTrail } from './components/trail.js';
import { mountReview } from './components/review.js';
import { icon, lessonIcons } from './components/icons.js';

document.querySelector('#app').innerHTML=`
  <a class="skip-link" href="#chapter-title">Ir para conteúdo</a>
  <header class="topbar">
    <a class="brand" href="#capitulo-1" aria-label="Quantum Lab, início"><span class="brand-icon">${icon('atom')}</span><span>quantum<span class="brand-lab">lab</span><small>Pequenas perguntas. Grandes descobertas.</small></span></a>
    <nav class="toolbar" aria-label="Ferramentas da apresentação">
      <span class="xp-counter" title="Pontos simbólicos, sem competição">${icon('spark')}<span id="xp-count">0 XP</span></span>
      <button id="menu-button" aria-label="Abrir trilha de capítulos" aria-expanded="false" aria-controls="chapter-menu">${icon('trail')} <span>Trilha</span></button>
      <button id="notes-button" aria-label="Notas do apresentador" aria-expanded="false" aria-controls="presenter-notes">${icon('book')} <span>Apresentador</span></button>
      <button id="fullscreen" aria-label="Alternar tela cheia">${icon('fullscreen')}</button>
      <button id="settings-button" aria-expanded="false" aria-controls="settings" aria-label="Configurações">${icon('gear')}</button>
    </nav>
  </header>
  <div class="course-bar"><span id="course-status">Sua jornada está começando</span><div class="course-progress" role="progressbar" aria-label="Lições concluídas" aria-valuemin="0" aria-valuemax="16" aria-valuenow="0"><span id="course-fill"></span></div><strong id="course-count">0 / 16</strong></div>
  <nav class="lesson-steps" aria-label="Etapas da lição"><button data-jump="chapter-title"><span>1</span> Entenda</button><span class="step-line"></span><button data-jump="laboratory"><span>2</span> Experimente</button><span class="step-line"></span><button data-jump="lesson-review"><span>3</span> Confira</button></nav>
  <main id="lesson-main"><div class="workspace">
    <section class="chapter-copy" aria-labelledby="chapter-title" id="lesson-content">
      <div class="lesson-location"><span id="lesson-number"></span><span class="subject-tag">FÍSICA QUÂNTICA</span></div>
      <div class="eyebrow" id="kicker"></div>
      <h1 id="chapter-title" tabindex="-1"></h1>
      <p class="lead" id="intro"></p>
      <section class="key-card" aria-label="Ideia principal"><span id="lesson-icon" aria-hidden="true"></span><div><h2>Guarde esta ideia</h2><p id="lesson-key"></p></div></section>
      <div id="formula" class="formula"></div>
      <details class="word-guide" hidden><summary>O que significa cada símbolo?</summary><dl id="formula-words"></dl></details>
      <details class="everyday-detail"><summary>Exemplo para entender</summary><p id="everyday-example"></p></details>
      <details class="science-detail"><summary>Saiba mais sobre o modelo</summary><p id="detail"></p></details>
      <span class="chapter-duration" id="duration"></span>
    </section>
    <section class="laboratory" id="laboratory" aria-label="Laboratório interativo" tabindex="-1">
      <div class="lab-title"><span>${icon('flask')} SEU LABORATÓRIO 3D</span><span class="lab-badge">Interativo</span></div>
      <div class="simulation-window"><div class="scene-label"><span class="live-dot"></span><span id="model-label"></span></div>
      <div id="stage" class="stage"><p class="scene-hint">Arraste para orbitar <span>·</span> role ou faça pinça para ampliar</p></div>
      <canvas id="plot" class="plot" aria-label="Gráfico quantitativo da simulação" role="img" hidden></canvas>
      </div><div class="control-deck"><div class="deck-heading"><span>Agora, teste uma ideia</span><button id="camera-reset" title="Restaurar câmera">↺ Câmera</button></div><p class="experiment-task" id="lesson-action"></p><div id="experiment"></div><details class="observation"><summary>O que devemos perceber?</summary><p id="lesson-observe"></p></details></div>
    </section>
  </div><section id="lesson-review" class="lesson-review" aria-label="Revisão da lição" tabindex="-1"></section><section id="learning-summary" class="learning-summary" hidden><h2>Você ampliou seu olhar sobre a natureza.</h2><p>Amplitudes podem interferir. Detecções são localizadas. Modelos visuais têm limites.</p><p id="summary-progress"></p><button id="summary-trail">Ver minhas descobertas</button></section></main>
  <footer class="navigation">
    <div class="progress-info"><span id="chapter-counter"></span><span id="chapter-short"></span></div>
    <div class="progress-track"><div id="progress"></div></div>
    <div class="navigation-buttons"><button id="previous" aria-label="Capítulo anterior">← <span>Anterior</span></button><button id="next"><span>Próximo</span> →</button></div>
  </footer>
  <dialog id="chapter-menu" aria-labelledby="trail-title"><div class="dialog-heading"><span class="section-label">${icon('trail')} SUA JORNADA</span><button data-close="chapter-menu" aria-label="Fechar menu">${icon('close')}</button></div><div class="trail-layout"><div class="trail-intro"><div class="trail-art">${icon('atom')}</div><h2 id="trail-title">Uma descoberta<br>leva a outra.</h2><p>16 lições para explorar a luz, a matéria e tudo o que surpreende.</p><div class="trail-stat"><strong id="trail-count"></strong><span id="trail-xp"></span></div><p class="trail-help">Todos os capítulos estão abertos. Escolha por onde explorar!</p><button id="resume-lesson" class="primary-button">Continuar minha jornada ${icon('arrow')}</button><h3>Suas conquistas</h3><div id="achievement-list"></div><small>Progresso salvo só neste aparelho. Sem conta, sem ranking.</small></div><div class="trail-scroll"><div id="chapter-links"></div></div></div></dialog>
  <aside id="presenter-notes" class="notes-panel" hidden aria-label="Roteiro oral do capítulo"><div class="dialog-heading"><h2>Notas do apresentador</h2><button id="close-notes" aria-label="Fechar notas">✕</button></div>
    <p id="notes-chapter" class="notes-chapter"></p>
    <section class="oral-script"><h3>Para falar à turma</h3><p id="notes-text"></p></section>
    <p id="support-text" class="notes-takeaway"></p>
    <details class="presenter-section"><summary>Explicação de apoio</summary><div id="notes-explanation"></div></details>
    <details class="presenter-section"><summary>Exemplo e aplicação</summary><div id="notes-example"></div></details>
    <details class="presenter-section"><summary>Como conduzir a demonstração</summary><div id="notes-demonstration"></div></details>
    <details class="presenter-section"><summary>Precisão científica e limites do modelo</summary><div id="notes-model"></div></details>
    <section id="notes-caution-section" class="notes-caution" hidden><h3 id="notes-caution-label"></h3><p id="notes-caution"></p></section>
    <small>← → navegar · espaço avançar · F tela cheia · H ocultar interface · N notas. Controles de formulário preservam suas próprias teclas.</small><p id="timer"></p><button id="restart">Reiniciar apresentação</button></aside>
  <dialog id="settings"><div class="dialog-heading"><h2>Preparar apresentação</h2><button data-close="settings" aria-label="Fechar configurações">✕</button></div>
    <label>Qualidade gráfica<select id="quality"><option value="low">Baixa · economia</option><option value="medium" selected>Média · equilibrada</option><option value="high">Alta · mais partículas</option></select></label>
    <label class="toggle-control"><input id="sound" type="checkbox">Efeitos sonoros opcionais</label>
    <button id="fullscreen-settings">Alternar tela cheia</button>
    <button id="hide-ui">Ocultar interface (H)</button><p>Movimento reduzido segue a preferência do sistema. A qualidade diminui automaticamente se necessário.</p>
    <button id="clear-progress" class="text-button">Zerar progresso neste aparelho</button><p id="storage-note">Somente lições concluídas e o último capítulo são salvos no navegador.</p>
  </dialog>
  <button id="restore-ui" hidden>Mostrar interface · H</button>
  <div id="status" role="status" class="toast" hidden></div>
`;
const $=s=>document.querySelector(s);
const audio=new AudioEffects();let experiment,index=0,started=performance.now(),lastPlot=0,fallbackFrame;
const status=message=>{const el=$('#status');el.textContent=message;el.hidden=false;clearTimeout(status.timeout);status.timeout=setTimeout(()=>el.hidden=true,6000);};
let storage;try{storage=window.localStorage;}catch{}
const progress=new LearningProgress(storage,change=>{
  updateProgress();
  if(change.reset){status('Progresso reiniciado. As lições continuam abertas.');return;}
  status('✓ Lição concluída! +20 XP simbólicos.'+(change.newBadge?' Conquista: '+change.newBadge.name+'.':'')+(!change.saved?' O navegador não permitiu salvar; o progresso vale nesta sessão.':''));
  audio.play(760);
});
const stage=new Stage($('#stage'),q=>$('#quality').value=q,status);
const plot=new Plot($('#plot'));
const trail=new LearningTrail($('#chapter-links'),chapters,learning,progress,i=>{go(i);$('#chapter-menu').close();});
function updateProgress(){
  const count=progress.completed.size;
  $('#xp-count').textContent=progress.xp+' XP';$('#course-count').textContent=count+' / 16';$('#course-fill').style.width=(count/16*100)+'%';
  $('.course-progress').setAttribute('aria-valuenow',count);$('#course-status').textContent=count===16?'Jornada concluída. Continue explorando!':count?'Cada descoberta conta. Continue assim!':'Sua jornada está começando';
  $('#summary-progress').textContent=count+' lições concluídas · '+progress.xp+' XP simbólicos';
  $('#storage-note').textContent=progress.saved?'Seu progresso fica neste aparelho. Nenhum dado é enviado.':'O armazenamento não está disponível. Você pode usar todas as lições nesta sessão.';
  trail.update(index);
}
function noteParagraphs(selector,text){
  const root=$(selector);root.replaceChildren();
  for(const line of text.split('\n').filter(s=>s.trim())){const p=document.createElement('p');p.textContent=line.replace(/^- /,'• ');root.append(p);}
}
function go(n,updateHash=true){
  index=Math.max(0,Math.min(15,n));
  experiment?.dispose();const ch=chapters[index],lesson=learning[index];
  document.body.dataset.theme=lesson.theme;
  $('#lesson-number').textContent='LIÇÃO '+String(index+1).padStart(2,'0')+' DE 16';
  $('#kicker').textContent=lesson.topic;$('#chapter-title').textContent=ch.title;$('#intro').textContent=lesson.intro;$('#detail').textContent=ch.detail;
  $('#lesson-icon').innerHTML=icon(lessonIcons[index]);$('#lesson-key').textContent=lesson.key;
  $('#everyday-example').textContent=lesson.example;$('#lesson-action').textContent=lesson.action;$('#lesson-observe').textContent=lesson.observe;
  $('#formula-words').replaceChildren();
  for(const [symbol,meaning] of lesson.words){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=symbol;dd.textContent=meaning;$('#formula-words').append(dt,dd);}
  $('.word-guide').hidden=!ch.formula||!lesson.words.length;
  for(const selector of ['.word-guide','.everyday-detail','.observation'])$(selector).open=false;
  $('#model-label').textContent=ch.kind;$('#duration').textContent='Exploração guiada · '+ch.time+' min';$('#formula').replaceChildren();
  if(ch.formula)katex.render(ch.formula,$('#formula'),{throwOnError:false,displayMode:true,output:'htmlAndMathml'});
  $('#formula').hidden=!ch.formula;
  $('#notes-chapter').textContent='Capítulo '+(index+1)+' · '+ch.title;
  $('#notes-text').textContent=ch.notes;$('#support-text').textContent='Ideia para reforçar: '+lesson.key;
  noteParagraphs('#notes-explanation',ch.explanation);
  noteParagraphs('#notes-example',ch.example);
  noteParagraphs('#notes-demonstration',lesson.action+'\n'+ch.demonstrationNotes);
  noteParagraphs('#notes-model',ch.detail);
  $('#notes-caution-section').hidden=!ch.caution;$('#notes-caution-label').textContent=ch.cautionLabel;$('#notes-caution').textContent=ch.caution;
  document.querySelectorAll('.presenter-section').forEach(el=>el.open=false);
  $('#presenter-notes').scrollTop=0;
  $('#chapter-counter').textContent=String(index+1).padStart(2,'0')+' / 16';
  $('#chapter-short').textContent=ch.title;$('#progress').style.width=((index+1)/16*100)+'%';
  $('#previous').disabled=index===0;$('#next').disabled=index===15;
  progress.visit(index);updateProgress();
  mountReview($('#lesson-review'),index,progress,i=>progress.complete(i));
  $('#learning-summary').hidden=index!==15;
  experiment=mountExperiment(index,$('#experiment'),{onNavigate:go,onSound:f=>audio.play(f),onComplete:()=>progress.complete(index)});
  stage.setChapter(index,experiment.state);plot.render(index,experiment.state);
  document.body.dataset.chapter=index;document.title=ch.title+' · QUANTUM LAB';
  $('.chapter-copy').classList.remove('enter');requestAnimationFrame(()=>$('.chapter-copy').classList.add('enter'));
  if(updateHash)history.replaceState(null,'','#capitulo-'+(index+1));
  $('.science-detail').open=false;
  window.scrollTo({top:0,behavior:'instant'});
}
function tick(dt){
  experiment?.tick(dt);
  const now=performance.now();if(now-lastPlot>80&&experiment){plot.render(index,experiment.state);lastPlot=now;}
}
stage.onTick=tick;
if(!stage.renderer){let last=performance.now();const loop=now=>{if(!document.hidden)tick(Math.min((now-last)/1000,.05));last=now;fallbackFrame=requestAnimationFrame(loop);};fallbackFrame=requestAnimationFrame(loop);$('#camera-reset').disabled=true;}
$('#next').addEventListener('click',()=>go(index+1));$('#previous').addEventListener('click',()=>go(index-1));
$('#camera-reset').addEventListener('click',()=>stage.resetCamera());
async function fullscreen(){
  const button=$('#fullscreen');button.disabled=true;button.setAttribute('aria-busy','true');
  try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else status('Use a opção de tela cheia ou adicionar à tela inicial do seu navegador.');}catch{status('O navegador não permitiu tela cheia. Use o menu do navegador.');}finally{button.disabled=false;button.removeAttribute('aria-busy');}
}
$('#fullscreen').addEventListener('click',fullscreen);
$('#fullscreen-settings').addEventListener('click',fullscreen);
for(const [buttonId,dialogId] of [['menu-button','chapter-menu'],['settings-button','settings']]){
  const button=$('#'+buttonId),dialog=$('#'+dialogId);
  button.addEventListener('click',()=>{dialog.showModal();button.setAttribute('aria-expanded','true');stage.suspended=true;});
  dialog.addEventListener('close',()=>{button.setAttribute('aria-expanded','false');stage.suspended=false;});
}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
function notes(){const el=$('#presenter-notes');el.hidden=!el.hidden;$('#notes-button').setAttribute('aria-expanded',String(!el.hidden));}
$('#notes-button').addEventListener('click',notes);$('#close-notes').addEventListener('click',notes);
function hideUI(){const hidden=document.body.classList.toggle('immersive');$('#restore-ui').hidden=!hidden;if($('#settings').open)$('#settings').close();}
$('#hide-ui').addEventListener('click',hideUI);$('#restore-ui').addEventListener('click',hideUI);
$('#quality').addEventListener('change',e=>stage.setQuality(e.target.value));
$('#sound').addEventListener('change',e=>{try{audio.setEnabled(e.target.checked);audio.play();}catch{e.target.checked=false;status('Áudio indisponível neste navegador.');}});
$('#restart').addEventListener('click',()=>{started=performance.now();go(0);});
$('#clear-progress').addEventListener('click',()=>{progress.clear();mountReview($('#lesson-review'),index,progress,i=>progress.complete(i));});
$('#resume-lesson').addEventListener('click',()=>{go(progress.lastChapter);$('#chapter-menu').close();});
$('#summary-trail').addEventListener('click',()=>$('#menu-button').click());
document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>{const target=$('#'+b.dataset.jump);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});target.focus({preventScroll:true});}));
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,select,textarea,button,a,summary,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;
  if(e.key==='ArrowRight'||e.code==='Space'){e.preventDefault();go(index+1);}
  else if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}
  else if(e.key.toLowerCase()==='f')fullscreen();
  else if(e.key.toLowerCase()==='h')hideUI();
  else if(e.key.toLowerCase()==='n')notes();
});
function fromHash(){const match=location.hash.match(/^#capitulo-(\d+)$/);go(match?+match[1]-1:progress.lastChapter,false);}
window.addEventListener('hashchange',fromHash);fromHash();
setInterval(()=>{const seconds=Math.floor((performance.now()-started)/1000);$('#timer').textContent='Tempo decorrido: '+Math.floor(seconds/60)+'min '+String(seconds%60).padStart(2,'0')+'s · estimativa total: '+chapters.reduce((a,c)=>a+c.time,0)+' min';},1000);
window.addEventListener('pagehide',()=>{stage.dispose();cancelAnimationFrame(fallbackFrame);},{once:true});
