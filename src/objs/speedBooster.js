import Edible from 'edible'

export class SpeedBooster extends Edible {
    constructor(x, y) {
        super(x, y);

    }

    get TypeName() {
        return 'SpeedBooster';
    }
};