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
    while(i <)
    for(let i = 0; i < r.length; i++){
      const pitch = r[i];
      this._notePitch = pitch * 10;
      this._osc.frequency.linearRampToValueAtTime(this._notePitch, later);
      console.log(this._notePitch);
    }
    //console.log(r);
  }
}
export default SoundModule;