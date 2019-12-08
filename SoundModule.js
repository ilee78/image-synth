import Metronome from 
class SoundModule {
  constructor(context, r, g, b, a) {

    this._context = context;
    this._osc = new OscillatorNode(this._context);
    this._amp = new GainNode(this._context);
    this._osc.type = 'sine';
    
    this.output = new GainNode(this._context);
    this._osc.connect(this._amp).connect(this.output);
    this._osc.start();
    this._notePitch = null;
    this._osc.frequency.value = this._notePitch;
  }
  
  play(r) {
    const now = this._context.currentTime;
    const later = now + 10;
    let i = 0;
    //console.log(r);
    
    while(i < r.length) {
      const pitch = r[i];
      console.log(r[i]);
      this._notePitch = pitch * 10;
      // console.log(this._notePitch);
      // console.log(later);
      // console.log(pitch);
      this._osc.frequency.linearRampToValueAtTime(this._notePitch, later);
      i++;
      //if(i > 100) break;
    }
    //console.log(r);
  }
}
export default SoundModule;