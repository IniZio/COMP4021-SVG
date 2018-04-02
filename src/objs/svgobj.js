class svgobj {
    constructor(domNode, svgX, svgY, svgSizeX, svgSizeY) {
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

    transform(transformDelay, transformTime) {
        var translateX = this.x - this.svgX;
        var translateY = this.y - this.svgY;
        var scaleX = this.sizeX / this.svgSizeX;
        var scaleY = this.sizeY / this.svgSizeY;

        this.domNode.style.transition = "transform " + transformDelay + " " + transformTime + "";
        this.domNode.style.transform = "translate(" + translateX + "px, " + translateY + "px) scale(" + scaleX + ", " + scaleY + ")";
    }
}