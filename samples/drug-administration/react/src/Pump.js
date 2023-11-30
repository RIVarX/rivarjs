import { RIVar, lift } from 'rivarjs';
const div = (x, y) => (x / y).toFixed(2);
const mul = (x, y) => x * y;

  export default class Pump {
    constructor(bag) {
      this.rate = new RIVar();
      this.dose = new RIVar();
      this.duration = new RIVar();
      this.theBag = bag;
  
      this.dose.set(lift(div, this.theBag.amount, this.duration));
      this.rate.set(lift(div, this.theBag.volume, this.duration));
  
      this.duration.set(lift(div, this.theBag.amount, this.dose));
      this.duration.set(lift(div, this.theBag.volume, this.rate));
  
      this.theBag.amount.set(lift(mul, this.duration, this.dose));
      this.theBag.volume.set(lift(mul, this.duration, this.rate));
    }
  }
