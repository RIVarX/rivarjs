import './App.css';

import React, { Component } from 'react';
import Bag from './Bag.js';
import Pump from './Pump.js';
import { InputField } from './InputField.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.bag = new Bag();
    this.pump = new Pump(this.bag);
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>Drug</td>
            <td>Concentration</td>
            <td>VolumeOfFluid</td>
          </tr>
          <tr>
            <td>
              <InputField rivar={this.bag.amount} />
            </td>
            <td>
              <InputField rivar={this.bag.concentration} />
            </td>
            <td>
              <InputField rivar={this.bag.volume} />
            </td>
          </tr>
          <tr>
            <td>Dose</td>
            <td>Duration</td>
            <td>Rate</td>
          </tr>
          <tr>
            <td>
              <InputField rivar={this.pump.dose} />
            </td>
            <td>
              <InputField rivar={this.pump.duration} />
            </td>
            <td>
              <InputField rivar={this.pump.rate} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  
}

export default App;
