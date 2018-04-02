import SvgObject from 'svgObject'

export class Player {
    constructor() {
        this.svgobj = new SvgObject(document.getElementById('playerSVG'));
        this.baseSpeed = 1;
        this.speedMultiplier = 1;
        this.size = 1;
    }

    get score() {
        return this.size;
    }

    move(direction) {
        switch (direction) {
            case 'w':
                break;
            case 's':
                break;
            case 'a':
                break;
            case 'd':
                break;
            default:
                break;
        }

    }

    tryEat(edible) {

    }
};
