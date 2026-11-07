import { icon, lessonIcons } from './icons.js';
import { badges } from '../utils/progress.js';
import { physicsEmblem } from './brand.js';

export class LearningTrail {
  constructor(root, chapters, learning, progress, onSelect) {
    this.root=root;this.progress=progress;this.buttons=[];
    const brand=document.createElement('div');brand.className='trail-brand';brand.innerHTML=physicsEmblem();document.querySelector('.trail-intro').prepend(brand);
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
    svg.classList.add('trail-connector');svg.setAttribute('viewBox','0 0 320 1736');svg.setAttribute('aria-hidden','true');
    let d='M35 43';
    for(let i=1;i<16;i++){const prevX=35+Math.round(Math.sin((i-1)*Math.PI/2)*44),x=35+Math.round(Math.sin(i*Math.PI/2)*44),prevY=43+(i-1)*110,y=43+i*110;d+=' C'+prevX+' '+(prevY+55)+','+x+' '+(y-55)+','+x+' '+y;}
    path.setAttribute('d',d);svg.append(path);root.append(svg);
    chapters.forEach((chapter,i)=>{
      const b=document.createElement('button');b.type='button';b.className='path-item';b.dataset.theme=learning[i].theme;b.style.setProperty('--node-offset',Math.round(Math.sin(i*Math.PI/2)*44)+'px');
      b.innerHTML='<span class="path-orb">'+icon(lessonIcons[i])+'</span><span class="path-copy"><small>LIÇÃO '+String(i+1).padStart(2,'0')+'</small><strong></strong><span class="path-state"></span></span><span class="path-marker" aria-hidden="true"></span>';
      b.querySelector('strong').textContent=chapter.title;
      b.addEventListener('click',()=>onSelect(i));root.append(b);this.buttons.push(b);
    });
  }
  update(current) {
    const total=this.progress.completed.size;
    this.buttons.forEach((b,i)=>{
      const done=this.progress.completed.has(i),active=i===current;b.classList.toggle('completed',done);b.classList.toggle('active',active);
      if(active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
      b.querySelector('.path-state').textContent=done?'Concluída · 20 XP':active?'Você está aqui':'Explorar · acesso livre';
      b.querySelector('.path-marker').innerHTML=done?icon('check'):active?icon('arrow'):'';
    });
    document.querySelector('#trail-count').textContent=total+' de 16 lições concluídas';
    document.querySelector('#trail-xp').textContent=this.progress.xp+' XP';
    const target=document.querySelector('#achievement-list');target.replaceChildren();
    for(const badge of badges){const item=document.createElement('div');item.className='achievement'+(total>=badge.count?' earned':'');item.innerHTML=icon(badge.icon)+'<span></span><small></small>';item.querySelector('span').textContent=badge.name;item.querySelector('small').textContent=total>=badge.count?'Conquistada':badge.count+' lição'+(badge.count>1?'s':'');target.append(item);}
  }
}
