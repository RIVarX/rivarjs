# Introduction
`rivarjs` is a decentralized state management library that automates changes. It harmonizes concepts from the object-oriented programming (OOP) and functional reactive programming (FRP) paradigms. At its core, `rivarjs` introduces a datatype called `RIVar`, which stands for *Reactive Instance Variable*.<br><br> 

The term *Reactive* signifies that *assignments* initiate dependencies, ensuring continuous updates in response to changes. The term *Instance* implies that assignments can be performed externally, facilitating *information hiding*.

## How It Works

Each variable in `rivarjs` is implemented as an *observable stream* from [RxJS](http://reactivex.io/rxjs). Similarly, the assigned expressions for these variables are also implemented as observable streams. 

To create the variable stream, the streams from the assigned expressions are merged together. This merging operation combines the individual streams into a single stream representing the variable. As a result, the variable stream will update and emit new values whenever any of the assigned expression streams produce a new value.

This design choice enables independent *assignments*, initiating dependencies for continuous updates, for shared variables within multiple contexts.

## The API

The API consists of *lifting*.

### 1. Variables

`var myRIVar=new RIVar();`
### 2. Functions

`var functionOverRIVars=lift((x, y) => x * y, firstRIVar, secondRIVar);`
### 3. Assignments

`myRIVar.set(functionOverRIVars);`

It is usually readable to compose this with the previous step:<br>
`myRIVar.set(lift((x, y) => x * y, firstRIVar, secondRIVar))`

## Information Hiding

Classes can be created as a unit of information, containing *private* variables and assignments, along with *public* variables. The public visibility of variables does not compromise the ability to withstand or resist changes. The reason is that the assignments do not override previous assignments.

```
 class A { // the unit of information
    constructor() {
      this.firstRIVar = new RIVar();   
      // you may assign this.firstRIVar
    }
  }
```

### Inheritance

```
 class B {
    constructor(a) {

      this.a = a;

      this.secondRIVar = new RIVar();
      this.thirdRIVar = new RIVar();

      // this resists changes!
      this.a.firstRIVar.set(lift(mul, this.secondRIVar, this.thirdRIVar));

    }
  }
```

### Composition

```
 class B extends A {

    constructor(a) {

      this.secondRIVar = new RIVar();
      this.thirdRIVar = new RIVar();

      // this resists changes!
      this.FirstRIVar.set(lift(mul, this.secondRIVar, this.thirdRIVar));

    }
  }
```

# Binders

Each of the lifted variables need to be connected to a visual element.

## react
(A full example is available in Examples/react_rivar_drug_administration)<br><br>
In react, a front-end component should be connected to the RIVar:
```
<MyRIVarComponent rivar={myRIVar}/> 
```

The *RIVarComponent* serves as a base class for creating front-end components related to RIVar.<br>
To create your component, import RIVarComponent from 'rivarjs/binders/react':<br>
```
import { RIVarComponent } from 'rivarjs/binders/react';
```
Then, define your component class MyRIVarComponent by extending RIVarComponent:<br>
```
class MyRIVarComponent extends RIVarComponent {
  // Implement the render function which includes this.state.value
  render() {
    // Your rendering logic here
  }
}
```
Within the render function, you can customize the view based on your requirements and access the current value of the component's state using *this.state.value*.<br><br>

Additionally, when the user interacts with the elements rendered by your component, if there are changes, you can trigger the *this.change* method provided by RIVarComponent to update the relevant RIVar:<br>
```
// Example usage of this.change in response to user interaction
handleInputChange(event) {
  // Handle user input
  this.change(event.target.value);
}
```
By calling *this.change*, you can update the associated RIVar with the new value resulting from the user's interaction.<br>


### Vanilla JavaScript
Like connecting [Subject](https://rxjs.dev/guide/subject) of RxJS from which RIVar is derived.<br>
A full example is available in
https://rivarx.github.io/Evaluation/RIVar/DrugAdministration.html. (by "view source")

# Installation
To use rivarjs, you have two options. First, you can install it using npm by running the following command:<br>

```shell
npm install rivarjs
```

Alternatively, for a HTML page, if you may include rivar.umd.js script and the required dependency rxjs:<br>
```
<script src="https://unpkg.com/rxjs@^7/dist/bundles/rxjs.umd.min.js"></script>
<script src="https://unpkg.com/rivarjs/dist/rivar.umd.js"></script>
```
Once you have rivarjs available, you can import the necessary elements in your JavaScript code using the following syntax:<br>
```
var { RIVar, lift, Signal } = rivarjs;
```
By following these steps, you will be able to utilize the functionalities provided by the rivarjs library in your JavaScript project.




