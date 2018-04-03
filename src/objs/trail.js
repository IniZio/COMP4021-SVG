import SvgObject from 'svgObject'
import { Edible } from "./edible";

export class Trail extends Edible {
    constructor(x, y) {
        var svgObj = document.getElementById('trail');
        super(svgObj, x, y);

    }

    get TypeName() {
        return 'Trail';
    }
}