import { useState } from 'react';
import { Signal } from 'rivarjs';


const VisualRIVar = ({ children, rivar }) => {



  const [value, setValue] = useState(0);

  rivar.subscribe((signal) => {
    console.log(signal);
    if (signal.value && value !== signal.value.toString()) {
      setValue(signal.value.toString());
    }
  });

  const change = (value) => {
   
    rivar.next(new Signal(value));
  };
  return (
    <div>
      {children({ value,change })}
    </div>
  );
};
export default VisualRIVar;