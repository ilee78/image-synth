import Metronome from './Metronome.js';

class SoundModule {
  constructor(context, r, g, b, a) {

    this._context = context;
    this._osc = new OscillatorNode(this._context);
    this._amp = new GainNode(this._context);
    this._osc.type = 'sine';
    
    this._metro = new Metronome(this._context);
    this._metro.setBPM(100);
    
    this.output = new GainNode(this._context);
    this._osc.connect(this._amp).connect(this.output);
    this._osc.start();
    this._notePitch = null;
    this._osc.frequency.value = this._notePitch;
  }
  
  play(r) {
    console.log("hello");
    this._metro.start();
    this._metro.onbeat = (start, interval, counter) => {
      if(counter > 400) return;
      console.log(counter);
      this._notePitch = (Math.pow(r[counter], 3) / 10000) + 200;
      console.log(this._notePitch);
      this.
      //this._osc.frequency.linearRampToValueAtTime(this._notePitch, this._context.currentTime + 0.5);     
    }
//     const now = this._context.currentTime;
//     const later = now + 10;
//     let i = 0;
//     //console.log(r);
    
//     while(i < r.length) {
//       const pitch = r[i];
//       console.log(r[i]);
//       this._notePitch = pitch * 10;
//       // console.log(this._notePitch);
//       // console.log(later);
//       // console.log(pitch);
//       this._osc.frequency.linearRampToValueAtTime(this._notePitch, later);
//       i++;
//       //if(i > 100) break;
//     }
    //console.log(r);
  }
}
export default SoundModule;