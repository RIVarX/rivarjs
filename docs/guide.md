# Installation

```shell
npm install rivarjs
```

or include in a web page  rxjs and then rivarjs
```
<script src="https://unpkg.com/rxjs@^7/dist/bundles/rxjs.umd.min.js"></script>
<script src="https://unpkg.com/rivarjs/dist/rivar.umd.js"></script>
```

# The API

`
  var { RIVar, lift, Signal } = rivarjs;
`

### 1. Variables
**RIVar** is a lifted variable.
`var myRIVar=new RIVar()`
### 2. Functions
**lift**  lifts function over values to function over the lifted variables.
`var liftedOperation=lift((x, y) => x * y, firstRIVar, secondRIVar);`
### 3. Assignments
**set** is the lifted assignment operator, to associate operations to variables.
`myRIVar.set(liftedOperation)`

# Binders

The lifted variables can be connected to a visual element.

### react

**RIVarComponent** is a base class for a front-end to RIVar, to be used (subclass, not directly) in the view.
`<MyRIVarComponent rivar={myRIVar}/>`
The view is customized by implementing the render function.
1. create your component 
`import { RIVarComponent } from 'rivarjs/binders/react';`
and then
`class MyRIVarComponent extends RIVarComponent`
2. implement the render function, consists of `this.state.value`
3. call to `this.change` when the user did change by the elements you rendered

### Vanilla JavaScript
Like connecting Subject of rxjs from which RIVar is derived.



## Drug Administration Example in Vanila javascript
view the source of the page:
https://rivarx.github.io/Evaluation/RIVar/DrugAdministration.html

## Drug Administration Example in React



