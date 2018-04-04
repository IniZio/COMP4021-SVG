import SVGObject from './SVGObject';
import GameObject from "../primitives/game-object";

class Player extends GameObject {
  constructor(opt) {
    super(...arguments);
    this.svgObj = new SVGObject(opt.svg.node, 200, 250, 100, 100);
    this.svgObj.x = opt.x;
    this.svgObj.y = opt.y;
    this.svg.move(opt.x, opt.y);
    this.speedMultiplier = 1;
    this.size = 1;
    this.putDownTrailTime = opt.putDownTrailTime;
    this.putDownTrailTimer = 0;
    if (!opt.playerNo || opt.playerNo == 1) {
      // Player 1
    }
    else {
      // Player 2
    }
    this.moveW = false;
    this.moveS = false;
    this.moveA = false;
    this.moveD = false;
  }


  get score() {
    //TODO Adjust player score display here
    return Math.floor(this.size * 100);
  }

  /**
   * Speed Getter
   *
   * @returns Calculated speed of the player, 1 is normal speed, larger means faster.
   */
  get speed() {
    //TODO Adjust player speed here!
    return this.speedMultiplier / this.size;
  }

  move(frameTime) {
    if (this.moveW) {
      this.y -= 5 * this.speedMultiplier;
    }
    if (this.moveS) {
      this.y += 5 * this.speedMultiplier;
    }
    if (this.moveA) {
      this.x -= 5 * this.speedMultiplier;
    }
    if (this.moveD) {
      this.x += 5 * this.speedMultiplier;
    }
    this.svg.animate(frameTime).move(this.x, this.y);
  }

  clearMove() {
    this.moveW = false;
    this.moveS = false;
    this.moveA = false;
    this.moveD = false;
  }

  /**
   * Test if the player can eat the edible object.
   * If yes, the player will trigger eat function of the edible.
   *
   * @param edible EdibleObject object to be tested.
   */
  tryEat(edible) {
    //TODO Adjust eating trigger distance here
    a = edible.center.x - this.center.x;
    b = edible.center.y - this.center.y;

    distance = Math.sqrt(a * a + b * b);
    if (distance <= this.svgObj.sizeX / 2) {
      edible.eatenBy(player);
    }
  }

  boostSpeed(speedMultiplier) {
    this.speedMultiplier *= speedMultiplier;
    setTimeout(function () {
      this.speedMultiplier /= speedMultiplier;
    }, 5000);
  }

  /**
   * Give size growth to player
   *
   * @param amount Amount of size a player gain. 100 is the player's initial size.
   */
  grow(amount) {
    this.size += amount / 100;
    this.svgObj.sizeX = this.svgObj.svgSizeX * this.size;
    this.svgObj.sizeY = this.svgObj.svgSizeX * this.size;
    this.svgObj.transform(''+0+'s', ''+0.025 + 's');
  }

  putTrail() {

  }

  update(frameTime) {
    this.putDownTrailTimer += frameTime;
    if (this.putDownTrailTimer >= this.putDownTrailTime) {
      this.putDownTrailTimer = 0;
      //TODO put down trail
    }
    this.move(frameTime);
  }

  /**
   * Get coordinate of center point of the GameObject
   *
   * @returns {{x: *, y: *}} The position of the GameObject's center point.
   */
  get center() {
    if (this.svgObj)
      return this.svgObj.center;
    return null;
  }

  static get TypeName() {
    return 'Player';
  }
};

export default Player;