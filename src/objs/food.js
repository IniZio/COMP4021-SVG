import SvgObject from 'svgObject'
import Edible from 'edible'

export class Food extends Edible {
    constructor(x, y) {
        super(x, y);

    }

    get TypeName() {
        return 'Food';
    }
}