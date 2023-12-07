class Projectile extends Player {
  constructor(imgSrc) {
    super();
    this.width = 50;
    this.height = 20;
    this.element.src = imgSrc;
    this.left = game.player.left + (game.player.width - this.width);
    this.top = game.player.top + game.player.height / 2 - this.height / 2;
    this.element.style.zIndex = "1";
  }

  move() {
    // Set the speed of the projectile
    this.left += 6;

    super.updatePosition();
  }
}
