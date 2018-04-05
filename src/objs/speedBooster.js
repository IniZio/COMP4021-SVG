import SVGObject from './SVGObject'
import EdibleObject from './edibleObject'

class SpeedBooster extends EdibleObject {
  constructor(opt) {
    super(...arguments);
    this.svgObj = new SVGObject(opt.svg.node, 0, 0, 20, 30);
    this.speedMultiplier = 1.5;
    this.size = 0.1;
  }

  init () {
    super.init(...arguments)
    this.gameManager.playMusicFoodAppear()
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
    if (player === null)
    {
      super.eatenBy(null);
    }
    this.gameManager.playMusicBooster()
    player.boostSpeed(this.speedMultiplier);
    this.gameManager.removeGameObjectById(this.id);
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
