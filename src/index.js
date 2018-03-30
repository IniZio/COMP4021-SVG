import SVG from 'svg.js'

// Demonstrates cloning an element
var main1_clone = SVG.get('main1').clone()
main1_clone.attr({ cx: 50, cy: 120 })
