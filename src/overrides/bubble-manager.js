import SVG from 'svg.js'
import ProgressBar from 'progressbar.js'


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
        const MILLI_SEC = 1000
        const GAME_TIME = 150 * MILLI_SEC

        manager.player1 = new Player({x: 0, y: 10, svg: SVG.get('main1').clone()})
        manager.addGameObject(manager.player1)
        // manager.addEventListener('player1.putTrail', function(){
        //
        // })
        document.getElementsByTagName('body')[0].onkeydown = function (e) {
          switch (e.keyCode) {
            case 87:
              // 'w'
              manager.player1.moveW = true;
              break;
            case 83:
              // 's'
              manager.player1.moveS = true;
              break;
            case 65:
              // 'a'
              manager.player1.moveA = true;
              break;
            case 68:
              // 'd'
              manager.player1.moveD = true;
              break;
            default:
              break;
          }
        };
        document.getElementsByTagName('body')[0].onkeyup = function (e) {
          switch (e.keyCode) {
            case 87:
              // 'w'
              manager.player1.moveW = false;
              break;
            case 83:
              // 's'
              manager.player1.moveS = false;
              break;
            case 65:
              // 'a'
              manager.player1.moveA = false;
              break;
            case 68:
              // 'd'
              manager.player1.moveD = false;
              break;
            default:
              break;
          }
        };

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


        SVG.get('restart_button').click(() => manager.reset())
        SVG.get('replay_button').click(() => manager.reset('game'))
      }
    }
  }

  scheduleProps() {
    const scheduler = setInterval(() => {
      // TODO: use Food class once implemented as aligned with GameObject
      this.addGameObject(getRandomInt(-1, 2)
          ? new SpeedBooster({
            x: getRandomInt(10, 990),
            y: getRandomInt(10, 490),
            svg: SVG.get('booster').clone(),
            selfDestructTime: getRandomInt(2000, 10000)
          })
          : new Food({
            x: getRandomInt(10, 990),
            y: getRandomInt(10, 490),
            svg: SVG.get('food').clone(),
            selfDestructTime: getRandomInt(2000, 10000)
          })
      )
    }, 3000);
    this.$intervals.push(scheduler);
    return scheduler;
  }

  update () {
    super.update(...arguments)
    if (this.scene === 'game' || this.scene === 'gameover') {
      if (this.player1) document.getElementById('score_1').textContent = this.player1.score
      if (this.player2) document.getElementById('score_2').textContent = this.player2.score
    }
  }
}

export default BubbleManager;
