import SvgObject from 'svgObject'
import Edible from 'edible'

export class Food extends Edible {
    constructor(svgObj, x, y, gain) {
        super(svgObj, x, y);
        this.gain = gain;
    }

    /**
     * Called when the edible object is eaten by a player.
     * Apply suitable effect to the player,
     * then remove itself.
     *
     * Should be implemented by subclass.
     *
     * @param player Player object eating this Edible object.
     */
    eatenBy(player) {
        palyer.grow(this.gain);
    }

    update() {

    }

    get TypeName() {
        return 'Food';
    }
}