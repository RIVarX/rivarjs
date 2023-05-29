import React, { Component } from 'react';
import { Signal } from 'rivarjs';

export class RIVarComponent extends Component {
  constructor(props) {
    super(props);
    this.rivar=props.rivar;
    this.state={};
    
    this.rivar.subscribe((signal) => {
        if (signal.value&&(this.state.value !== signal.value.toString())) {
        this.setState({
          value:signal.value.toString(),
        });
      }
    });
  }
 
  change(value) {
    this.rivar.next(new Signal(value))
  } 
}
