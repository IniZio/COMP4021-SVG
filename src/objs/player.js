import SvgObject from 'svgObject'
import GameObject from "../primitives/game-object";

export class Player extends GameObject {
    constructor(svgObj) {
        super();
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

    move() {
        switch (this.nextMoveDirection) {
            //TODO Implement moving according to speed
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
        this.nextMoveDirection = '';
    }

    scheduleMove(direction) {
        this.nextMoveDirection = direction;
    }

    /**
     * Test if the player can eat the edible object.
     * If yes, the player will trigger eat function of the edible.
     *
     * @param edible Edible object to be tested.
     */
    tryEat(edible) {
        //TODO Adjust eating trigger distance here

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

    /**
     * Get coordinate of center point of the GameObject
     *
     * @returns {x:number, y:number} The position of the GameObject's center point.
     */
    get center() {
        return this.svgobj.center;
    }

    get TypeName() {
        return 'Player';
    }
};
