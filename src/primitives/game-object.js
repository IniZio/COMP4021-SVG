class GameObject {
    constructor(opt) {
        Object.assign(this, opt)
    }

    init({gameManager}) {
        this.gameManager = gameManager
    }

    update(frameTime) {
        throw new Error(
            "Function GameObject.update is not implemented."
        );
    }

    /**
     * Get coordinate of center point of the GameObject
     *
     * @returns {{x: *, y: *}} The position of the GameObject's center point.
     */
    get center() {
        throw new Error(
            "Function GameObject.center is not implemented."
        );
    }

    get TypeName() {
        return 'GameObject';
    }
}

export default GameObject
