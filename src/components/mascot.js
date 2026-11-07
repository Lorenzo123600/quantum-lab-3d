export function mascotFeedback(type,message){window.dispatchEvent(new CustomEvent('quantum:feedback',{detail:{type,message}}));}
export class QuantumMascot {
 constructor(root,storage){
  this.root=root;this.storage=storage;this.enabled=true;try{this.enabled=storage?.getItem('quantum-mascot-enabled')!=='false';}catch{}
  root.className='quantum-mascot';root.setAttribute('aria-label','Quântico, guia fictício de aprendizagem');
  root.innerHTML='<svg class="mascot-avatar" viewBox="0 0 100 100" role="img" aria-label="Quântico, personagem original azul"><defs><radialGradient id="quantico-body"><stop stop-color="#77dbff"/><stop offset="1" stop-color="#8062ed"/></radialGradient></defs><circle class="mascot-halo" cx="50" cy="50" r="45" fill="#d9d1ff" opacity=".35"/><circle cx="50" cy="50" r="35" fill="url(#quantico-body)" stroke="#5d49ac" stroke-width="2"/><ellipse cx="36" cy="34" rx="10" ry="5" fill="#fff" opacity=".35" transform="rotate(-30 36 34)"/><g class="mascot-eyes"><ellipse cx="38" cy="47" rx="5" ry="8" fill="#fff"/><ellipse cx="62" cy="47" rx="5" ry="8" fill="#fff"/><circle cx="39" cy="49" r="3" fill="#243656"/><circle cx="61" cy="49" r="3" fill="#243656"/></g><path class="mascot-smile" d="M39 62 Q50 72 61 62" fill="none" stroke="#243656" stroke-width="3" stroke-linecap="round"/><circle cx="29" cy="61" r="4" fill="#ffb8e1" opacity=".6"/><circle cx="71" cy="61" r="4" fill="#ffb8e1" opacity=".6"/></svg><div><strong>Quântico <small>seu guia</small></strong><p class="mascot-message" role="status"></p><small class="mascot-disclaimer">Personagem artístico; não é a aparência real de um elétron.</small></div>';
  this.handler=e=>this.say(e.detail.type,e.detail.message);window.addEventListener('quantum:feedback',this.handler);this.setEnabled(this.enabled,false);
 }
 say(type,message){if(!this.enabled)return;this.root.dataset.mood=type;this.root.querySelector('.mascot-message').textContent=message;}
 setEnabled(value,persist=true){this.enabled=value;this.root.hidden=!value;if(persist)try{this.storage?.setItem('quantum-mascot-enabled',String(value));}catch{}}
 dispose(){window.removeEventListener('quantum:feedback',this.handler);}
}
