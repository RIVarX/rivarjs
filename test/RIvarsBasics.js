import assert from 'assert';
import { Signal } from '../src/Signal.js';
import { RIVar } from '../src/RIVar.js';
import { lift } from '../src/Expression.js';
import { Observable } from 'rxjs';
import {  combineLatest} from 'rxjs/operators';

describe('RIVar', function() {
  describe('SimpleUsage', function() {
    it('should return 5', function() {
      // Construction
      let result = 0;
      const X = new RIVar();
      const Y = new RIVar();
      const Z = new RIVar();
      const plus = (x, y) => x + y;
	  
      Z.set(lift(plus, X, Y));
      Z.subscribe(i => { result = i.value; });

      // Action
      X.next(new Signal(2));
      Y.next(new Signal(3));

      // Test
      assert.strictEqual(result, 5);
    });
  });

  describe('DiamondGlitchFreedom', function() {
    it('should return 6 and numberOfUpdates should be 2', function() {
      // Construction
      let result = 0;
      let numberOfUpdates = 0;
      const X = new RIVar();
      const Y1 = new RIVar();
      const Y2 = new RIVar();
      const Z = new RIVar();
      Y1.set(X);
      Y2.set(X);
      const plus = (x, y) => x + y;
      Z.set(lift(plus, Y1, Y2));
      Z.subscribe(i => { result = i.value; numberOfUpdates++; });

      // Action
      X.next(new Signal(2));
      X.next(new Signal(3));

      // Test
      assert.strictEqual(result, 6);
      assert.strictEqual(numberOfUpdates, 2);
    });
  });


});
