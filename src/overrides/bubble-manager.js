import SVG from 'svg.js';

import {getRandomInt} from '../utils';
import GameManager from '../primitives/game-manager';
import Player from '../objs/player';
import Food from '../objs/food';
import SpeedBooster from '../objs/speedBooster';

class BubbleManager extends GameManager {
    constructor() {
        super(...arguments);
        this.$generators = {
            welcome(manager) {
                SVG.get('play_button').click(() => {
                    manager.reset('game');
                })
            },
            game(manager) {
                manager.addGameObject(new Player({x: 0, y: 10, svg: SVG.get('main1').clone()}));
                manager.scheduleProps();
            },
            gameover(manager) {
                SVG.get('restart_button').click(manager.reset);
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
}

export default BubbleManager;
