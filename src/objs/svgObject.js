/**
 * SvgObject handles SVG manipulations.
 */
export class SvgObject {
    /**
     * Constructs a SvgObject from a SVG element.
     * @param domNode The SVG element.
     */
    constructor(domNode, svgX, svgY, svgSizeX, svgSizeY) {
        if (domNode.TypeName == 'SvgObject') {
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

        // Convert SVG DOM node to SvgObject
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

    get center() {
        return {
            x: (this.SizeX / 2) + this.x,
            y: (this.SizeY / 2) + this.y
        };
    }

    get TypeName() {
        return 'SvgObject';
    }
};
