import './App.css';

import React, { Component } from 'react';
import Bag from './Bag.js';
import Pump from './Pump.js';
import RIVarView from './RIVarView.js'

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
              <RIVarView rivar={this.bag.amount}>
                {({ value, change }) => {
                  return <input
                    type="number"
                    value={value}
                    onChange={(event) => change(event.target.value)}
                  />;


                }}

              </RIVarView>
            </td>
            <td>
              <RIVarView rivar={this.bag.concentration}>
                {({ value, change }) => {
                  return <input
                    type="number"
                    value={value}
                    onChange={(event) => change(event.target.value)}
                  />;


                }}

              </RIVarView>
            </td>
            <td>
              <RIVarView rivar={this.bag.volume}>
                {({ value, change }) => {
                  return <input
                    type="number"
                    value={value}
                    onChange={(event) => change(event.target.value)}
                  />;


                }}

              </RIVarView>
            </td>
          </tr>
          <tr>
            <td>Dose</td>
            <td>Duration</td>
            <td>Rate</td>
          </tr>
          <tr>
            <td>
              <RIVarView rivar={this.pump.dose}>
                {({ value, change }) => {
                  return <input
                    type="number"
                    value={value}
                    onChange={(event) => change(event.target.value)}
                  />;


                }}

              </RIVarView>
            </td>
            <td>
              <RIVarView rivar={this.pump.duration}>
                {({ value, change }) => {
                  return <input
                    type="number"
                    value={value}
                    onChange={(event) => change(event.target.value)}
                  />;


                }}

              </RIVarView>
            </td>
            <td>
              <RIVarView rivar={this.pump.rate}>
                {({ value, change }) => {
                  return <input
                    type="number"
                    value={value}
                    onChange={(event) => change(event.target.value)}
                  />;


                }}

              </RIVarView>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

}






export default App;
