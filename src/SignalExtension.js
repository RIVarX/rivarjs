import { Observable, scan, distinctUntilChanged , filter } from 'rxjs';
import { Signal } from './Signal.js';

export const SignalExtension = {
  produceResult: function (resultSelector, x, y) {
	  
    if (x && y) {
      if (x.value !== undefined && x.value !== null && y.value !== undefined && y.value !== null) {
        return new Signal(resultSelector(x.value, y.value), [...new Set([...x.prioritySet, ...y.prioritySet])]);
      }
      return new Signal(undefined, [...new Set([...x.prioritySet, ...y.prioritySet])]);
    }
    if (x) {
      return new Signal(undefined, [...new Set([...x.prioritySet, 0])]);
    }
    if (y) {
      return new Signal(undefined, [...new Set([...y.prioritySet, 0])]);
    }
    return undefined;
  },

  monotonic: function (source) {
	 return source.pipe(
	  scan((previous, current) => current.compareTo(previous) > 0 ? current : null),filter(x=>x!=null)
	 );
  },

  selectLatest: function (source, ...moreSources) {
    const allSources = [...moreSources, source];
    return SignalExtension.selectLatest(allSources);
  },

  selectLatest: function (sources) {
    return Observable.combineLatest(
        ...sources.map(o => o.startWith(new Signal(undefined, [])))
      )
      .map(valuesFromAllSources => Math.max(...valuesFromAllSources.filter(o => o !== undefined)))
      .distinctUntilChanged((prev, curr) => prev.compareTo(curr) === 0)
      .publish()
      .refCount();
  }
};
