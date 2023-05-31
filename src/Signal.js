
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



export default Signal;
