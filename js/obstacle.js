class Obstacle extends Player {
  constructor() {
    super();
    this.width = 100;
    this.height = 50;
    this.element.src = "./images/obstacle.png";
    this.left = this.gameScreen.clientWidth + this.width;
    this.top = Math.floor(
      Math.random() *
        (this.gameScreen.clientHeight -
          this.height -
          50 -
          (this.height + 50) +
          (this.height + 50))
    );
    this.element.style.display = "none";
  }

  move() {
    // Set the speed of obstacles
    this.left -= 3;

    // Fix getting blinking obstacles in the upper left corner
    if (this.left <= this.gameScreen.clientWidth) {
      this.element.style.display = "block";
    }

    super.updatePosition();
  }
}
