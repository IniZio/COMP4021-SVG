import SvgObject from 'svgObject'
import GameObject from "../primitives/game-object";

class Player extends GameObject {
    constructor(svgObj) {
        super();
        this.svgObj = svgObj;
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
            //TODO Adjust player speed here!
            case 'w':
                svgObj.y += 1 * speedMultiplier;
                break;
            case 's':
                svgObj.y -= 1 * speedMultiplier;
                break;
            case 'a':
                svgObj.x -= 1 * speedMultiplier;
                break;
            case 'd':
                svgObj.x += 1 * speedMultiplier;
                break;
            default:
                break;
        }
        this.svgObj.transform(0, 0.025);
        this.nextMoveDirection = '';
    }

    clearMove() {
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
        a = edible.center.x - this.center.x;
        b = edible.center.y - this.center.y;

        distance = Math.sqrt(a * a + b * b);
        if (distance <= this.svgObj.sizeX / 2) {
            edible.eatenBy(player);
        }
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
    grow(amount) {
        this.size += amount / 100;
        this.svgObj.sizeX = this.svgObj.svgSizeX * this.size;
        this.svgObj.sizeY = this.svgObj.svgSizeX * this.size;
        this.svgObj.transform(0, 0.025);
    }

    putTrail() {

    }

    update(frameTime) {

    }

    /**
     * Get coordinate of center point of the GameObject
     *
     * @returns {{x: *, y: *}} The position of the GameObject's center point.
     */
    get center() {
        return this.svgObj.center;
    }

    static get TypeName() {
        return 'Player';
    }
};

export default Player;