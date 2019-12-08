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
    const later = now + 0.1;
    let i = 0;
    
    while(i < r.length) {
      const pitch = r[i];
      console.log(r);
      this._notePitch = pitch * 10;
      // console.log(this._notePitch);
      // console.log(later);
      // console.log(pitch);
      this._osc.frequency.linearRampToValueAtTime(this._notePitch, later);
      i++;
    }
    //console.log(r);
  }
}
export default SoundModule;