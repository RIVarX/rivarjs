# Installation
To use rivarjs, you have two options. First, you can install it using npm by running the following command:<br>

```shell
npm install rivarjs
```

Alternatively, if you prefer including the library in a web page, you need to ensure that the required dependencies, rxjs and rivarjs, are included. You can achieve this by adding the following script tags to your HTML file:<br>
```
<script src="https://unpkg.com/rxjs@^7/dist/bundles/rxjs.umd.min.js"></script>
<script src="https://unpkg.com/rivarjs/dist/rivar.umd.js"></script>
```
Once you have rivarjs available, you can import the necessary elements in your JavaScript code using the following syntax:<br>
```
var { RIVar, lift, Signal } = rivarjs;
```
By following these steps, you will be able to utilize the functionalities provided by the rivarjs library in your JavaScript project.

# The API

### 1. Variables
**RIVar** is a lifted variable.<br>
`var myRIVar=new RIVar();`
### 2. Functions
The **lift** function transforms a function operating on values to a function operating on lifted variables.<br>
`var liftedOperation=lift((x, y) => x * y, firstRIVar, secondRIVar);`
### 3. Assignments
**set** is the lifted assignment operator, to associate operations to variables.<br>
`myRIVar.set(liftedOperation);`

# Binders

Each of the lifted variables need to be connected to a visual element.

### react

In react, a front-end component should be connected to the RIVar:
```
<MyRIVarComponent rivar={myRIVar}/> 
```

The **RIVarComponent** serves as a base class for creating front-end components related to RIVar.<br>
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
Within the render function, you can customize the view based on your requirements and access the current value of the component's state using **this.state.value**.<br><br>

Additionally, when the user interacts with the elements rendered by your component, if there are changes, you can trigger the **this.change** method provided by RIVarComponent to update the relevant RIVar:<br>
```
// Example usage of this.change in response to user interaction
handleInputChange(event) {
  // Handle user input
  this.change(event.target.value);
}
```
By calling **this.change**, you can update the associated RIVar with the new value resulting from the user's interaction.<br>


### Vanilla JavaScript
Like connecting Subject of rxjs from which RIVar is derived.



## Drug Administration Example in Vanilla JavaScript
view the source of the page:
https://rivarx.github.io/Evaluation/RIVar/DrugAdministration.html

## Drug Administration Example in React



