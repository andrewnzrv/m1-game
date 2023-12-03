class Obstacle extends Player {
  constructor() {
    super();
    this.width = 100;
    this.height = 50;
    this.element.src = "./images/obstacle.png";
    this.left = this.gameScreen.offsetWidth - this.width;
    this.top = Math.floor(
      Math.random() * (this.gameScreen.offsetHeight - 50) + 50
    );
  }

  move() {
    this.left -= 3;
    super.updatePosition();
  }
}
