import { slider, button, choices, toggle } from '../components/controls.js';
import { photonEV, photoelectric, METALS, fringeSpacing, transition, deBroglie, gaussianUncertainty, H, ME, E_CHARGE, braggIntensity } from '../physics/models.js';
import { ElectronExperiment } from './electrons.js';
import { timeline, technologies, quiz, references } from '../content/chapters.js';
import { mascotFeedback } from '../components/mascot.js';

export function mountExperiment(index, root, { onNavigate, onSound, onComplete = () => {} }) {
  const state = { index, paused:false, mode:'quantum', lambda:550, d:.25, L:1.8, fronts:true, frequency:700, intensity:50, metal:'cesio', level:1, momentum:1, voltage:54, theta:50, sigma:.8, orbital:'1s', opacity:.65, event:0, tech:0 };
  let disposed = false, quizIndex = 0, score = 0, answered = false;
  const output = document.createElement('div'); output.className = 'readout'; output.setAttribute('role','status');
  const controls = document.createElement('div'); controls.className = 'experiment-controls'; root.append(controls, output);
  function read(text) { if (!disposed) output.textContent = text; }
  let pauseButton;
  const pause = () => pauseButton=button(controls, 'Pausar', b => { state.paused = !state.paused; b.textContent = state.paused ? 'Continuar' : 'Pausar'; });
  const reset = () => button(controls, 'Reiniciar experimento', () => { state.reset = (state.reset || 0) + 1; state.paused = false; if(pauseButton)pauseButton.textContent='Pausar'; if (state.electrons) state.electrons.clear(); });
  if (index === 0) button(controls,'Iniciar exploração →',()=>onNavigate(1),true);
  if (index === 1) choices(controls,'Visualização',[['wave','Onda clássica'],['particle','Partícula clássica'],['quantum','Sistema quântico']],state.mode,v=> {state.mode=v;read(v==='quantum'?'Amplitudes distribuídas; detecções localizadas. Não há trajetória clássica desenhada.':v==='wave'?'Amplitude contínua se propaga e pode interferir.':'Uma localização definida no modelo clássico.');});
  if (index === 2) choices(controls,'Teoria em destaque',[['both','Comparar'],['newton','Newton · corpúsculos'],['huygens','Huygens · ondas']],'both',v=>{state.mode=v;read(v==='both'?'Esquerda: Newton. Direita: Huygens. Propagação em modelos históricos.':v==='newton'?'Corpúsculos e raios: intuição para reflexão; dificuldade com interferência.':'Frentes secundárias: propagação e refração; teoria histórica anterior ao eletromagnetismo.');});
  if (index === 3) {
    const update = () => read('Δy ≈ ' + (fringeSpacing(state.lambda*1e-9,state.L,state.d*1e-3)*1000).toFixed(2) + ' mm · largura da fenda: 40 µm');
    slider(controls,'Comprimento de onda λ',380,750,5,state.lambda,v=>{state.lambda=v;update();},v=>v+' nm');
    slider(controls,'Separação d',.12,.6,.01,state.d,v=>{state.d=v;update();},v=>v.toFixed(2)+' mm');
    slider(controls,'Distância L',.8,3,.1,state.L,v=>{state.L=v;update();},v=>v.toFixed(1)+' m');
    toggle(controls,'Frentes de onda',true,v=>state.fronts=v);pause();reset();
  }
  if (index === 4) {
    slider(controls,'Frequência',300,1500,10,state.frequency,v=>{state.frequency=v;read('Um quantum: '+photonEV(v*1e12).toFixed(3)+' eV · '+(H*v*1e12).toExponential(3)+' J');},v=>v+' THz');
    pause();
  }
  if (index === 5) {
    const update = () => {const r=photoelectric(state.frequency*1e12,METALS[state.metal].phi);state.photo=r;read('hf = '+r.energy.toFixed(2)+' eV · φ = '+METALS[state.metal].phi.toFixed(2)+' eV · '+(r.emits?'Kmax = '+r.kinetic.toFixed(2)+' eV':'Sem emissão: hf < φ')+' · f₀ = '+(r.threshold/1e12).toFixed(0)+' THz');};
    slider(controls,'Frequência da luz',300,1800,10,state.frequency,v=>{state.frequency=v;update();},v=>v+' THz');
    slider(controls,'Intensidade / fluxo',0,100,1,state.intensity,v=>{state.intensity=v;update();},v=>v+'%');
    choices(controls,'Metal',Object.entries(METALS).map(([k,v])=>[k,v.name+' · '+v.phi.toFixed(2)+' eV']),state.metal,v=>{state.metal=v;update();});
    pause();reset();
  }
  if (index === 6) {
    read('Estado inicial: n = 1 · E = −13,60 eV. Selecione outro nível.');
    choices(controls,'Nível final',[1,2,3,4,5].map(n=>[String(n),'n = '+n]),'1',v=>{
      const next=+v;
      if(next===state.level)return;
      state.transition=transition(state.level,next);state.transitionAt=performance.now();state.previous=state.level;state.level=next;
      read(state.transition.type.toUpperCase()+' · |ΔE| = '+Math.abs(state.transition.delta).toFixed(3)+' eV · λ = '+(state.transition.wavelength*1e9).toFixed(1)+' nm');onSound(480+next*90);
    });
  }
  if (index === 7) {
    slider(controls,'Momento do elétron p',.25,5,.05,1,v=>{state.momentum=v;read('Elétron: λ = '+(deBroglie(v*1e-24)*1e9).toFixed(3)+' nm · bola (0,1 kg; 10 m/s): λ = 6,63 × 10⁻³⁴ m');},v=>v.toFixed(2)+' × 10⁻²⁴ kg·m/s');
    pause();
  }
  if (index === 8) {
    const update=()=>{state.eLambda=H/Math.sqrt(2*ME*E_CHARGE*state.voltage);read('λ = '+(state.eLambda*1e9).toFixed(3)+' nm · intensidade relativa = '+braggIntensity(state.theta*Math.PI/180,state.eLambda).toFixed(3)+' · d = 0,091 nm');};
    slider(controls,'Tensão aceleradora',30,200,1,state.voltage,v=>{state.voltage=v;update();},v=>v+' V');
    slider(controls,'Ângulo rasante θ',5,85,.5,state.theta,v=>{state.theta=v;update();},v=>v.toFixed(1)+'°');pause();
  }
  if (index === 9) {
    state.electrons=new ElectronExperiment();state.electrons.clear();
    for(const n of [1,100,1000]) button(controls,'Emitir '+n.toLocaleString('pt-BR')+(n===1?' elétron':' elétrons'),()=>state.electrons.emit(n));
    toggle(controls,'Emissão contínua',false,v=>state.electrons.continuous=v);
    button(controls,'Pausar',b=>{state.electrons.paused=!state.electrons.paused;b.textContent=state.electrons.paused?'Continuar':'Pausar';});
    button(controls,'Limpar tela',()=>state.electrons.clear());
    toggle(controls,'Obter informação de caminho',false,v=>state.electrons.setPath(v));
    read('0 eventos · sem informação de caminho');
  }
  if(index===10) slider(controls,'Largura espacial Δx',.2,2.5,.05,state.sigma,v=>{state.sigma=v;const r=gaussianUncertainty(v*1e-9);read('Δx = '+v.toFixed(2)+' nm · Δp = '+r.sigmaP.toExponential(3)+' kg·m/s · produto = ℏ/2');},v=>v.toFixed(2)+' nm');
  if(index===11) {
    choices(controls,'Orbital',[['1s','1s · esférico'],['2s','2s · nó radial'],['2px','2pₓ'],['2py','2pᵧ'],['2pz','2p𝓏']],state.orbital,v=>{state.orbital=v;read('Arraste para girar · pinça ou rolagem para zoom · pontos amostrados de |ψ|²');});
    slider(controls,'Transparência da nuvem',.15,1,.05,state.opacity,v=>state.opacity=v,v=>Math.round(v*100)+'% opacidade');
  }
  if(index===12) {
    const list=document.createElement('div');list.className='timeline';controls.append(list);
    const detail=document.createElement('p');detail.className='selection-detail';controls.append(detail);
    timeline.forEach((e,i)=>button(list,e[0]+' · '+e[1],b=>{state.event=i;for(const c of list.children)c.classList.toggle('active',c===b);detail.textContent=e[2];read('Marco '+(i+1)+' / '+timeline.length);},i===0));
    detail.textContent=timeline[0][2];
    button(controls,'Explorar capítulo relacionado →',()=>onNavigate(timeline[state.event][3]));
  }
  if(index===13) {
    choices(controls,'Tecnologia',technologies.map((t,i)=>[String(i),t[0]]),'0',v=>{state.tech=+v;read(technologies[+v][1]);});
    pause();
  }
  if(index===14) {
    function showQuiz() {
      controls.replaceChildren(); answered=false;root.classList.add('quiz-experiment');
      if(quizIndex>=quiz.length) {
        const p=document.createElement('h3');p.className='quiz-result';p.textContent='Resultado: '+score+' / 10';controls.append(p);
        read(score>=8?'Excelente compreensão. Revise as explicações e continue explorando.':'Revise os capítulos e tente novamente. Cada erro revela uma oportunidade de aprender.');
        onComplete();
        mascotFeedback('celebrate','Quiz finalizado! Use as explicações para revisar e compartilhar o que aprendeu.');
        button(controls,'Refazer quiz',()=>{quizIndex=0;score=0;showQuiz();});return;
      }
      const progress=document.createElement('div');progress.className='quiz-progress';progress.innerHTML='<span>PERGUNTA '+(quizIndex+1)+' DE 10</span><div><span style="width:'+quizIndex*10+'%"></span></div>';controls.append(progress);
      const q=quiz[quizIndex];const title=document.createElement('h3');title.textContent=(quizIndex+1)+'. '+q[0];controls.append(title);
      const answers=document.createElement('div');answers.className='answers';controls.append(answers);
      q[1].forEach((text,i)=>button(answers,text,b=>{
        if(answered)return;answered=true;const correct=i===q[2];if(correct)score++;
        [...answers.children].forEach((el,j)=>{el.disabled=true;el.setAttribute('aria-pressed',String(j===i));el.classList.toggle('selected',j===i);el.classList.toggle('correct',j===q[2]);if(j===i&&!correct)el.classList.add('incorrect');});
        read((correct?'Correto! ':'Resposta correta: '+q[1][q[2]]+'. ')+q[3]);
        button(controls,quizIndex===9?'Ver resultado →':'Próxima pergunta →',()=>{quizIndex++;showQuiz();},true);
        onSound(correct?720:220);
        mascotFeedback(correct?'happy':'curious',correct?'Boa! Você conectou a ideia ao fenômeno.':'Vamos analisar o resultado. A explicação ajuda a encontrar a resposta.');
      }));
      [...answers.children].forEach((b,i)=>{b.dataset.letter='ABCD'[i];b.setAttribute('aria-pressed','false');});
      read('Questão '+(quizIndex+1)+' / 10 · pontuação '+score);
    }
    showQuiz();
  }
  if(index===15) {
    button(controls,'Recomeçar exploração',()=>onNavigate(0),true);
    const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Referências e leituras';details.append(summary);
    const ul=document.createElement('ul');for(const [label,url] of references){const li=document.createElement('li');if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;li.append(a);}else li.textContent=label;ul.append(li);}details.append(ul);controls.append(details);
    read('As visualizações são modelos; nenhum quadro é apresentado como registro experimental real.');
  }
  return { state, tick(dt) { if(state.electrons){state.electrons.tick(dt);read((state.electrons.total||0).toLocaleString('pt-BR')+' eventos · '+(state.electrons.path?'com informação de caminho · soma incoerente':'sem informação de caminho · interferência')+' · '+state.electrons.pending+' na fila');} }, dispose(){disposed=true;root.replaceChildren();root.classList.remove('quiz-experiment');} };
}
