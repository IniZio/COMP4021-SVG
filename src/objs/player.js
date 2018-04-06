import SVGObject from './SVGObject';
import GameObject from "../primitives/game-object";
import EdibleObject from "./edibleObject";
import Trail from "./trail";

class Player extends EdibleObject {
  constructor(opt) {
    super(...arguments);
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
    if (!this.playerNo || this.playerNo === 1) {
      this.emit('player1.die')
    }
    else {
      this.emit('player2.die')
    }
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
      this.y -= 5 * this.speedMultiplier / this.size;
    }
    if (this.moveS) {
      this.y += 5 * this.speedMultiplier / this.size;
    }
    if (this.moveA) {
      this.x -= 5 * this.speedMultiplier / this.size;
    }
    if (this.moveD) {
      this.x += 5 * this.speedMultiplier / this.size;
    }

    if (this.x > 1000 - this.size * 100) {
      this.x = 1000 - this.size * 100;
      this.gameManager.playMusicBangWall()
    }
    if (this.y > 500 - this.size * 100) {
      this.y = 500 - this.size * 100;
      this.gameManager.playMusicBangWall()
    }
    if (this.x < 0) {
      this.x = 0;
      this.gameManager.playMusicBangWall()
    }
    if (this.y < 0) {
      this.y = 0;
      this.gameManager.playMusicBangWall()
    }
    this.svg.animate(frameTime, '<>', frameTime / 2).move(this.x, this.y);
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
      if (edible.TypeName === 'Player') {
        let cx = this.x + this.size * 50;
        let cy = this.y + this.size * 50;

        let ccx = edible.x + edible.size * 50;
        let ccy = edible.y + edible.size * 50;

        let minDis = (this.size - edible.size) * 50;
        let dis = Math.sqrt(Math.pow(ccx - cx, 2) + Math.pow(ccy - cy, 2));
        if (dis <= minDis) {
          edible.eatenBy(this);
        }
      }
      else {
        edible.eatenBy(this);
      }
    }
  }

  boostSpeed(speedMultiplier) {
    this.speedMultiplier *= speedMultiplier;
    if (!this.playerNo || this.playerNo === 1) {
      setTimeout(() => {
        if (this.gameManager.player1) this.gameManager.player1.speedMultiplier /= speedMultiplier;
      }, 5000);
    }
    else {
      setTimeout(() => {
        if (this.gameManager.player2) this.gameManager.player2.speedMultiplier /= speedMultiplier;
      }, 5000);
    }
  }

  /**
   * Give size growth to player
   *
   * @param amount Amount of size a player gain. 100 is the player's initial size.
   */
  grow(amount) {
    this.size += amount / 100;
    this.svg.size(100 * this.size);
  }

  putTrail() {
    if (!this.playerNo || this.playerNo === 1) {
      // Player 1
      var xxx = this.x + 50 * this.size;
      var yyy = this.y + 50 * this.size;
      setTimeout(() => {
        GameManager.addGameObject(
            new Trail({
              svg: SVG.get("trail1").clone().move(xxx, yyy),
              harm: -2 * this.size,
              x: xxx,
              y: yyy,
              selfDestructTime: 8,
              owner: this
            }));
      }, 500);
      this.size -= 0.01;
      this.svg.size(100 * this.size);
    }
    else {
      // Player 2
      var xxx = this.x + 50 * this.size;
      var yyy = this.y + 50 * this.size;
      setTimeout(() => {
        GameManager.addGameObject(
            new Trail({
              svg: SVG.get("trail2").clone().move(xxx, yyy),
              harm: -2,
              x: xxx,
              y: yyy,
              selfDestructTime: 8,
              owner: this
            }));
      }, 500);
      this.size -= 0.01;
      this.svg.size(100 * this.size);
    }
  }

  update(frameTime) {
    try {
      if (this.size <= 0)
      if (!this.playerNo || this.playerNo === 1) {
        this.emit('player1.die')
      }
      else {
        this.emit('player2.die')
      }

      this.svg.front();

      if (!this.playerNo) {
        this.svg.front();
      }
      else if (this.playerNo === 1) {
        if (this.gameManager.player2.size < this.size) {
          this.svg.front();
        }
        else this.gameManager.player2.svg.front()
      }
      else if (this.playerNo === 2) {
        if (this.gameManager.player1.size < this.size) {
          this.svg.front();
        }
        else this.gameManager.player1.svg.front()
      }

      this.putDownTrailTimer += frameTime;
      if (this.gameManager.scene !== 'gameover')
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
    } catch (e) {}
    super.update(...arguments);

  }

  get TypeName() {
    return 'Player';
  }
};

export default Player;
