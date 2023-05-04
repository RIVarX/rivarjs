import { Subject, share } from 'rxjs';
import { distinctUntilChanged, map, filter, startWith, withLatestFrom
} from 'rxjs/operators';
import { Signal } from './Signal.js';

export class RIVar extends Subject {
  constructor() {
    super();
    this.streamOfChangesInSources=[]; // for debugging
  }

  set(source) {
	
    const targetWithInitialValue = this.pipe(startWith(new Signal(null, [0])));
    const streamOfChanges = source.pipe(
      withLatestFrom(targetWithInitialValue),
      map(([valueInSource, valueInTarget]) => ({ valueInSource, valueInTarget })));

    const streamOfChangesInSource = streamOfChanges.pipe(
      filter(change => change.valueInSource && change.valueInSource.compareTo(change.valueInTarget) > 0),
      map(change => change.valueInSource), share());

      this.streamOfChangesInSources.push(streamOfChangesInSource); // for debugging

    streamOfChangesInSource.subscribe(x=>{
      this.next(x);
    });
  }

  next(value) {
   if(!this.prev||!(this.prev.compareTo(value) === 0)){
    this.prev=value;
    super.next(value);
   }
   else{
    this.prev=value;
   }
    
   
  }

 /* subscribe(next) {
    return super.subscribe().distinctUntilChanged((prev, curr) => prev.compareTo(curr) === 0).subscribe(next);
  }*/
  

}




