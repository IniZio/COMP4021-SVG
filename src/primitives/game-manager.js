import SVG from 'svg.js'

class GameManager {
  constructor ({el, empty}) {
    if (!SVG.supported) {
      alert('SVG not supported')
      return
    }

    this.$el = el
    this.$empty = empty
    this.gameObjects = []

    return this
  }

  context (name) {
    return SVG.get(name)
  }

  // Resets scene to empty
  reset () {
    const emptyClone = SVG.adopt(document.getElementById(this.$empty).cloneNode(true))
    emptyClone.attr('id', SVG.get(this.$el).attr('id'))

    SVG.get(this.$el).remove()
    SVG.get(this.$context).add(emptyClone)
  }

  mount (context) {
    this.$context = context

    this.reset()

    (function gameLoop (){
      this.update()
    })()
  }

  update () {
    this.gameObjects.map(object => object.update && object.update())
  }
}

export default GameManager
