
export class Signal {

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
    // rule A
    return true;
  }
  
  if (signal != null && signalSet.length > 0 && SignalOnlySet.length === 0 && otherSignalOnlySet.length > 0) {
    // rule B
    return true;
  }

  return false;
}

/*

  compareTo(otherSignal) {
    const signalSet = this.prioritySet;
    const otherSignalSet = otherSignal.prioritySet;

    const SignalOnlySet = signalSet.filter((p) => !otherSignalSet.includes(p));
    const otherSignalOnlySet = otherSignalSet.filter((p) => !signalSet.includes(p));

    if (
      otherSignalOnlySet.length > 0 &&
      SignalOnlySet.length > 0 &&
      SignalOnlySet.every((newSignal) =>
        otherSignalOnlySet.every((oldSignal) => newSignal > oldSignal)
      )
    ) {
      //rule A
      return -1;
    }
    if (
      this.value !== null &&
      signalSet.length > 0 &&
      !SignalOnlySet.length &&
      otherSignalOnlySet.length > 0
    ) {
      //rule B (extra, comes from cycle)
      //super set {1} compare to {1,2,3}, there is no new
      //{1} > {1,2,3}
      //but null < {1,0}
      return -1;
    }

    return 0;
  }
*/
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



export default Signal;
