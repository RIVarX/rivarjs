import { combineLatest ,share, Observable} from 'rxjs';
import {SignalExtension} from './SignalExtension.js';

class Expression extends Observable {
 
}
export function lift(func, operand1, operand2) {
	
  const firstStream = SignalExtension.monotonic(operand1);
	const secondStream = SignalExtension.monotonic(operand2);
	
  const combinedStream = combineLatest([firstStream, secondStream],
                                          (x, y) => SignalExtension.produceResult(func, x, y));

  return combinedStream.pipe(share());

};
