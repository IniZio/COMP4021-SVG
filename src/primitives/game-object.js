class GameObject {
  update() {
    throw new Error(
      "Function GameObject.update is not implemented."
    );
  }

  /**
   * Get coordinate of center point of the GameObject
   * 
   * @returns {x:number, y:number} The position of the GameObject's center point.
   */
  get center() {
    throw new Error(
      "Function GameObject.center is not implemented."
    );
  }
}

export default GameObject
