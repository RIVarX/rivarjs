import { RIVar,lift, Signal } from 'rivarjs';

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

  const bag = new Bag();
  const pump = new Pump(bag);

  function bind(inputID,variable){

    var input = document.getElementById(inputID);
    
    input.addEventListener('input', (event) => {
      const value = event.target.value;
      variable.next (new Signal(value));
    });
  
    variable.subscribe((value) => {
    if(input.value!=value.value)
      input.value=value.value;
    console.log(inputID+' value:', value.value)});
  
  }


  bind("drug",bag.amount)
  bind("concentration",bag.concentration)
  bind("volume",bag.volume)
  bind("dose",pump.dose)
  bind("duration",pump.duration)
  bind("rate",pump.rate)





/*

const drugSubject = new RIVar();
const concentrationSubject = new Subject();
const volumeSubject = new Subject();
const doseSubject = new Subject();
const durationSubject = new Subject();
const rateSubject = new Subject();

const drugInput = document.getElementById('drug');
const concentrationInput = document.getElementById('concentration');
const volumeInput = document.getElementById('volume');
const doseInput = document.getElementById('dose');
const durationInput = document.getElementById('duration');
const rateInput = document.getElementById('rate');

drugInput.addEventListener('input', (event) => {
  const value = event.target.value;
  drugSubject.next(value);
});

concentrationInput.addEventListener('input', (event) => {
  const value = event.target.value;
  concentrationSubject.next(value);
});

volumeInput.addEventListener('input', (event) => {
  const value = event.target.value;
  volumeSubject.next(value);
});

doseInput.addEventListener('input', (event) => {
  const value = event.target.value;
  doseSubject.next(value);
});

durationInput.addEventListener('input', (event) => {
  const value = event.target.value;
  durationSubject.next(value);
});

rateInput.addEventListener('input', (event) => {
  const value = event.target.value;
  rateSubject.next(value);
});

drugSubject.subscribe((value) => console.log('Drug value:', value));
concentrationSubject.subscribe((value) => console.log('Concentration value:', value));
volumeSubject.subscribe((value) => console.log('Volume value:', value));
doseSubject.subscribe((value) => console.log('Dose value:', value));
durationSubject.subscribe((value) => console.log('Duration value:', value));
rateSubject.subscribe((value) => console.log('Rate value:', value));
*/