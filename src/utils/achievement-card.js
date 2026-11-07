import {hasMaximumPoints} from './maximum-achievement.js';
import {schoolWork} from '../content/school.js';

function textLines(ctx,text,x,y,maxWidth,lineHeight){let line='';for(const word of text.split(' ')){const next=line?line+' '+word:word;if(ctx.measureText(next).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;line=word;}else line=next;}if(line)ctx.fillText(line,x,y);return y+lineHeight;}

export async function createAchievementCard(progress){
 if(!hasMaximumPoints(progress))throw new Error('A conquista requer as 16 lições concluídas e 320 pontos reais.');
 if(document.fonts?.ready)await document.fonts.ready;
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=900;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Não foi possível preparar a imagem neste navegador.');
 const background=ctx.createLinearGradient(0,0,1200,900);background.addColorStop(0,'#101c42');background.addColorStop(1,'#291a49');ctx.fillStyle=background;ctx.fillRect(0,0,1200,900);
 ctx.strokeStyle='#e5bd56';ctx.lineWidth=4;ctx.strokeRect(24,24,1152,852);
 for(let i=0;i<42;i++){const x=(i*191+47)%1130+35,y=(i*137+29)%800+40;ctx.fillStyle=['#64d9ff','#ffd16b','#b99aff','#9fe37d'][i%4];ctx.beginPath();ctx.arc(x,y,i%3+1,0,Math.PI*2);ctx.fill();}
 const disk=ctx.createRadialGradient(555,155,10,600,205,114);disk.addColorStop(0,'#fff3b2');disk.addColorStop(.65,'#f6c34c');disk.addColorStop(1,'#bd7f15');
 ctx.fillStyle='#28a7ee';ctx.fillRect(556,72,40,80);ctx.fillStyle='#a674f0';ctx.fillRect(604,72,40,80);
 ctx.fillStyle=disk;ctx.beginPath();ctx.arc(600,205,104,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ffeaaa';ctx.lineWidth=5;ctx.beginPath();ctx.arc(600,205,91,0,Math.PI*2);ctx.stroke();
 ctx.strokeStyle='#fffce9';ctx.lineWidth=4;for(let i=0;i<3;i++){ctx.save();ctx.translate(600,205);ctx.rotate(i*Math.PI/3);ctx.beginPath();ctx.ellipse(0,0,56,22,0,0,Math.PI*2);ctx.stroke();ctx.restore();}ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(600,205,8,0,Math.PI*2);ctx.fill();
 ctx.textAlign='center';ctx.fillStyle='#ffd77a';ctx.font='900 25px Nunito, sans-serif';ctx.fillText('CONQUISTA QUÂNTICA DESBLOQUEADA',600,355);
 ctx.fillStyle='#fff';ctx.font='900 54px Nunito, sans-serif';textLines(ctx,'VOCÊ DOMINOU O UNIVERSO QUÂNTICO!',600,425,1040,62);
 ctx.fillStyle='#ffd46c';ctx.font='900 76px Nunito, sans-serif';ctx.fillText('320 / 320 PONTOS',600,605);
 ctx.fillStyle='#e3eaff';ctx.font='700 25px Nunito, sans-serif';ctx.fillText('16 lições concluídas • Uma jornada de descobertas',600,660);
 ctx.fillStyle='#bde8ff';ctx.font='900 28px Nunito, sans-serif';ctx.fillText("Lorenzo's Physics",600,724);
 ctx.fillStyle='#e9ddff';ctx.font='700 24px Nunito, sans-serif';textLines(ctx,schoolWork.members.join(' • '),600,776,1050,32);
 ctx.fillStyle='#bbc9df';ctx.font='600 20px Nunito, sans-serif';ctx.fillText(schoolWork.classroom+' • '+schoolWork.year,600,840);
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Não foi possível salvar o cartão.')),'image/png'));
}

export function downloadAchievementCard(blob){
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='lorenzos-physics-conquista-320.png';a.hidden=true;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
