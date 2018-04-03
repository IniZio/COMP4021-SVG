import SvgObject from 'svgObject'
import Edible from 'edible'

export class SpeedBooster extends Edible {
    constructor(svgObj, x, y, speedMultiplier) {
        super(svgObj, x, y);
        this.speedMultiplier = speedMultiplier;
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
        player.boostSpeed(this.speedMultiplier);
        this.svgObj.domNode.remove();
    }

    update(frameTime) {
        super.update(frameTime);
    }

    get center() {
        return this.svgObj.center;
    }

    get TypeName() {
        return 'SpeedBooster';
    }
};