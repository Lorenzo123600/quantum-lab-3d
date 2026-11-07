export class AudioEffects {
  constructor(){this.enabled=false;this.context=null;}
  setEnabled(v){this.enabled=v;if(v){this.context ||= new (window.AudioContext||window.webkitAudioContext)();this.context.resume();}}
  play(frequency=560){if(!this.enabled||!this.context)return;const t=this.context.currentTime,osc=this.context.createOscillator(),gain=this.context.createGain();osc.type='sine';osc.frequency.setValueAtTime(frequency,t);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.035,t+.015);gain.gain.exponentialRampToValueAtTime(.0001,t+.18);osc.connect(gain);gain.connect(this.context.destination);osc.start(t);osc.stop(t+.2);}
}
