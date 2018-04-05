/**
 * SVGObject handles SVG manipulations.
 */
class SVGObject {
  /**
   * Constructs a SVGObject from a SVG element.
   * @param domNode The SVG element.
   * @param svgX
   * @param svgY
   * @param svgSizeX
   * @param svgSizeY
   */
  constructor(domNode, svgX, svgY, svgSizeX, svgSizeY) {
    if (domNode.TypeName && domNode.TypeName === 'SVGObject') {
      // Copy Constructor
      svgObj = domNode;
      this.domNode = svgObj.domNode.cloneNode();
      svgObj.domNode.insertBefore(this.domNode);
      this.svgX = svgObj.svgX;
      this.svgY = svgObj.svgY;
      this.svgSizeX = svgObj.svgSizeX;
      this.svgSizeY = svgObj.svgSizeY;

      this.x = svgObj.svgX;
      this.y = svgObj.svgY;
      this.sizeX = svgObj.svgSizeX;
      this.sizeY = svgObj.svgSizeY;
      return
    }

    // Convert SVG DOM node to SVGObject
    this.domNode = domNode;

    this.svgX = svgX;
    this.svgY = svgY;
    this.svgSizeX = svgSizeX;
    this.svgSizeY = svgSizeY;

    this.x = svgX;
    this.y = svgY;
    this.sizeX = svgSizeX;
    this.sizeY = svgSizeY;
  }

  /**
   * Apply transformation.
   * Set property x, y, sizeX and sizeY of the SVGObject first,
   * and then call this function to apply the new transformation.
   * Transformation is applied with animation.
   *
   * @param transformDelay String of time of delay before applying the transformation.
   * @param transformTime String of time of animation duration.
   */
  transform(transformDelay, transformTime) {
    let translateX = this.x - this.svgX;
    let translateY = this.y - this.svgY;
    let scaleX = this.sizeX / this.svgSizeX;
    let scaleY = this.sizeY / this.svgSizeY;

    this.domNode.style.transition = "transform " + transformDelay + " " + transformTime + "";
    this.domNode.style.transform = "translate(" + translateX + "px, " + translateY + "px) scale(" + scaleX + ", " + scaleY + ")";
  }

  /**
   * Getter of the center point of the SVGObject
   *
   * @returns {{x: *, y: *}} Center coordinate of the SVGObject
   */
  get center() {
    return {
      x: (this.sizeX / 2) + this.x,
      y: (this.sizeY / 2) + this.y
    };
  }

  get TypeName() {
    return 'SVGObject';
  }
};

export default SVGObject;