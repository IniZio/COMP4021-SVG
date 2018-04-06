import SVGObject from './SVGObject'
import EdibleObject from './edibleObject'

class SpeedBooster extends EdibleObject {
  constructor(opt) {
    super(...arguments);
    this.speedMultiplier = 1.5;
    this.size = 0.1;
  }

  init () {
    super.init(...arguments)
    this.gameManager.playMusicFoodAppear()
    this.svg.move(this.x, this.y)
    this.svg.size(100);
    this.svg.animate(this.selfDestructTime * 1000).size(0);
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

  get TypeName() {
    return 'SpeedBooster';
  }
};

export default SpeedBooster;
