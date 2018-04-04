import SVGObject from './SVGObject'
import Edible from './edibleObject'

export class Food extends Edible {
    constructor(opt) {
        super(...arguments);
        this.svgObj = new SVGObject(opt.svg, 0, 0, 35, 30);
        this.gain = opt.gain;
    }

    /**
     * Called when the edible object is eaten by a player.
     * Apply suitable effect to the player,
     * then remove itself.
     *
     * Should be implemented by subclass.
     *
     * @param player Player object eating this EdibleObject object.
     */
    eatenBy(player) {
        palyer.grow(this.gain);
    }

    update(frameTime) {
        super.update(frameTime);
    }

    get center(){
        return this.svgObj.center;
    }

    static get TypeName() {
        return 'Food';
    }
}