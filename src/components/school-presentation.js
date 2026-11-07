import {schoolWork as work} from '../content/school.js';
import {icon} from './icons.js';
import {physicsEmblem} from './brand.js';

export class SchoolPresentation {
 constructor(root,{onStart,onOpening,onChapters,onExperiments,onSkip}){
  this.root=root;this.active=false;this.kind='opening';
  root.innerHTML='<div class="school-hero"><div class="school-visual" id="school-visual"><div class="school-fallback" aria-hidden="true">'+icon('atom')+'</div></div><div class="school-copy"><p class="school-eyebrow"></p><h1 id="school-title" tabindex="-1"></h1><p class="school-subtitle"></p><div class="school-identity"><span class="school-work-label"></span><h2></h2><p class="school-classroom"></p><p class="school-presented"></p><p class="school-memberline"></p><p class="school-year"></p></div><div class="school-actions"><button id="school-start" class="primary-button">INICIAR APRESENTAÇÃO '+icon('arrow')+'</button><button id="school-home">Voltar ao início</button><button id="school-chapters">Revisar capítulos</button><button id="school-experiments">Explorar experimentos</button></div><p class="school-keyboard"></p></div><button id="skip-opening" class="school-skip">Pular animação</button><p class="school-art-note"></p></div><section class="school-team" aria-label="Integrantes do trabalho"><h2>Integrantes</h2><div class="school-member-cards"></div><p class="school-topic"></p></section>';
  this.visual=root.querySelector('#school-visual');
  const emblem=document.createElement('div');emblem.className='school-emblem';emblem.innerHTML=physicsEmblem();root.querySelector('.school-copy').prepend(emblem);
  root.querySelector('.school-eyebrow').textContent=work.label;
  root.querySelector('.school-work-label').textContent=work.label;
  root.querySelector('.school-identity h2').textContent=work.title;
  root.querySelector('.school-classroom').textContent=work.classroom;
  root.querySelector('.school-memberline').textContent=work.members.join(' • ');
  root.querySelector('.school-year').textContent=work.year;
  root.querySelector('.school-topic').textContent='Tema: '+work.topic;
  const colors=['cyan','purple','orange','green','pink'],icons=['atom','wave','flask','spark','target'];
  work.members.forEach((name,i)=>{const card=document.createElement('div');card.className='school-member';card.dataset.theme=colors[i];card.style.setProperty('--member-delay',(.16*i)+'s');card.innerHTML=icon(icons[i])+'<strong class="member-name"></strong>';card.querySelector('strong').textContent=name;root.querySelector('.school-member-cards').append(card);});
  root.querySelector('#school-start').addEventListener('click',onStart);
  root.querySelector('#school-home').addEventListener('click',onOpening);
  root.querySelector('#school-chapters').addEventListener('click',onChapters);
  root.querySelector('#school-experiments').addEventListener('click',onExperiments);
  root.querySelector('#skip-opening').addEventListener('click',()=>{this.skip();onSkip();});
 }
 show(kind,webgl){
  this.active=true;this.kind=kind;this.root.hidden=false;this.root.dataset.screen=kind;this.root.dataset.webgl=String(webgl);this.root.classList.remove('skip-animation');
  const ending=kind==='ending';
  this.root.querySelector('#school-title').textContent=ending?work.thanks:work.title;
  this.root.querySelector('.school-subtitle').textContent=ending?work.closing:work.subtitle;
  this.root.querySelector('.school-presented').textContent=ending?'Apresentado por:':'Integrantes:';
  this.root.querySelector('.school-art-note').textContent=ending?'Metáfora artística: a onda e os pontos não são uma filmagem de colapso da função de onda.':'Representação artística do átomo: a nuvem não mostra trajetórias eletrônicas reais.';
  this.root.querySelector('.school-keyboard').textContent=ending?'← volta ao capítulo 16 · A apresentação termina aqui, sem reiniciar automaticamente.':'Espaço, Enter ou → para iniciar · F para tela cheia · P para modo apresentação';
  this.root.querySelector('#skip-opening').hidden=ending;
  this.root.querySelector('#school-start').hidden=ending;
  for(const id of ['school-home','school-chapters','school-experiments'])this.root.querySelector('#'+id).hidden=!ending;
  document.title=(ending?'Agradecimento · ':'')+work.title;
 }
 hide(){this.active=false;this.root.hidden=true;}
 skip(){this.root.classList.add('skip-animation');}
}
