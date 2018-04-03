import SVG from 'svg.js'

import GameManager from '../primitives/game-manager'
import Player from '../overrides/player'

class BubbleManager extends GameManager {
  constructor () {
    super(...arguments)
    this.$generators = {
      welcome (manager) {
        SVG.get('play_button').click(() => {
          manager.reset('game')
        })
      },
      game (manager) {
        manager.addGameObject(new Player({x: 0, y: 10, svg: SVG.get('main1').clone()}))
      },
      gameover (manager) {
        SVG.get('restart_button').click(() => {
          manager.reset('game')
        })
      }
    }
  }
}

export default BubbleManager
