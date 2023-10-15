import assert from 'assert';
import { Signal } from '../src/Signal.js';
import { RIVar } from '../src/RIVar.js';
import { lift } from '../src/Lift.js';

const plus = (x, y) => x + y;

class Coordinate {
    constructor(x, y) {
        this.x = new RIVar();
        this.y = new RIVar();

        if (x != undefined && y != undefined) {
            this.x.next(new Signal(x));
            this.y.next(new Signal(y));
        }

    }

    Move(c) {
        let newCoordinate = new Coordinate();
        newCoordinate.x.set(lift(plus, this.x, c.x))
        newCoordinate.y.set(lift(plus, this.y, c.y))
        return newCoordinate;
    }
}

describe('ReactiveObjects', function() {


  describe('Coordinates', function () {

    it('Coordinate automaticaly calculated', function () {
        const c1 = new Coordinate(1, 2);
        const c2 = new Coordinate(3, 4);
        const c3 = c1.Move(c2);

        c1.x.next(new Signal(1));
        c1.y.next(new Signal(2));
        c2.x.next(new Signal(3));
        c2.y.next(new Signal(4));

        let result = 0;

        c3.x.subscribe({
            next: (value) => { result = value.value }
        });

        c2.x.next(new Signal(42));

        assert.strictEqual(result, 43);
    });
});

});
