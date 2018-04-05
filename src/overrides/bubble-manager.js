import SVG from 'svg.js'
import ProgressBar from 'progressbar.js'
import keyboard from 'keyboardjs'

import {getRandomInt} from '../utils';
import GameManager from '../primitives/game-manager';
import Player from '../objs/player';
import Food from '../objs/food';
import SpeedBooster from '../objs/speedBooster';

class BubbleManager extends GameManager {
  constructor() {
    super(...arguments)
    this.$generators = {
      welcome(manager) {
        SVG.get('play_button').click(() => {
          manager.reset('game')
        })
      },
      game(manager) {
        manager.playMusicStarting()

        const MILLI_SEC = 1000
        const GAME_TIME = 300 * MILLI_SEC

        manager.player1 = new Player({
          x: 50, y: 100, svg: SVG.get('main1').clone(), playerNo: 1, putDownTrailTime: 0.2
        })
        manager.addGameObject(manager.player1)
        manager.addEventListener('player1.putTrail', function () {
          console.log('Player1 going to put trail')
          manager.player1.putTrail();
        })
        manager.addEventListener('player1.die', function () {
          // TODO Game Over
          manager.scene !== 'gameover' && manager.reset('gameover')
        })

        manager.player2 = new Player({
          x: 600, y: 100, svg: SVG.get('main2').clone(), playerNo: 2, putDownTrailTime: 0.2
        })
        manager.addGameObject(manager.player2)
        manager.addEventListener('player2.putTrail', function () {
          console.log('Player2 going to put trail')
          manager.player2.putTrail();
        })
        manager.addEventListener('player2.die', function () {
          // TODO Game Over
          manager.scene !== 'gameover' && manager.reset('gameover')
        })

        new ProgressBar.Line('#timer_bar', {
          strokeWidth: 4,
          // easing: 'easeInOut',
          duration: GAME_TIME,
          color: '#aaa',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '100%', height: 5},
          from: {color: '#aaa'},
          to: {color: '#e00'},
          step: function (state, timer) {
            timer.path.setAttribute('stroke', state.color);

            const timeLeft = Math.round(GAME_TIME * (1 - timer.value()) / MILLI_SEC);
            document.getElementById('countdown').textContent = timeLeft
          }
        }).animate(1)
        manager.scheduleProps()

        setTimeout(() => manager.scene !== 'gameover' && manager.reset('gameover'), GAME_TIME)
      },
      gameover(manager) {
        manager.playMusicGameOver()

        SVG.get('restart_button').click(() => manager.reset())
        SVG.get('replay_button').click(() => manager.reset('game'))
      }
    }
  }

  scheduleProps() {
    super.scheduleProps(...arguments)
    const scheduler = setInterval(() => {
      this.addGameObject(getRandomInt(-1, 2)
          ? new SpeedBooster({
            x: getRandomInt(10, 900),
            y: getRandomInt(10, 400),
            svg: SVG.get('booster').clone(),
            selfDestructTime: getRandomInt(10, 30)
          })
          : new Food({
            x: getRandomInt(10, 990),
            y: getRandomInt(10, 490),
            svg: SVG.get('food').clone(),
            selfDestructTime: getRandomInt(10, 30)
          })
      )
    }, 3000);
    this.$intervals.push(scheduler);
    return scheduler;
  }

  update() {
    super.update(...arguments)
    if (this.scene === 'game' || this.scene === 'gameover') {
      if (this.player1) document.getElementById('score_1').textContent = this.player1.score
      if (this.player2) document.getElementById('score_2').textContent = this.player2.score
    }
  }
}

export default BubbleManager;
