import { RIVar, lift } from 'rivarjs';
const div = (x, y) => (x / y).toFixed(2);
const mul = (x, y) => x * y;

export default class Bag {
  constructor() {
    this.amount = new RIVar();
    this.volume = new RIVar();
    this.concentration = new RIVar();

    this.concentration.set(lift(div, this.amount, this.volume));
    this.amount.set(lift(mul, this.concentration, this.volume));
    this.volume.set(lift(div, this.amount, this.concentration));
  }
}