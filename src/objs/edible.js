import SvgObject from 'svgObject'


/**
 * Edible object is a
 */
export class Edible {
    /**
     * Constructs an edible object.
     * @param svgObj The SvgObject handling the display of this object.
     * @param x The x position of the new Edible object.
     * @param y The y position of the new Edible object.
     */
    constructor(svgObj, x, y) {
        //TODO implement
        this.svgObj = svgObj;
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
        throw new Error("Function Edible.eatenBy is not implemented");
    }
};