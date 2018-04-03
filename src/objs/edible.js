import SvgObject from 'svgObject'
import GameObject from '../primitives/game-object'

/**
 * Edible object is a
 */
 class Edible extends GameObject {
    /**
     * Constructs an edible object.
     * @param svgObj The SvgObject handling the display of this object.
     * @param x The x position of the new Edible object.
     * @param y The y position of the new Edible object.
     */
    constructor(svgObj, x, y, selfDestructTime) {
        super();
        //TODO implement
        this.svgObj = svgObj;
        this.selfDestructTime = selfDestructTime;
        this.selfDestructTimer = 0;
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
        if (player === null){
            //TODO self destruction
        }
        throw new Error("Function Edible.eatenBy is not implemented");
    }

    update(frameTime) {
        this.selfDestructTimer += frameTime;
        if (this.selfDestructTimer >= this.selfDestructTime){
            //TODO: self destruction
            eatenBy(null);
        }
    }

    get center(){
        return this.svgObj.center;
    }

    static get TypeName(){
        return 'Edible';
    }
};

 export default Edible;