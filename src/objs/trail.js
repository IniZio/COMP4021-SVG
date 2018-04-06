import SVG from 'svg.js'
import SVGObject from './SVGObject'
import EdibleObject from "./edibleObject";

class Trail extends EdibleObject {
  constructor(opt) {
    super(...arguments);
    this.harm = opt.harm;
    this.owner = opt.owner
    this.size = 0.1;
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
    if (player === null){
      super.eatenBy(null);
    }
    if (this.owner == player) return
    player.grow(this.harm);
    this.gameManager.removeGameObjectById(this.id);
  }

  update(frameTime) {
    super.update(frameTime);
  }

  get TypeName() {
    return 'Trail';
  }
}

export default Trail;
