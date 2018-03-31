import SVG from 'svg.js'

class GameManager {
  constructor () {
    if (!SVG.supported) {
      alert('SVG not supported')
      return
    }

    this.$el = null
    this.$createdAt = null
    return this
  }

  init (svgEl) {
    this.$createdAt = new Date().getTime()
    this.$el = svgEl

    // Demonstrates cloning an element
    var main1_clone = SVG.get('player1').clone(this.$el)
    main1_clone.attr({ cx: 300, cy: 120 })

    console.log('Game manager initialized')
  }
}

export default GameManager
