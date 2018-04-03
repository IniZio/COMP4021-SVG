import autoBind from 'auto-bind'
import SVG from 'svg.js'

class GameManager {
  constructor ({el, empty}) {
    if (!SVG.supported) {
      alert('SVG not supported')
      return
    }

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
        )})()
    }

    autoBind(this)
    return this
  }

  // Resets scene
  reset (scene = 'welcome') {
    // Kill schedulers
    this.$intervals.map(clearInterval)

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

  mount (context) {
    this.$context = context

    this.reset()

    // NOTE: do not delete the semi-colon
    const manager = this;

    (function gameLoop (ms) {
      if (this.$lastUpdate) {
        this.update((ms - this.$lastUpdate) / 1000)
      }

      this.$lastUpdate = ms

      this.$frame = requestAnimFrame(gameLoop.bind(manager))
    }.bind(manager))()
  }

  update (dt) {
    this.gameObjects.map(object => object.update && object.update(dt))
  }

  addGameObject (gameObj) {
    gameObj.init({gameManager: this})
    this.gameObjects.push(gameObj)
    SVG.get(this.$el).add(gameObj.svg)
  }
}

export default GameManager
