import uuid from 'uuid/v4'
import autoBind from 'auto-bind'

class GameObject {
  constructor(opt) {
    this.id = uuid()
    const {controls} = opt;
    Object.assign(this, opt)
    this.svg.move(this.x, this.y)

    this.shortcuts = {}

    autoBind(this)
    return this
  }

  init({gameManager}) {
    this.gameManager = gameManager
  }

  update(frameTime) {
    throw new Error(
        "Function GameObject.update is not implemented."
    );
  }

  emit (event) {
    this.gameManager.listeners[event]()
  }

  /**
   * Get coordinate of center point of the GameObject
   *
   * @returns {{x: *, y: *}} The position of the GameObject's center point.
   */
  get center() {
    if (this.svgObj)
      return this.svgObj.center;
    return null;
  }

  get TypeName() {
    return 'GameObject';
  }
}

export default GameObject
