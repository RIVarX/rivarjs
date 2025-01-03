import { Signal } from './Signal.js';
import { combineLatest, share, scan, distinctUntilChanged, map } from 'rxjs';

function produceResult(resultSelector, x, y) {

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
}
function monotonic(source) {
  return source.pipe(
    scan((previous, current) => current.compareTo(previous) > 0 ? current : previous), distinctUntilChanged()
  );
}

export function lift(func, operand1, operand2) {

  if (operand2 != undefined) {
    const firstStream = monotonic(operand1);
    const secondStream = monotonic(operand2);

    const combinedStream = combineLatest([firstStream, secondStream],
      (x, y) => produceResult(func, x, y));

    return combinedStream.pipe(share());
  }
  else {
    return monotonic(operand1)
      .pipe(map(x => new Signal(func(x.value), x.prioritySet)))
      .pipe(share());
  }


};
