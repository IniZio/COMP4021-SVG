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
        const GAME_TIME = 60 * MILLI_SEC

        manager.player1 = new Player({
          x: 50, y: 100, svg: SVG.get('main1').clone(), playerNo: 1, putDownTrailTime: 0.2
        })
        manager.addGameObject(manager.player1)
        manager.addEventListener('player1.putTrail', function () {
          // console.log('Player1 going to put trail')
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
          // console.log('Player2 going to put trail')
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

        manager.$timeouts.push(setTimeout(() => manager.scene !== 'gameover' && manager.reset('gameover'), GAME_TIME))
      },
      gameover(manager) {
        manager.playMusicGameOver()
        document.getElementById("winner").innerHTML =
            Math.abs(manager.lastP1Score - manager.lastP2Score) > 1
            ? 'Player ' + ((manager.lastP1Score > manager.lastP2Score) ? '1' : '2') + ' Won!'
            : 'Draw!'
        SVG.get('restart_button').click(() => manager.reset())
        SVG.get('replay_button').click(() => manager.reset('game'))
      }
    }
  }

  scheduleProps() {
    super.scheduleProps(...arguments)
    const scheduler = setInterval(() => {
      for (var i = 0; i < 4; ++i)
        this.addGameObject(getRandomInt(-1, 2)
            ? new Food({
              x: getRandomInt(10, 990),
              y: getRandomInt(10, 490),
              svg: SVG.get('food').clone(),
              selfDestructTime: getRandomInt(10, 30)
            })
            : new SpeedBooster({
              x: getRandomInt(10, 900),
              y: getRandomInt(10, 400),
              svg: SVG.get('booster').clone(),
              selfDestructTime: getRandomInt(10, 30)
            })
        )
    }, 3000);
    this.$intervals.push(scheduler);
    return scheduler;
  }

  update() {
    super.update(...arguments)
    if (this.player1 && this.player1.score !== 0)
      this.lastP1Score = this.player1.score;
    if (this.player2 && this.player1.score !== 0)
      this.lastP2Score = this.player2.score;
    if (this.scene === 'game' || this.scene === 'gameover') {
      if (this.lastP1Score) document.getElementById('score_1').textContent = Math.max(0, this.lastP1Score).toString()
      if (this.lastP2Score) document.getElementById('score_2').textContent = Math.max(0, this.lastP2Score).toString()
    }
  }
}

export default BubbleManager;
