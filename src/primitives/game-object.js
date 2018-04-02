class GameObject {
  constructor (opt) {
    Object.assign(this, opt)
  }

  init ({gameManager}) {
    this.gameManager = gameManager
  }

  update () {
    this.x++
    this.svg.move(this.x, this.y)
  }
}

export default GameObject
