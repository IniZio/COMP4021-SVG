import autoBind from 'auto-bind'
import SVG from 'svg.js'
import keyboard from 'keyboardjs'

function didCollide(o1, o2) {
  var r1 = o1.rbox();    // Bounding box of first object
  var r2 = o2.rbox();    // Bounding box of second object

  return !(r2.x > r1.x2 ||
      r2.x2 < r1.x ||
      r2.y > r1.y2 ||
      r2.y2 < r1.y)
}

class GameManager {
  constructor({el, empty}) {
    if (!SVG.supported) {
      alert('SVG not supported')
      return
    }
    this.startingMusic = new Audio((require('../sound/starting_screen_sound.MP3')))
    this.playingMusic = new Audio((require('../sound/game_play_sound.MP3')))
    this.gameOverMusic = new Audio((require('../sound/game_finishing_sound.MP3')))
    this.foodAppearMusic = new Audio((require('../sound/food_appear_sound.MP3')))
    this.foodEatingMusic = new Audio((require('../sound/food_eating_sound.MP3')))
    this.boosterMusic = new Audio((require('../sound/booster_5sec.MP3')))
    this.bangWallMusic = new Audio((require('../sound/bang_the_wall_sound.MP3')))

    this.$el = el
    this.$generators = {}
    this.$intervals = []
    this.$timeouts = []
    this.gameObjects = []
    this.listeners = {}

    // animation frame compatibility
    if (!window.requestAnimFrame) {
      window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
              window.setTimeout(callback, 1000 / 120);
            }
        )
      })()
    }

    autoBind(this)
    window.GameManager = this
    return this
  }

  // Resets scene
  reset(scene = 'welcome') {
    // Unbind old shortcuts
    this.gameObjects.map(object => {
      if (object.shortcuts) {
        Object.keys(object.shortcuts).map(code => {
          keyboard.unbind(code)
        })
      }
    })

    if (scene === 'gameover') {
      this.removeGameObjectById(this.player1.id)
      this.removeGameObjectById(this.player2.id)
      this.player1 = null;
      this.player2 = null;
      this.listeners = {};
    }

    // Kill schedulers
    this.$intervals.map(clearInterval)
    this.$intervals.length = 0

    this.$timeouts.map(clearTimeout)
    this.$intervals.length = 0

    this.listeners = {}

    // Static template
    this.scene = scene
    const emptyClone = SVG.adopt(document.getElementById(this.scene).cloneNode(true))
    emptyClone.attr('id', SVG.get(this.$el).attr('id'))

    // Replace existing scene with new one
    SVG.get(this.$el).remove()
    SVG.get(this.$context).add(emptyClone)

    // Dynamic generator
    this.$generators[this.scene](this)

    // Bind new shortcuts
    this.gameObjects.map(object => {
      if (object.shortcuts) {
        Object.keys(object.shortcuts).map(code => {
          keyboard.bind(
              code,
              // keydown
              () => object.shortcuts[code](true),
              // keyup
              () => object.shortcuts[code](false)
          )
        })
      }
    })
  }

  mount(context) {
    this.$context = context

    this.reset()

    // NOTE: do not delete the semi-colon
    const manager = this;

    (function gameLoop(ms) {
      if (this.$lastUpdate) {
        this.update((ms - this.$lastUpdate) / 1000)
      }

      this.$lastUpdate = ms

      this.$frame = requestAnimFrame(gameLoop.bind(manager))
    }.bind(manager))()
  }

  update(dt) {
    this.scanCollisions()
    this.gameObjects.map(object => object.update && object.update(dt))
  }

  addGameObject(gameObj) {
    gameObj.init({gameManager: this})
    this.gameObjects.push(gameObj)
    SVG.get(this.$el).add(gameObj.svg)
    // Note: This makes player to be always on the very top;
  }

  removeGameObjectById(gameObjId) {
    let gameObj = this.gameObjects.find(obj => obj.id === gameObjId);
    this.gameObjects = this.gameObjects.filter(obj => obj.id !== gameObjId);
    if (gameObj && gameObj.svg) gameObj.svg.remove();
  }

  addEventListener(event, callback) {
    this.listeners[event] = callback
  }

  scanCollisions() {
    this.collisions = this.gameObjects.reduce((acc, obj) => {
      acc[obj.id] = [];
      return acc
    }, {})
    this.gameObjects.map((object1, key1) =>
        this.gameObjects.slice(key1 + 1).map(object2 => {
          if (didCollide(object1.svg, object2.svg)) {
            this.collisions[object1.id].push(object2)
            this.collisions[object2.id].push(object1)
          }
        })
    )
  }

  scheduleProps() {
  }

  playMusicStarting() {
    if (typeof this.startingMusic.loop == 'boolean') {
      this.startingMusic.loop = true;
    }
    else {
      this.startingMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
    }
    this.startingMusic.pause();
    this.startingMusic.currentTime = 0;
    this.startingMusic.play();
  }

  playMusicPlaying() {
    this.startingMusic.pause();
    this.startingMusic.currentTime = 0;

    if (typeof this.playingMusic.loop == 'boolean') {
      this.playingMusic.loop = true;
    }
    else {
      this.playingMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
    }
    this.playingMusic.pause();
    this.playingMusic.currentTime = 0;
    this.playingMusic.play();
  }

  playMusicGameOver() {
    this.startingMusic.pause();
    this.startingMusic.currentTime = 0;
    this.playingMusic.pause();
    this.playingMusic.currentTime = 0;
    this.bangWallMusic.pause();
    this.bangWallMusic.currentTime = 0;
    this.boosterMusic.pause();
    this.boosterMusic.currentTime = 0;

    this.gameOverMusic.pause();
    this.gameOverMusic.currentTime = 0;
    this.gameOverMusic.play();
  }

  playMusicFoodAppear() {
    this.foodAppearMusic.pause();
    this.foodAppearMusic.currentTime = 0;
    this.foodAppearMusic.play();
  }

  playMusicFoodEating() {
    this.foodEatingMusic.pause();
    this.foodEatingMusic.currentTime = 0;
    this.foodEatingMusic.play();
  }

  playMusicBangWall() {
    this.bangWallMusic.pause();
    this.bangWallMusic.currentTime = 0;
    this.bangWallMusic.play();
  }

  playMusicBooster() {
    this.boosterMusic.pause();
    this.boosterMusic.currentTime = 0;
    this.boosterMusic.play();
  }
}

export default GameManager
