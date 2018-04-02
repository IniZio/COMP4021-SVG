import SvgObject from 'svgObject'
import {Edible} from "./edible";

export class trail extends Edible {
    constructor(x, y) {
        var svgObj = document.getElementById('trail');
        super(svgObj, x, y);

    }
}