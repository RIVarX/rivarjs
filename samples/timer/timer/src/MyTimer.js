import { RIVar, lift } from 'rivarjs';

export default class Timer {
  constructor() {
    this.seconds = new RIVar();
    this.minutes = new RIVar();

    this.seconds.set(lift(m=>m/60, this.minutes));
    this.minutes.set(lift(s=>s*60, this.seconds));
  }
}