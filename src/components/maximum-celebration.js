import {MaximumAchievement} from '../utils/maximum-achievement.js';
import {createAchievementCard,downloadAchievementCard} from '../utils/achievement-card.js';
import {createAchievementMedal} from '../scenes/achievement-medal.js';
import {mascotArtwork} from './mascot.js';
import {physicsEmblem} from './brand.js';
import {schoolWork} from '../content/school.js';

function fallbackMedal(){return '<svg viewBox="0 0 240 260" role="img" aria-label="Medalha digital dourada com átomo"><defs><radialGradient id="maximum-gold"><stop stop-color="#fff4bd"/><stop offset=".65" stop-color="#f6c853"/><stop offset="1" stop-color="#b87718"/></radialGradient></defs><path d="m79 7 42 12-17 95-43-13Z" fill="#28acf5"/><path d="m123 17 43-10 17 94-43 13Z" fill="#a06df1"/><circle cx="122" cy="151" r="91" fill="url(#maximum-gold)" stroke="#fbe198" stroke-width="5"/><circle cx="122" cy="151" r="76" fill="none" stroke="#b77a1b" stroke-width="3"/><g stroke="#fff6cf" stroke-width="4" fill="none"><ellipse cx="122" cy="151" rx="48" ry="18"/><ellipse cx="122" cy="151" rx="48" ry="18" transform="rotate(60 122 151)"/><ellipse cx="122" cy="151" rx="48" ry="18" transform="rotate(120 122 151)"/></g><circle cx="122" cy="151" r="8" fill="#fff"/></svg>';}

export class MaximumCelebration {
 constructor({progress,storage,stage,onVisibility=()=>{},onCelebrate=()=>{},returnFocus=()=>{},mascotEnabled=()=>true}){
  this.onCelebrate=onCelebrate;this.progress=progress;this.stage=stage;this.onVisibility=onVisibility;this.returnFocus=returnFocus;this.mascotEnabled=mascotEnabled;this.unlock=new MaximumAchievement(progress,storage);this.cardPromise=null;this.previewUrl=null;this.generation=0;
  const dialog=document.createElement('dialog');dialog.id='maximum-celebration';dialog.className='maximum-celebration';dialog.setAttribute('aria-labelledby','maximum-title');
  dialog.innerHTML='<div class="award-particles" aria-hidden="true"></div><button class="award-close" aria-label="Fechar comemoração">✕</button><div class="award-inner"><p class="award-kicker">🏆 CONQUISTA DESBLOQUEADA! 🏆</p><div class="award-art"><div class="award-medal" id="award-medal"><div class="award-medal-fallback">'+fallbackMedal()+'</div></div><div class="award-mascot">'+mascotArtwork({crowned:true,id:'maximum-quantico-body'})+'<p>320 PONTOS?! VOCÊ É UMA LENDA DA FÍSICA QUÂNTICA! ⚛️🏆</p></div></div><h1 id="maximum-title" tabindex="-1">VOCÊ DOMINOU O UNIVERSO QUÂNTICO! ⚛️</h1><p class="award-points">320 / 320 PONTOS</p><div class="award-message"><h2>Parabéns, cientista!</h2><p>Você chegou ao final de uma jornada pelo fascinante mundo da física quântica!</p><p>Explorou o comportamento da luz, descobriu os mistérios dos elétrons, investigou o experimento da dupla fenda e conheceu as descobertas que transformaram nossa compreensão do Universo.</p><p>Mas lembre-se:</p><blockquote>“A maior descoberta da ciência é perceber que sempre existe algo novo para aprender.”</blockquote><p>Obrigado por participar da nossa apresentação e por explorar esse universo com a gente!</p><p class="award-signature">Com carinho,<br><strong></strong></p></div><div class="award-actions"><button id="achievement-mine" aria-expanded="false" aria-controls="achievement-card-view">🏆 Minha conquista</button><button id="achievement-share">📸 Compartilhar conquista</button><button id="achievement-continue" class="primary-button">🔬 Continuar explorando</button></div><p class="award-status" role="status"></p><section id="achievement-card-view" hidden><h2>Sua medalha digital</h2><img id="achievement-card-preview" alt="Cartão da conquista quântica: 320 de 320 pontos, com medalha dourada e átomo"><button id="achievement-save">Salvar cartão em PNG</button></section><div class="award-brand">'+physicsEmblem()+'</div></div>';
  dialog.querySelector('.award-signature strong').textContent=schoolWork.members.slice(0,-1).join(', ')+' e '+schoolWork.members.at(-1)+'. 💜';
  document.body.append(dialog);this.dialog=dialog;
  dialog.querySelector('.award-close').addEventListener('click',()=>dialog.close());dialog.querySelector('#achievement-continue').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{this.generation++;this.stage.endOverlay();this.onVisibility(false);clearTimeout(this.particleTimer);dialog.querySelector('.award-particles').replaceChildren();this.releasePreview();this.returnFocus();});
  dialog.querySelector('#achievement-mine').addEventListener('click',()=>this.showCard());
  dialog.querySelector('#achievement-save').addEventListener('click',()=>this.saveCard());
  dialog.querySelector('#achievement-share').addEventListener('click',()=>this.shareCard());
 }
 sync({automatic=false}={}){
  const enabled=this.unlock.unlocked,button=document.querySelector('#maximum-achievement');if(button)button.hidden=!enabled;
  if(!enabled){if(this.dialog.open)this.dialog.close();this.cardPromise=null;return;}
  if(automatic&&this.unlock.claimAutomatic()){if(this.open())this.onCelebrate();}
 }
 open(){
  if(!this.unlock.unlocked||this.dialog.open)return false;
  // Native dialogs are modal. Close another panel before bringing up the award.
  for(const other of document.querySelectorAll('dialog[open]'))if(other!==this.dialog)other.close();
  const dialog=this.dialog;dialog.querySelector('#achievement-card-view').hidden=true;dialog.querySelector('#achievement-mine').setAttribute('aria-expanded','false');dialog.querySelector('.award-status').textContent='';
  dialog.querySelector('.award-mascot').hidden=!this.mascotEnabled();dialog.showModal();dialog.scrollTop=0;this.onVisibility(true);
  let webgl=false;try{webgl=this.stage.beginOverlay(dialog.querySelector('#award-medal'),createAchievementMedal);}catch{}
  dialog.dataset.webgl=String(webgl);this.animateParticles();this.getCard().catch(()=>{});return true;
 }
 animateParticles(){
  const root=this.dialog.querySelector('.award-particles');root.replaceChildren();clearTimeout(this.particleTimer);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('reduced-animation'))return;
  const count=innerWidth<760?28:48,colors=['#64d9ff','#ffd16b','#b99aff','#9fe37d'];
  for(let i=0;i<count;i++){const p=document.createElement('span');p.className='award-particle '+(i%4===0?'particle-star':i%4===1?'particle-electron':'particle-confetti');p.textContent=i%4===0?'✦':i%7===0?'⚛':'';p.style.setProperty('--particle-color',colors[i%4]);p.style.setProperty('--particle-x',((Math.random()-.5)*Math.min(innerWidth,1000))+'px');p.style.setProperty('--particle-y',(-100-Math.random()*270)+'px');p.style.setProperty('--particle-turn',(Math.random()*620-310)+'deg');p.style.setProperty('--particle-delay',(Math.random()*.25)+'s');root.append(p);}
  this.particleTimer=setTimeout(()=>root.replaceChildren(),2300);
 }
 getCard(){if(!this.unlock.unlocked)return Promise.reject(new Error('Conclua as 16 lições para desbloquear o cartão.'));if(!this.cardPromise)this.cardPromise=createAchievementCard(this.progress).catch(error=>{this.cardPromise=null;throw error;});return this.cardPromise;}
 message(text){this.dialog.querySelector('.award-status').textContent=text;}
 async busy(id,action){const button=this.dialog.querySelector(id);if(button.disabled)return;button.disabled=true;button.setAttribute('aria-busy','true');try{await action();}catch(error){this.message(error.message||'Não foi possível preparar o cartão. Tente novamente.');}finally{button.disabled=false;button.removeAttribute('aria-busy');}}
 async showCard(){
  const view=this.dialog.querySelector('#achievement-card-view'),button=this.dialog.querySelector('#achievement-mine');if(!view.hidden){view.hidden=true;button.setAttribute('aria-expanded','false');return;}
  const generation=this.generation;
  await this.busy('#achievement-mine',async()=>{const blob=await this.getCard();if(!this.dialog.open||generation!==this.generation)return;this.releasePreview();this.previewUrl=URL.createObjectURL(blob);this.dialog.querySelector('#achievement-card-preview').src=this.previewUrl;view.hidden=false;button.setAttribute('aria-expanded','true');view.scrollIntoView({block:'nearest',behavior:'instant'});this.message('Sua conquista está pronta. Você pode salvar o cartão em PNG.');});
 }
 async saveCard(){await this.busy('#achievement-save',async()=>{downloadAchievementCard(await this.getCard());this.message('Cartão preparado para salvar. Seu progresso continua guardado.');});}
 async shareCard(){
  await this.busy('#achievement-share',async()=>{
   const blob=await this.getCard(),file=new File([blob],'lorenzos-physics-conquista-320.png',{type:'image/png'});
   if(navigator.share&&navigator.canShare?.({files:[file]})){
    try{await navigator.share({title:'Conquista quântica · 320/320',text:"Concluí as 16 lições no Lorenzo's Physics! ⚛️🏆",files:[file]});this.message('Compartilhamento concluído.');}
    catch(error){if(error.name==='AbortError'){this.message('Compartilhamento cancelado. Sua conquista continua salva.');return;}downloadAchievementCard(blob);this.message('O compartilhamento não ficou disponível. O cartão foi preparado para salvar em PNG.');}
   }else{downloadAchievementCard(blob);this.message('Cartão preparado para salvar em PNG neste dispositivo.');}
  });
 }
 releasePreview(){if(this.previewUrl){URL.revokeObjectURL(this.previewUrl);this.previewUrl=null;}this.dialog.querySelector('#achievement-card-preview')?.removeAttribute('src');}
 dispose(){if(this.dialog.open)this.dialog.close();clearTimeout(this.particleTimer);this.releasePreview();this.dialog.remove();}
}
