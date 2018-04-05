import SVG from 'svg.js'
import SVGObject from './SVGObject'
import EdibleObject from "./edibleObject";

class Trail extends EdibleObject {
  constructor(opt) {
    super(...arguments);
    if (opt.playerNo = 1)
    // Must use SVG.get('trail1')
      this.svgObj = new SVGObject(opt.svg.node, 300, 250, 10, 10);
    else
    // Must use SVG.get('trail2')
      this.svgObj = new SVGObject(opt.svg.node, 700, 250, 10, 10);
    this.harm = opt.harm;
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
    //TODO: Eaten by player
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

  get TypeName() {
    return 'Trail';
  }
}

export default Trail;