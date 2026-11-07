import { doubleSlitIntensity, braggIntensity, H, ME, E_CHARGE } from '../physics/models.js';
export class Plot {
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');}
  render(index,s) {
    const canvas=this.canvas,ctx=this.ctx;
    const visible=[3,5,7,8,9,10].includes(index);canvas.hidden=!visible;if(!visible||!ctx)return;
    const w=canvas.clientWidth||500,h=canvas.clientHeight||120,ratio=Math.min(devicePixelRatio||1,2);
    if(canvas.width!==Math.round(w*ratio)||canvas.height!==Math.round(h*ratio)){canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);}
    ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,w,h);
    const left=18,right=w-18,top=25,bottom=h-24;
    ctx.strokeStyle='#23404f';ctx.beginPath();ctx.moveTo(left,top);ctx.lineTo(left,bottom);ctx.lineTo(right,bottom);ctx.stroke();
    ctx.font='10px system-ui';ctx.fillStyle='#a6bac9';
    const curve=(fn,color,start=-1,end=1)=>{ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=400;i++){const x=start+(end-start)*i/400,y=fn(x);const px=left+i/400*(right-left),py=bottom-y*(bottom-top);i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();};
    if(index===3||index===9){
      const electron=index===9,extent=electron?.012:.012;
      const params=electron?{lambda:5e-12,L:1,d:2e-9,a:.4e-9}:{lambda:s.lambda*1e-9,L:s.L,d:s.d*1e-3,a:40e-6};
      const path=electron&&s.electrons.path;
      curve(x=>doubleSlitIntensity(x,params,path),'#68e5e8',-extent,extent);
      ctx.fillText((electron?'Probabilidade teórica + contagens':'Intensidade relativa')+' · janela ±12 mm',left,13);
      if(electron){
        const hist=s.electrons.histogram,max=Math.max(1,...hist);
        ctx.fillStyle='#ac8bff88';for(let i=0;i<hist.length;i++){const bh=hist[i]/max*(bottom-top);ctx.fillRect(left+i/100*(right-left),bottom-bh,(right-left)/100-1,bh);}
      }
      ctx.fillText('−12 mm',left,h-7);ctx.fillText('posição na tela',w/2-35,h-7);ctx.fillText('+12 mm',right-40,h-7);
    }else if(index===10){
      curve(x=>Math.exp(-x*x/(2*s.sigma*s.sigma)),'#68e5e8',-4,4);
      curve(x=>Math.exp(-x*x*s.sigma*s.sigma*2),'#af8dff',-4,4);
      ctx.fillText('Ciano: posição (nm) · violeta: momento (ℏ/nm) · eixos sobrepostos',left,13);
      ctx.fillText('−4',left,h-7);ctx.fillText('0',w/2,h-7);ctx.fillText('+4',right-15,h-7);
    }else if(index===8){
      const lambda=H/Math.sqrt(2*ME*E_CHARGE*s.voltage);
      curve(x=>braggIntensity(x*Math.PI/180,lambda),'#68e5e8',5,85);
      const x=left+(s.theta-5)/80*(right-left);ctx.strokeStyle='#af8dff';ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);ctx.stroke();
      ctx.fillText('Intensidade relativa × ângulo rasante θ',left,13);ctx.fillText('5°',left,h-7);ctx.fillText('85°',right-20,h-7);
    }else if(index===5){
      const threshold=s.photo.threshold/1e12;
      // Exact Kmax = max(0, hf - phi), including below-threshold configurations.
      curve(f=>Math.max(0,(H*f*1e12/E_CHARGE-H*threshold*1e12/E_CHARGE))/7,'#68e5e8',300,1800);
      const x=left+(s.frequency-300)/1500*(right-left);ctx.fillStyle='#af8dff';ctx.beginPath();ctx.arc(x,bottom-s.photo.kinetic/7*(bottom-top),4,0,Math.PI*2);ctx.fill();
      ctx.fillText('Kmax (escala 0–7 eV) × frequência · f₀ = '+threshold.toFixed(0)+' THz',left,13);
      ctx.fillText('300 THz',left,h-7);ctx.fillText('1.800 THz',right-55,h-7);
    }else if(index===7){
      curve(p=>1/p/4,'#68e5e8',.25,5);
      ctx.fillText('λ relativo × p · relação inversa',left,13);ctx.fillText('0,25 × 10⁻²⁴',left,h-7);ctx.fillText('5 × 10⁻²⁴ kg·m/s',right-95,h-7);
    }
  }
}
