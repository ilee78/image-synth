
/**
 * Copyright (C) 2019 The Center for Computer Research in Music and Acoustics
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 **/

/**
 * The class `TSDataPlayer` can be used to drive the trigger function. With
 * given dataset and an AudioContext, the player instance can generate a value
 * stream that runs on a specified tempo (i.e. beat per minute).
 * 
 * @class
 */
export default class TSDataPlayer {
  /**
   * @constructor
   * @param {!AudioContext} context 
   * @param {?Array<Number>} dataset 
   */
  constructor(context, dataset) {
    this._context = context;
    this._state = 'stopped';
    this._timerId = null;
    this._boundCallback = this._callback.bind(this)
    this.onbeat = null;
    
    this._dataset = dataset || [];
    this._dataIndex = 0;
    
    this.setBPM(240);
    this._prevTimestamp = performance.now();
  }
  
  /**
   * @private
   */
  _callback() {    
    const pNow = performance.now();
    const untilNextScan = (this._prevTimestamp + 2 * this._interval) - pNow;
    this._prevTimestamp = pNow;
    
    const now = this._context.currentTime;
    if (this._nextBeat - now < this._scanRange) {
      if (this.onbeat)
        this.onbeat(this._dataset[this._dataIndex] || null,
                    this._nextBeat, this._interval);
      this._nextBeat += this._interval;
      if (this._dataIndex < this._dataset.length)
        this._dataIndex++;
    } 
    
    this._timerId = setTimeout(this._boundCallback, untilNextScan * 1000);
  }
  
  /**
   * Sets the tempo of the data player.
   * 
   * @public
   * @param {!Number} bpm A tempo in beat-per-minute.
   */
  setBPM(bpm) {
    this._bpm = bpm;
    this._interval = 60 / this._bpm;
    this._scanRange = this._interval;
    this._nextBeat = this._context.currentTime + this._interval;
  }
  
  /**
   * Starts the data player.
   * 
   * @public
   */
  start() {
    if (this._state === 'stopped') {
      this._state = 'running';
      this._callback();
    }
  }

  /**
   * Stops the data player.
   *
   * @public
   */
  stop() {
    if (this._state === 'running') {
      clearTimeout(this._timerId);
      this._state = 'stopped';
    }
  }
}