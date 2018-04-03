import SvgObject from 'svgObject'

export class Player {
    constructor(svgObj) {
        this.svgobj = svgObj;
        this.speedMultiplier = 1;
        this.size = 1;
    }


    get score() {
        //TODO Adjust player score display here
        return Math.floor(this.size * 100);
    }

    /**
     * Speed Getter
     * 
     * @returns Calculated speed of the player, 1 is normal speed, larger means faster.
     */
    get speed() {
        //TODO Adjust player speed here!
        return this.speedMultiplier / this.size;
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

    scheduleMove(direction) {
        this.nextMoveDirection = direction;
    }

    /**
     * 
     * @param edible Edible object to be tested.
     */
    tryEat(edible) {

    }

    boostSpeed(speedMultiplier) {
        this.speedMultiplier *= speedMultiplier;
        setTimeout(function () {
            this.speedMultiplier /= speedMultiplier;
        }, 5000);
    }

    /**
     * Give size growth to player
     * 
     * @param amount Amount of size a player gain. 100 is the player's initial size.
     */
    gainSize(amount) {
        this.size += amount / 100;
    }
};
