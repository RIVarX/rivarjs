import { combineLatest ,share, Observable} from 'rxjs';
import {SignalExtension} from './SignalExtension.js';

class Expression extends Observable {
 
}
export function lift(func, operand1, operand2) {
	const obs1 =  SignalExtension.monotonic(operand1);
	const obs2 =  SignalExtension.monotonic(operand2);
	const combinedObs = combineLatest([obs1, obs2], (x, y) => SignalExtension.produceResult(func, x, y));

  return combinedObs.pipe(share());

/*	const refCountedObs = combinedObs.pipe(
	  publish(),
	  refCount()
	);
	 return new Expression(refCountedObs);*/

 /* const stream = Observable
    .combineLatest(
      SignalExtension.monotonic(operand1),
      SignalExtension.monotonic(operand2),
      (x, y) => SignalExtension.produceResult(func, x, y)
    )
    .publish()
    .refCount();
  return new Expression(stream);*/
};
