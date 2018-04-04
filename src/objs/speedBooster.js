import SVGObject from './SVGObject'
import Edible from './edibleObject'

class SpeedBooster extends Edible {
  constructor(opt) {
    super(...arguments);
    this.svgObj = new SVGObject(opt.svg, 0, 0, 20, 30);
    this.speedMultiplier = 1.5;
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
    player.boostSpeed(this.speedMultiplier);
    this.svgObj.domNode.remove();
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
    return 'SpeedBooster';
  }
};

export default SpeedBooster;