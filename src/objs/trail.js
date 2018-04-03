import SvgObject from 'svgObject'
import { Edible } from "./edible";

export class Trail extends Edible {
    constructor(svgObj, x, y) {
        super(svgObj, x, y);

    }/**
     * Called when the edible object is eaten by a player.
     * Apply suitable effect to the player,
     * then remove itself.
     *
     * Should be implemented by subclass.
     *
     * @param player Player object eating this Edible object.
     */
    eatenBy(player) {
        //TODO: Eaten by player
    }

    update() {
    }

    get center(){
        return this.svgObj.center;
    }

    get TypeName() {
        return 'Trail';
    }
}