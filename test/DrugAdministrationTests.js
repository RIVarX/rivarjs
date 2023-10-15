import assert from 'assert';
import { Signal } from '../src/Signal.js';
import { RIVar } from '../src/RIVar.js';
import { lift } from '../src/Lift.js';

const div = (x, y) => x / y;
const mul = (x, y) => x * y;

class Bag {
    constructor() {
      this.amount = new RIVar();
      this.volume = new RIVar();
      this.concentration = new RIVar();
  
      this.concentration.set(lift(div, this.amount, this.volume));
      this.amount.set(lift(mul, this.concentration, this.volume));
      this.volume.set(lift(div, this.amount, this.concentration));
    }
  }
  
  class Pump {
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
  


describe('DrugAdministration', function () {

  it('should calculate concentration correctly', function () {
    const bag = new Bag();
    let result = 0;

    bag.concentration.subscribe({
      next: (value) => { result = value.value }
    });

    bag.amount.next(new Signal(100));
    bag.volume.next(new Signal(200));

    assert.strictEqual(result, 0.5);
  });

  it('should calculate concentration correctly with pump', function () {
    const bag = new Bag();
    let result = 0;

    bag.concentration.subscribe({
      next: (value) => { result = value.value }
    });

    const pump = new Pump(bag);
    bag.amount.next(new Signal(100));
    bag.volume.next(new Signal(200));

    assert.strictEqual(result, 0.5);
  });

  it('should not duplicate notifications', function () {
    const bag = new Bag();
    const pump = new Pump(bag);

    let result = 0;
    let numberOfUpdates = 0;

    bag.amount.subscribe({
      next: (value) => {
        result = value.value;
        numberOfUpdates++;
      }
    });

    bag.concentration.next(new Signal(0.5));
    pump.rate.next(new Signal(10));
    pump.duration.next(new Signal(5));

    assert.strictEqual(numberOfUpdates, 1);
  });

});
