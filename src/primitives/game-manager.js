import autoBind from 'auto-bind'
import SVG from 'svg.js'

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
    this.gameObjects = []

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
    // Kill schedulers
    this.$intervals.map(clearInterval)
    this.$intervals.length = 0

    // Static template
    this.scene = scene
    const emptyClone = SVG.adopt(document.getElementById(this.scene).cloneNode(true))
    emptyClone.attr('id', SVG.get(this.$el).attr('id'))

    // Replace existing scene with new one
    SVG.get(this.$el).remove()
    SVG.get(this.$context).add(emptyClone)

    // Dynamic generator
    this.$generators[this.scene](this)
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
    this.gameObjects.map(object => object.update && object.update(dt))
  }

  addGameObject(gameObj) {
    gameObj.init({gameManager: this})
    this.gameObjects.push(gameObj)
    SVG.get(this.$el).add(gameObj.svg)
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
