import GameManager from '../primitives/game-manager'
import Player from '../overrides/player'

class BubbleManager extends GameManager {
  constructor () {
    super(...arguments)
    this.$generators = {
      game: manager => {
        manager.addGameObject(new Player({x: 0, y: 10, svg: SVG.get('main1').clone()}))
      }
    }
  }
}

export default BubbleManager
