import assert from 'assert';
import { RIVar, lift, Signal } from '../src/index.js';

const div = (x, y) => x / y;
const mul = (x, y) => x * y;
const add = (x, y) => x + y;
const sub = (x, y) => x - y;

class Travel {
  constructor() {
    this.gallons = new RIVar();
    this.miles = new RIVar();
    this.mpg = new RIVar();
    this.gasPrice = new RIVar();
    this.totalCost = new RIVar();

    
  }
}

class Hotel {
  constructor() {
    this.nightsStayed = new RIVar();
    this.checkIn = new RIVar();
    this.checkOut = new RIVar();
    this.roomPrice = new RIVar();
    this.totalCost = new RIVar();

  
  }
}

class Meals {
  constructor() {
    this.food = new RIVar();
    this.tip = new RIVar();
    this.totalCost = new RIVar();

   
  }
}



/*
// Equation 1: miles / gallons == mpg

// Method 1: miles = mpg * gallons
this.miles.set(lift(mul, this.mpg, this.gallons));

// Method 2: mpg = miles / gallons
this.mpg.set(lift(div, this.miles, this.gallons));

// Method 3: gallons = miles / mpg
this.gallons.set(lift(div, this.miles, this.mpg));


// Equation 2: gallons * gas == travel

// Method 1: gallons = travel / gas
this.gallons.set(lift(div, this.travel, this.gas));

// Method 2: gas = travel / gallons
this.gas.set(lift(div, this.travel, this.gallons));

// Method 3: travel = gallons * gas
this.travel.set(lift(mul, this.gallons, this.gas));


// Equation 3: checkout - checkin == nights * 86400000

// Method 1: checkout = checkin + nights * 86400000
this.checkout.set(lift(add, this.checkin, lift(mul, this.nights, 86400000)));

// Method 2: checkin = checkout - nights * 86400000
this.checkin.set(lift(sub, this.checkout, lift(mul, this.nights, 86400000)));

// Method 3: nights = (checkout - checkin) / 86400000
this.nights.set(lift(div, lift(sub, this.checkout, this.checkin), 86400000));


// Equation 4: nights * rate == hotel

// Method 1: hotel = nights * rate
this.hotel.set(lift(mul, this.nights, this.rate));

// Method 2: nights = hotel / rate
this.nights.set(lift(div, this.hotel, this.rate));

// Method 3: rate = hotel / nights
this.rate.set(lift(div, this.hotel, this.nights));


// Equation 5: food * (1 + tip) == meals

// Method 1: meals = food * (1 + tip)
this.meals.set(lift(mul, this.food, lift(add, 1, this.tip)));

// Method 2: food = meals / (1 + tip)
this.food.set(lift(div, this.meals, lift(add, 1, this.tip)));

// Method 3: tip = (meals / food) - 1
this.tip.set(lift(sub, lift(div, this.meals, this.food), 1));

*/