(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('rivarjs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'rxjs', 'rxjs/operators', 'rivarjs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.rivarjs = {}, global.rxjs, global.rxjs.operators, global.rivarjs));
})(this, (function (exports, rxjs, operators, rivarjs) { 'use strict';

  class Signal {

    static _priorityIterator=0;

    constructor(value, prioritySet) {
      this.value = value;
      this.prioritySet = prioritySet || [++Signal._priorityIterator];
    //  console.log("new Signal " + this.prioritySet);
    }

    compareTo(other) {
      if (this.IsPrioritized(other, this))
          return -1;
      if (this.IsPrioritized(this, other))
          return 1;
      return 0;
  }

  IsPrioritized(signal, thanSignal) {
    const signalSet = signal?.prioritySet || [0];
    const otherSignalSet = thanSignal?.prioritySet || [0];

    const SignalOnlySet = signalSet.filter(newSignal => !otherSignalSet.includes(newSignal));
    const otherSignalOnlySet = otherSignalSet.filter(oldSignal => !signalSet.includes(oldSignal));


    if (otherSignalOnlySet.length > 0 && SignalOnlySet.length > 0 && SignalOnlySet.every(newSignal => otherSignalOnlySet.every(oldSignal => newSignal > oldSignal))) {
      // fresh data
      return true;
    }
    
    if (signal != null && signalSet.length > 0 && SignalOnlySet.length === 0 && otherSignalOnlySet.length > 0) {
      // depends on less amount of events
      return true;
    }

    return false;
  }


    equals(other) {
      if (this.value !== other.value) {
        return false;
      }
      if (this.prioritySet.length !== other.prioritySet.length) {
        return false;
      }
      for (let i = 0; i < this.prioritySet.length; i++) {
        if (this.prioritySet[i] !== other.prioritySet[i]) {
          return false;
        }
      }
      return true;
    }
  }

  class RIVar extends rxjs.Subject {
    constructor() {
      super();
      this.streamOfChangesInSources=[]; // for debugging
    }

    set(source) {
  	
      const targetWithInitialValue = this.pipe(operators.startWith(new Signal(null, [0])));
      const streamOfChanges = source.pipe(
        operators.withLatestFrom(targetWithInitialValue),
        operators.map(([valueInSource, valueInTarget]) => ({ valueInSource, valueInTarget })));

      const streamOfChangesInSource = streamOfChanges.pipe(
        operators.filter(change => change.valueInSource && change.valueInSource.compareTo(change.valueInTarget) > 0),
        operators.map(change => change.valueInSource), rxjs.share());

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
     else {
      this.prev=value;
     }
      
     
    }  

  }

  const SignalExtension = {
    produceResult: function (resultSelector, x, y) {
  	  
      if (x && y) {
        if (x.value !== undefined && x.value !== null && y.value !== undefined && y.value !== null) {
          return new rivarjs.Signal(resultSelector(x.value, y.value), [...new Set([...x.prioritySet, ...y.prioritySet])]);
        }
        return new rivarjs.Signal(undefined, [...new Set([...x.prioritySet, ...y.prioritySet])]);
      }
      if (x) {
        return new rivarjs.Signal(undefined, [...new Set([...x.prioritySet, 0])]);
      }
      if (y) {
        return new rivarjs.Signal(undefined, [...new Set([...y.prioritySet, 0])]);
      }
      return undefined;
    },

    monotonic: function (source) {
  	 return source.pipe(
  	  rxjs.scan((previous, current) => current.compareTo(previous) > 0 ? current : null),rxjs.filter(x=>x!=null)
  	 );
    },

    selectLatest: function (source, ...moreSources) {
      const allSources = [...moreSources, source];
      return SignalExtension.selectLatest(allSources);
    },

    selectLatest: function (sources) {
      return rxjs.Observable.combineLatest(
          ...sources.map(o => o.startWith(new rivarjs.Signal(undefined, [])))
        )
        .map(valuesFromAllSources => Math.max(...valuesFromAllSources.filter(o => o !== undefined)))
        .distinctUntilChanged((prev, curr) => prev.compareTo(curr) === 0)
        .publish()
        .refCount();
    }
  };


  function lift(func, operand1, operand2) {
  	
    if(operand2!=undefined)
    {
      const firstStream = SignalExtension.monotonic(operand1);
      const secondStream = SignalExtension.monotonic(operand2);
      
      const combinedStream = rxjs.combineLatest([firstStream, secondStream],
                                              (x, y) => SignalExtension.produceResult(func, x, y));
    
      return combinedStream.pipe(rxjs.share());
    }
    else
    {
      return SignalExtension.monotonic(operand1)
      .map(x=>new rivarjs.Signal( func(x.value),x.prioritySet))
      .pipe(rxjs.share());
    }



  }

  exports.RIVar = RIVar;
  exports.Signal = Signal;
  exports.lift = lift;

}));
