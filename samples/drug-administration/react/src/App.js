import logo from './logo.svg';
import './App.css';
import Bag from './Bag.js';
import Pump from './Pump.js';
import BagComponent from './BagComponent';
import PumpComponent from './PumpComponent';

function App() {

  const bag = new Bag();
  const pump = new Pump(bag);
  return (
   <table>
    <tbody>
      <BagComponent bag={bag}/>
      <PumpComponent pump={pump}/>
    </tbody>
   </table>
  );
}

export default App;
