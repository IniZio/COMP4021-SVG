import autoBind from 'auto-bind'
import SVG from 'svg.js'

class GameManager {
  constructor ({el, empty}) {
    if (!SVG.supported) {
      alert('SVG not supported')
      return
    }

    this.$el = el
    this.$generators = {}
    this.$intervals = []
    this.gameObjects = []

    // animation frame compatibility
    if (!window.requestAnimFrame) {
      window.requestAnimFrame = (function () {
  		  return (
          window.requestAnimationFrame
  			  || window.webkitRequestAnimationFrame
  				|| window.mozRequestAnimationFrame
  			  || window.oRequestAnimationFrame
  				|| window.msRequestAnimationFrame
  			  || function (callback) {
            window.setTimeout(callback, 1000 / 120);
  			  }
        )})()
    }

    autoBind(this)
    return this
  }

  // Resets scene
  reset (scene = 'welcome') {
    // Kill schedulers
    this.$intervals.map(clearInterval)

    // Static template
    this.scene = scene
    const emptyClone = SVG.adopt(document.getElementById(this.scene).cloneNode(true))
    emptyClone.attr('id', SVG.get(this.$el).attr('id'))

    // Replace existing scene with new one
    SVG.get(this.$el).remove()
    SVG.get(this.$context).add(emptyClone)

    // Dynamic generator
    this.$generators[this.scene](this)
  }

  mount (context) {
    this.$context = context

    this.reset()

    // NOTE: do not delete the semi-colon
    const manager = this;

    (function gameLoop (ms) {
      if (this.$lastUpdate) {
        this.update((ms - this.$lastUpdate) / 1000)
      }

      this.$lastUpdate = ms

      this.$frame = requestAnimFrame(gameLoop.bind(manager))
    }.bind(manager))()
  }

  update (dt) {
    this.gameObjects.map(object => object.update && object.update(dt))
  }

  addGameObject (gameObj) {
    gameObj.init({gameManager: this})
    this.gameObjects.push(gameObj)
    SVG.get(this.$el).add(gameObj.svg)
  }
  
  this.startingMusic = new Audio('../sound/starting_screen_sound.MP3');
  this.playingMusic = new Audio('../sound/game_play_sound.MP3');
  this.gameOverMusic = new Audio('../sound/game_finishing_sound.MP3');
  this.foodAppearMusic = new Audio('../sound/food_appear_sound.MP3');
  this.foodEatingMusic = new Audio('../sound/food_eating_sound.MP3');
  this.boosterMusic = new Audio('../sound/booster_5sec.MP3');
  this.bangWallMusic = new Audio('../sound/bang_the_wall_sound.MP3');

  function playMusicStarting(){
    if (typeof startingMusic.loop == 'boolean')
    {
      startingMusic.loop = true;
    }
    else
    {
      startingMusic.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
      }, false);
    }
    startingMusic.pause();
    startingMusic.currentTime = 0;
    startingMusic.play();
  }

  function playMusicPlaying(){
    startingMusic.pause();
    startingMusic.currentTime = 0;

    if (typeof playingMusic.loop == 'boolean')
    {
      playingMusic.loop = true;
    }
      else
    {
      playingMusic.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
      }, false);
    }
    playingMusic.pause();
    playingMusic.currentTime = 0;
    playingMusic.play();
  }

  function playMusicGameOver(){
    startingMusic.pause();
    startingMusic.currentTime = 0;
    playingMusic.pause();
    playingMusic.currentTime = 0;
    BangWall.pause();
    BangWall.currentTime = 0;
    Booster.pause();
    Booster.currentTime = 0;

    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    gameOverMusic.play();
  }

  function playMusicFoodAppear(){
    foodAppearMusic.pause();
    foodAppearMusic.currentTime = 0;
    foodAppearMusic.play();
  }

  function playMusicFoodEating(){
    foodEatingMusic.pause();
    foodEatingMusic.currentTime = 0;
    foodEatingMusic.play();
  }

  function playMusicBangWall(){
    bangWallMusic.pause();
    bangWallMusic.currentTime = 0;
    bangWallMusic.play();
  }

  function playMusicBooster(){
    boosterMusic.pause();
    boosterMusic.currentTime = 0;
    boosterMusic.play();
  }
}

export default GameManager
