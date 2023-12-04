class Game {
  constructor() {
    this.gameStartScreen = document.getElementById("game-start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-screen");
    this.player = new Player(0, 0, 200, 100, "./images/player.png");
    this.obstacles = [];
    this.lives = 3;
    this.score = 0;
  }

  start() {
    this.gameStartScreen.style.display = "none";
    this.gameScreen.style.display = "flex";
    this.gameLoop();
  }

  gameLoop() {
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // Remove obstacles that are off the screen from the DOM and array
      if (obstacle.left + obstacle.width < 0) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }

      // Check for collision
      else if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        console.log(this.lives);
        i--;
      }
    }

    // Set the frequency of adding new obstacles
    if (Math.random() > 0.99) {
      this.obstacles.push(new Obstacle());
    }
  }
}
