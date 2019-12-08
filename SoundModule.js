import Metronome from './Metronome.js';

class SoundModule {
  constructor(context, r, g, b, a) {

    this._context = context;
    this._osc = new OscillatorNode(this._context);
    this._amp = new GainNode(this._context);
    this._osc.type = 'sine';
    
    this._biquad = new BiquadFilterNode(this._context);
    this._QValue = null;
    this._biquad.Q.value = this._QValue;
    this._biquad.type = "highpass";
    
    this._metro = new Metronome(this._context);
    this._metro.setBPM(500);
    
    this.output = new GainNode(this._context);
    this._osc.connect(this._biquad).connect(this._amp).connect(this.output);
    this._osc.start();
    this._notePitch = null;
    this._osc.frequency.value = this._notePitch;
  }
  
  play(r, g, b) {
    console.log("hello");
    this._metro.start();
    this._metro.onbeat = (start, interval, counter) => {
      if(counter > 400) {
        this._osc.stop();
        return;
      }
      //console.log(counter);
      this._notePitch = (Math.pow(r[counter], 3) / 10000) + 200;
      //console.log(this._notePitch);
      this._osc.frequency.value = this._notePitch;
      
      //this._biquad.frequency.value = 20;
      //this._biquad.frequency.exponentialRampToValueAtTime(4000, start + 2.0);
      //this._biquad.frequency.exponentialRampToValueAtTime(20, start + 4.0);
      this._QValue = b[counter] / 10;
      console.log(this._QValue);
      this._biquad.Q.value = this._QValue;
      //this._biquad.Q.linearRampToValueAtTime(9, start + 2.0);
    }
  }
}
export default SoundModule;