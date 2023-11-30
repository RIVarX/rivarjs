# rivarjs
Reactive Instance Variable for JavaScript based on rxjs

`rivarjs` is a decentralized state management library that automates changes. It harmonizes concepts from the object-oriented programming (OOP) and functional reactive programming (FRP) paradigms. At its core, `rivarjs` introduces a datatype called `RIVar`, which stands for *Reactive Instance Variable*.<br><br> 

The term *Reactive* signifies that *assignments* initiate dependencies, ensuring continuous updates in response to changes. The term *Instance* implies the facilitation of *information hiding*, as assignments can be performed *externally*. Subclasses assign variables of their parents, while composites assign variables of the objects they contain.

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

# Integration



## React

`RIVarView` is a `React component` to render according to a `rivar`

```
import { RIVarView } from 'rivarjs/integration/react';
```

`RIVarView` takes two props: `rivar` and a `render prop` function. The `render prop` function is used to render the child component. The `render prop` function is passed an object with two properties: `value` and `change`. The `value` property is the current value of the `rivar`. The `change` function can be used to update the `rivar` variable.


```
 <VisualRIVar rivar={rivar} render={({ value, change }) => (
      <input
        type="number"
        value={value}
        onChange={(event) => change(event.target.value)}
      />
    )}>
```


## Pure JavaScript

The following code initiates a connection between an instance of `RIVar` to an `HTML` element.

```
    function bind(inputID, variable) {

      var input = document.getElementById(inputID);

      input.addEventListener('input', (event) => {
        const value = event.target.value;
        variable.next(new Signal(value));
        input.style.fontStyle = "normal";
      });

      variable.subscribe((signal) => {
        if (input.value !== signal.value.toString()) {
          input.value = signal.value.toString();
          input.style.fontStyle = "italic";
        }
      });

    }
```
# Examples

[Example React](https://github.com/RIVarX/rivarjs/tree/172eae3fb4601723c7d306af384f98bd7cb7dccf/Examples/react_rivar_drug_administration)

[Example pure JavaScript](https://github.com/RIVarX/Evaluation/raw/main/RIVar/DrugAdministration.html)


# Installation
To use `rivarjs`, you have two options. First, you can install it using `npm` by running the following command:<br>

```shell
npm install rivarjs
```

Alternatively, for an `HTML` page, you need to include the `rivarjs` script and its required dependency, `RxJS`, by adding the following script tags:<br>
```
<script src="https://unpkg.com/rxjs@^7/dist/bundles/rxjs.umd.min.js"></script>
<script src="https://unpkg.com/rivarjs/dist/rivar.umd.js"></script>
```
Once you have `rivarjs` available, you can import the necessary elements in your `JavaScript` code using the following syntax:<br>
```
var { RIVar, lift, Signal } = rivarjs;
```
By following these steps, you will be able to utilize the functionalities provided by the `rivarjs`.






