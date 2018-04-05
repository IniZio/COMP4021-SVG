import SVGObject from './SVGObject';
import GameObject from "../primitives/game-object";
import EdibleObject from "./edibleObject";
import Trail from "./trail";

class Player extends EdibleObject {
  constructor(opt) {
    super(...arguments);
    this.svgObj = new SVGObject(opt.svg.node, 200, 250, 100, 100);
    this.svgObj.x = opt.x;
    this.svgObj.y = opt.y;
    this.x = opt.x;
    this.y = opt.y;
    this.svg.move(opt.x, opt.y);
    this.speedMultiplier = 1;
    this.size = 1;
    this.putDownTrailTimer = 0;

    this.moveW = false;
    this.moveS = false;
    this.moveA = false;
    this.moveD = false;

    if (!opt.playerNo || opt.playerNo == 1) {
      // Player 1
      this.shortcuts = {
        'w': t => this.moveW = t,
        'a': t => this.moveA = t,
        's': t => this.moveS = t,
        'd': t => this.moveD = t
      }
    }
    else {
      // Player 2
      this.shortcuts = {
        'up': t => this.moveW = t,
        'left': t => this.moveA = t,
        'down': t => this.moveS = t,
        'right': t => this.moveD = t
      }
    }

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
      super.eatenBy(null);
    }
    //TODO Game over
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
    if (edible.size && this.size > edible.size) {
      // TODO: Do eat
      edible.eatenBy(this);
    }
  }

  boostSpeed(speedMultiplier) {
    this.speedMultiplier *= speedMultiplier;
    setTimeout(function () {
      this.speedMultiplier /= speedMultiplier;
    }, 1000);
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
    this.svgObj.transform('' + 0 + 's', '' + 0.025 + 's');
  }

  putTrail() {
    if (!this.playerNo || this.playerNo === 1) {
      // Player 1
      setTimeout(this.gameManager.addGameObject(
          new Trail({
            svg: SVG.get("trail1").clone(),
            harm: 1,
            x: this.x + 50 * this.size,
            y: this.y + 50 * this.size,
            selfDestructTime: 5
          })), 1000);
      this.size -= 0.01;
      this.svg.size(100 * this.size);
    }
    else {
      // Player 2
      setTimeout(this.gameManager.addGameObject(
          new Trail({
            svg: SVG.get("trail2").clone().move(this.x, this.y),
            harm: 1,
            x: this.x + 50 * this.size,
            y: this.y + 50 * this.size,
            selfDestructTime: 5
          })), 1000);
      this.size -= 0.01;
      this.svg.size(100 * this.size);

    }
  }

  update(frameTime) {
    if (this.gameManager.scene !== 'gameover') {
      if (this.size <= 0)
        if (!this.playerNo || this.playerNo === 1) {
          this.emit('player1.die')
        }
        else {
          this.emit('player2.die')
        }

      this.putDownTrailTimer += frameTime;
      if (this.putDownTrailTimer >= this.putDownTrailTime) {
        this.putDownTrailTimer = 0;
        //TODO put down trail
        if (!this.playerNo || this.playerNo === 1) {
          this.emit('player1.putTrail')
        }
        else {
          this.emit('player2.putTrail')
        }
      }
      this.move(frameTime);
      this.gameManager.collisions[this.id].map(obj => this.tryEat(obj));
    }
    super.update();
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
