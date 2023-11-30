import './App.css';
import React, { useState } from 'react';
import MyTimer from './MyTimer';
import RIVarView from './RIVarView';


function App() {

  const [timer] = useState(new MyTimer());

  return (
    <div className="App">

      seconds:
      <RIVarView rivar={timer.seconds}>
        {({ value, change }) => {
          return <input
            type="number"
            value={value}
            onChange={(event) => change(event.target.value)}
          />;
        }}

      </RIVarView>
      minutes:
      <RIVarView rivar={timer.minutes}>
        {({ value, change }) => {
          return <input
            type="number"
            value={value}
            onChange={(event) => change(event.target.value)}
          />;
        }}

      </RIVarView>
    </div>
  );
}

export default App;
