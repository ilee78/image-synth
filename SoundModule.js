import Metronome from './Metronome.js';

class SoundModule {
  constructor(context, r, g, b, a) {

    this._context = context;
    
    //For red pixel data
    this._osc = new OscillatorNode(this._context);
    this._amp = new GainNode(this._context);
    this._osc.type = 'sine';
    
    //For green pixel data
    this._lfo = new OscillatorNode(this._context);
    this._depth = new GainNode(this._context);
    this._lfo.frequency.value = 4;
    
    //For blue pixel data
    this._biquad = new BiquadFilterNode(this._context);
    this._QValue = null;
    this._biquad.Q.value = this._QValue;
    this._biquad.type = "highshelf";
    
    this._metro = new Metronome(this._context);
    this._metro.setBPM(400);
    
    this.output = new GainNode(this._context);
    this._osc.connect(this._biquad).connect(this._amp).connect(this.output);
    this._lfo.connect(this._depth).connect(this._amp.gain);
    this._notePitch = null;
    this._osc.frequency.value = this._notePitch;
    this._depthValue = null;
    this._depth.gain.value = this._depthValue;
    this._amp.gain.value = 1.0 - this._depth.gain.value;
    
    this._osc.start();
    this._lfo.start();
  }
  
  /*
   * Takes in the red, green, and blue pixel data arrays from script.js
   * Maps red data to frequency, green data to tremolo, blue data to resonance.
   * Outputs sound to script.js and then speakers.
   */
  play(r, g, b) {
    this._metro.start();
    this._metro.onbeat = (start, interval, counter) => {
      if(counter > 400) {
        this._osc.stop();
        this._lfo.stop();
        return;
      }
      this._notePitch = (Math.pow(r[counter], 2) / 100) + 150;
      this._osc.frequency.value = this._notePitch;

      this._depthValue = (g[counter] / 255) - 0.5;
      this._depth.gain.value = this._depthValue;
      this._amp.gain.value = 1 - this._depth.gain.value;
      
      this._QValue = b[counter] / 30;
      this._biquad.Q.value = this._QValue;

    }
  }
}
export default SoundModule;