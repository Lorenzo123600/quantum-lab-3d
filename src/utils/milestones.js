export const MILESTONE_KEY='physics-milestones-v4';
export class Milestones {
 constructor(storage,progress){this.storage=storage;this.progress=progress;this.flags={experiment:false,correct:false};try{const d=JSON.parse(storage?.getItem(MILESTONE_KEY)||'null');if(d?.version===1)for(const k of ['experiment','correct'])this.flags[k]=d[k]===true;}catch{}}
 record(kind){if(!Object.hasOwn(this.flags,kind)||this.flags[kind])return false;this.flags[kind]=true;this.save();return true;}
 save(){try{this.storage?.setItem(MILESTONE_KEY,JSON.stringify({version:1,...this.flags}));}catch{}}
 clear(){this.flags={experiment:false,correct:false};this.save();}
 get badges(){const p=this.progress;return [['Primeiro experimento',this.flags.experiment],['Primeira hipótese investigada',p.challenges.size>0],['Primeira resposta correta',this.flags.correct],['Metade da jornada',p.completed.size>=8],['16 capítulos concluídos',p.completed.size===16],['320 / 320 pontos',p.xp===320&&p.completed.size===16]];}
 render(root){root.replaceChildren();for(const [name,earned]of this.badges){const p=document.createElement('p');p.className='milestone-medal';p.textContent=(earned?'🏅 Conquistada: ':'○ A explorar: ')+name;root.append(p);}}
}
