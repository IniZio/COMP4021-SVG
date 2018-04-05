import SVGObject from './SVGObject'
import GameObject from '../primitives/game-object'

/**
 * EdibleObject object is a
 */
class EdibleObject extends GameObject {
  /**
   * Constructs an edible object.
   * @param svgObj The SVGObject handling the display of this object.
   * @param x The x position of the new EdibleObject object.
   * @param y The y position of the new EdibleObject object.
   */
  constructor(opt) {
    super(...arguments);
    //TODO implement
    if (opt.selfDestructTime)
      this.selfDestructTime = opt.selfDestructTime;
    else this.selfDestructTime = 0xFFFFFFFFFFFFFFFF;
    this.selfDestructTimer = 0;
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
    if (player === null) {
      //TODO self destruction
      this.svg.remove();
    }
    throw new Error("Function EdibleObject.eatenBy is not implemented");
  }

  update(frameTime) {
    this.selfDestructTimer += frameTime;
    if (this.selfDestructTimer >= this.selfDestructTime) {
      eatenBy(null);
    }
  }

  get center() {
    if (this.svgObj)
      return this.svgObj.center;
    return null;
  }

  static get TypeName() {
    return 'EdibleObject';
  }
};

export default EdibleObject;