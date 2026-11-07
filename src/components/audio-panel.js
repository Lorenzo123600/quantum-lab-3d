import {icon} from './icons.js';
export class AudioPanel {
 constructor(audio,{onVisibility=()=>{}}={}){
  this.audio=audio;this.onVisibility=onVisibility;this.button=document.querySelector('#audio-button');
  const dialog=document.createElement('dialog');dialog.id='audio-panel';dialog.className='audio-panel';dialog.setAttribute('aria-labelledby','audio-title');
  dialog.innerHTML='<div class="dialog-heading"><h2 id="audio-title">Seu universo sonoro</h2><button id="close-audio" aria-label="Fechar áudio">'+icon('close')+'</button></div><p class="audio-intro">Música e efeitos vêm ativados em 100%. Ajuste ou desligue quando quiser. O som começa após sua interação.</p><label class="audio-switch"><span>🎵 Música ambiente</span><input id="audio-music" type="checkbox"></label><label class="audio-volume" for="audio-music-volume">Volume da música <output id="music-volume-label" for="audio-music-volume"></output><input id="audio-music-volume" type="range" min="0" max="100" step="1"></label><label class="audio-switch"><span>⚛️ Efeitos sonoros</span><input id="audio-effects" type="checkbox"></label><label class="audio-volume" for="audio-effects-volume">Volume dos efeitos <output id="effects-volume-label" for="audio-effects-volume"></output><input id="audio-effects-volume" type="range" min="0" max="100" step="1"></label><p id="audio-status" role="status"></p><button id="audio-resume" hidden>Toque para retomar o áudio</button><small>Composição original · Sem vocais · Sem downloads de música</small>';
  document.body.append(dialog);this.dialog=dialog;
  this.button.addEventListener('click',()=>{dialog.showModal();this.button.setAttribute('aria-expanded','true');onVisibility(true);});
  dialog.querySelector('#close-audio').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{this.button.setAttribute('aria-expanded','false');onVisibility(false);this.button.focus({preventScroll:true});});
  for(const [id,key,event]of [['audio-music','music','change'],['audio-effects','effects','change'],['audio-music-volume','musicVolume','input'],['audio-effects-volume','effectsVolume','input']])dialog.querySelector('#'+id).addEventListener(event,e=>{audio.setPreference(key,key.endsWith('Volume')?Number(e.target.value)/100:e.target.checked);if(key==='effects'&&e.target.checked)audio.effect('click');});
  dialog.querySelector('#audio-resume').addEventListener('click',()=>audio.interact());
  this.gesture=e=>{if(e.isTrusted&&(e.type==='pointerdown'||(!e.altKey&&!e.ctrlKey&&!e.metaKey&&['Enter',' ','ArrowLeft','ArrowRight','Tab'].includes(e.key))))audio.interact();};
  this.click=e=>{if(e.target.closest('button:not(:disabled),summary')&&!e.target.closest('#audio-panel,.review-options,.answers,.conclusion-options,#complete-lesson,#finish-investigation'))audio.effect('click');};
  this.semantic=e=>audio.effect(e.detail?.name);this.visibility=()=>audio.visibilityChanged();
  document.addEventListener('pointerdown',this.gesture,true);document.addEventListener('keydown',this.gesture,true);document.addEventListener('click',this.click);window.addEventListener('physics:sound',this.semantic);document.addEventListener('visibilitychange',this.visibility);
  audio.onChange=state=>this.update(state);this.update({...audio.preferences,unavailable:audio.unavailable,running:audio.context?.state==='running',interacted:audio.interacted});
 }
 update(state){
  const dialog=this.dialog,muted=(!state.music||state.musicVolume===0)&&(!state.effects||state.effectsVolume===0);
  this.button.dataset.muted=String(muted||state.unavailable);this.button.setAttribute('aria-label',state.unavailable?'Áudio indisponível. Abrir configurações':muted?'Áudio desativado. Ativar música ou efeitos':'Configurações de áudio');this.button.title=muted?'Áudio opcional: ative aqui':'Configurações de áudio';
  dialog.querySelector('#audio-music').checked=state.music;dialog.querySelector('#audio-effects').checked=state.effects;
  for(const name of ['music','effects']){const val=Math.round(state[name+'Volume']*100);dialog.querySelector('#audio-'+name+'-volume').value=val;dialog.querySelector('#'+name+'-volume-label').value=val+'%';dialog.querySelector('#audio-'+name+'-volume').setAttribute('aria-valuetext',val+' por cento');}
  const legacy=document.querySelector('#sound');if(legacy)legacy.checked=state.effects;
  dialog.querySelector('#audio-status').textContent=state.unavailable?'Áudio indisponível neste navegador. Você pode continuar explorando normalmente.':muted?'Tudo em silêncio. Música e efeitos podem ser ativados separadamente.':state.running?'Preferências salvas neste aparelho. O áudio pausa ao sair desta página.':'Áudio aguardando sua interação. Toque em retomar se necessário.';
  dialog.querySelector('#audio-resume').hidden=muted||state.running||state.unavailable;
 }
 dispose(){document.removeEventListener('pointerdown',this.gesture,true);document.removeEventListener('keydown',this.gesture,true);document.removeEventListener('click',this.click);window.removeEventListener('physics:sound',this.semantic);document.removeEventListener('visibilitychange',this.visibility);this.dialog.remove();}
}
