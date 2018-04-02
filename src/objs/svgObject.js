
/**
 * SvgObject handles SVG manipulations.
 */
export class SvgObject {
    /**
     * Constructs a SvgObject from a SVG element.
     * @param domNode The SVG element.
     */
    constructor(domNode) {
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
     * Set property x, y, sizeX and sizeY of the SvgObject first,
     * and then call this function to apply the new transformation.
     * Transformation is applied with animation.
     *
     * @param transformDelay String of time of delay before applying the transformation.
     * @param transformTime String of time of animation duration.
     */
    transform(transformDelay, transformTime) {
        var translateX = this.x - this.svgX;
        var translateY = this.y - this.svgY;
        var scaleX = this.sizeX / this.svgSizeX;
        var scaleY = this.sizeY / this.svgSizeY;

        this.domNode.style.transition = "transform " + transformDelay + " " + transformTime + "";
        this.domNode.style.transform = "translate(" + translateX + "px, " + translateY + "px) scale(" + scaleX + ", " + scaleY + ")";
    }
};
