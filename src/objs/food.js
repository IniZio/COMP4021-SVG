import SVGObject from './SVGObject'
import EdibleObject from './edibleObject'

class Food extends EdibleObject {
  constructor(opt) {
    super(...arguments);
    this.svgObj = new SVGObject(opt.svg.node, 0, 0, 35, 30);
    this.gain = 10;
    this.size = 0;
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
    player.grow(this.gain);
    this.svg.remove();
  }

  update(frameTime) {
    super.update(frameTime);
  }

  get center() {
    if (this.svgObj)
      return this.svgObj.center;
    return null;
  }

  static get TypeName() {
    return 'Food';
  }
}

export default Food;
