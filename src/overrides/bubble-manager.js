import SVG from 'svg.js'
import ProgressBar from 'progressbar.js'

import {getRandomInt} from '../utils'
import GameManager from '../primitives/game-manager'
import Player from '../overrides/player'
// import Food from '../objs/food'

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
        const MILLI_SEC = 1000
        const GAME_TIME = 15 * MILLI_SEC

        manager.addGameObject(new Player({x: 0, y: 10, svg: SVG.get('main1').clone()}))
        new ProgressBar.Line('#timer_bar', {
          strokeWidth: 4,
          // easing: 'easeInOut',
          duration: GAME_TIME,
          color: '#aaa',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '100%', height: 5},
          from: { color: '#aaa' },
          to: { color: '#e00' },
          step: function(state, timer) {
            timer.path.setAttribute('stroke', state.color);

            var value = Math.round(timer.value() * 100);
            if (value === 0) {
              timer.setText('');
            } else {
              timer.setText(value);
            }
          }
        }).animate(1)
        manager.scheduleProps()

        setTimeout(() => manager.scene !== 'gameover' && manager.reset('gameover'), GAME_TIME)
      },
      gameover (manager) {
        SVG.get('restart_button').click(() => manager.reset())
        SVG.get('replay_button').click(() => manager.reset('game'))
      }
    }
  }

  scheduleProps () {
    const scheduler = setInterval(() => {
      // TODO: use Food class once implemented as aligned with GameObject
      this.addGameObject(new Player({
        x: getRandomInt(10, 990),
        y: getRandomInt(10, 490),
        svg: getRandomInt(-1, 2) ? SVG.get('food').clone() : SVG.get('booster').clone(),
      }))
    }, 3000)
    this.$intervals.push(scheduler)
    return scheduler
  }
}

export default BubbleManager
