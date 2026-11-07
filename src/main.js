import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import './styles/main.css';
import './styles/classroom.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { chapters } from './content/chapters.js';
import { learning } from './content/learning.js';
import { Stage } from './components/stage.js';
import { Plot } from './components/plot.js';
import { mountExperiment } from './simulations/controller.js';
import { AudioEffects } from './utils/audio.js';

document.querySelector('#app').innerHTML=`
  <a class="skip-link" href="#chapter-title">Ir para conteúdo</a>
  <header class="topbar">
    <a class="brand" href="#capitulo-1" aria-label="Quantum Lab, início"><span class="brand-icon">Q</span><span>QUANTUM <b>LAB</b><small>Explore · experimente · descubra</small></span></a>
    <nav class="toolbar" aria-label="Ferramentas da apresentação">
      <button id="menu-button" aria-expanded="false" aria-controls="chapter-menu">☷ <span>Capítulos</span></button>
      <button id="notes-button" aria-expanded="false" aria-controls="presenter-notes">▤ <span>Notas</span></button>
      <button id="fullscreen" aria-label="Alternar tela cheia">⛶</button>
      <button id="settings-button" aria-expanded="false" aria-controls="settings" aria-label="Configurações">⚙</button>
    </nav>
  </header>
  <main class="workspace">
    <section class="chapter-copy" aria-labelledby="chapter-title">
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
    <section class="laboratory" aria-label="Laboratório interativo">
      <div class="scene-label"><span class="live-dot"></span><span id="model-label"></span></div>
      <div id="stage" class="stage"><p class="scene-hint">Arraste para orbitar <span>·</span> role ou faça pinça para ampliar</p></div>
      <canvas id="plot" class="plot" aria-label="Gráfico quantitativo da simulação" role="img" hidden></canvas>
      <div class="control-deck"><div class="deck-heading"><span>VAMOS EXPERIMENTAR</span><button id="camera-reset" title="Restaurar câmera">↺ Câmera</button></div><p class="experiment-task" id="lesson-action"></p><div id="experiment"></div><details class="observation"><summary>O que devemos perceber?</summary><p id="lesson-observe"></p></details></div>
    </section>
  </main>
  <footer class="navigation">
    <div class="progress-info"><span id="chapter-counter"></span><span id="chapter-short"></span></div>
    <div class="progress-track"><div id="progress"></div></div>
    <div class="navigation-buttons"><button id="previous" aria-label="Capítulo anterior">← <span>Anterior</span></button><button id="next"><span>Próximo</span> →</button></div>
  </footer>
  <dialog id="chapter-menu"><div class="dialog-heading"><h2>Mapa da exploração</h2><button data-close="chapter-menu" aria-label="Fechar menu">✕</button></div><p>16 capítulos · cerca de 38 minutos com demonstrações</p><div id="chapter-links"></div></dialog>
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
    <button id="hide-ui">Ocultar interface (H)</button><p>Movimento reduzido segue a preferência do sistema. A qualidade diminui automaticamente se necessário.</p>
  </dialog>
  <button id="restore-ui" hidden>Mostrar interface · H</button>
  <div id="status" role="status" class="toast" hidden></div>
`;
const $=s=>document.querySelector(s);
const audio=new AudioEffects();let experiment,index=0,started=performance.now(),lastPlot=0,fallbackFrame;
const status=message=>{const el=$('#status');el.textContent=message;el.hidden=false;clearTimeout(status.timeout);status.timeout=setTimeout(()=>el.hidden=true,6000);};
const stage=new Stage($('#stage'),q=>$('#quality').value=q,status);
const plot=new Plot($('#plot'));
const links=$('#chapter-links');
function noteParagraphs(selector,text){
  const root=$(selector);root.replaceChildren();
  for(const line of text.split('\n').filter(s=>s.trim())){const p=document.createElement('p');p.textContent=line.replace(/^- /,'• ');root.append(p);}
}
chapters.forEach((chapter,i)=>{const b=document.createElement('button');b.innerHTML='<span>'+String(i+1).padStart(2,'0')+'</span><strong></strong><small>'+chapter.time+' min</small>';b.querySelector('strong').textContent=chapter.title;b.addEventListener('click',()=>{go(i);$('#chapter-menu').close();$('#menu-button').setAttribute('aria-expanded','false');});links.append(b);});
function go(n,updateHash=true){
  index=Math.max(0,Math.min(15,n));
  experiment?.dispose();const ch=chapters[index],lesson=learning[index];
  document.body.dataset.theme=lesson.theme;
  $('#kicker').textContent=lesson.topic;$('#chapter-title').textContent=ch.title;$('#intro').textContent=lesson.intro;$('#detail').textContent=ch.detail;
  $('#lesson-icon').textContent=lesson.icon;$('#lesson-key').textContent=lesson.key;
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
  [...links.children].forEach((el,i)=>{el.classList.toggle('active',i===index);if(i===index)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
  experiment=mountExperiment(index,$('#experiment'),{onNavigate:go,onSound:f=>audio.play(f)});
  stage.setChapter(index,experiment.state);plot.render(index,experiment.state);
  document.body.dataset.chapter=index;document.title=ch.title+' · QUANTUM LAB';
  $('.chapter-copy').classList.remove('enter');requestAnimationFrame(()=>$('.chapter-copy').classList.add('enter'));
  if(updateHash)history.replaceState(null,'','#capitulo-'+(index+1));
  $('.science-detail').open=false;
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
  try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else status('Use a opção de tela cheia ou adicionar à tela inicial do seu navegador.');}catch{status('O navegador não permitiu tela cheia. Use o menu do navegador.');}
}
$('#fullscreen').addEventListener('click',fullscreen);
for(const [buttonId,dialogId] of [['menu-button','chapter-menu'],['settings-button','settings']]){
  const button=$('#'+buttonId),dialog=$('#'+dialogId);
  button.addEventListener('click',()=>{dialog.showModal();button.setAttribute('aria-expanded','true');});
  dialog.addEventListener('close',()=>button.setAttribute('aria-expanded','false'));
}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
function notes(){const el=$('#presenter-notes');el.hidden=!el.hidden;$('#notes-button').setAttribute('aria-expanded',String(!el.hidden));}
$('#notes-button').addEventListener('click',notes);$('#close-notes').addEventListener('click',notes);
function hideUI(){const hidden=document.body.classList.toggle('immersive');$('#restore-ui').hidden=!hidden;if($('#settings').open)$('#settings').close();}
$('#hide-ui').addEventListener('click',hideUI);$('#restore-ui').addEventListener('click',hideUI);
$('#quality').addEventListener('change',e=>stage.setQuality(e.target.value));
$('#sound').addEventListener('change',e=>{try{audio.setEnabled(e.target.checked);audio.play();}catch{e.target.checked=false;status('Áudio indisponível neste navegador.');}});
$('#restart').addEventListener('click',()=>{started=performance.now();go(0);});
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,select,textarea,button,a,summary,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;
  if(e.key==='ArrowRight'||e.code==='Space'){e.preventDefault();go(index+1);}
  else if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}
  else if(e.key.toLowerCase()==='f')fullscreen();
  else if(e.key.toLowerCase()==='h')hideUI();
  else if(e.key.toLowerCase()==='n')notes();
});
function fromHash(){const match=location.hash.match(/^#capitulo-(\d+)$/);go(match?+match[1]-1:0,false);}
window.addEventListener('hashchange',fromHash);fromHash();
setInterval(()=>{const seconds=Math.floor((performance.now()-started)/1000);$('#timer').textContent='Tempo decorrido: '+Math.floor(seconds/60)+'min '+String(seconds%60).padStart(2,'0')+'s · estimativa total: '+chapters.reduce((a,c)=>a+c.time,0)+' min';},1000);
window.addEventListener('pagehide',()=>{stage.dispose();cancelAnimationFrame(fallbackFrame);},{once:true});
