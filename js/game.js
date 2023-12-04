class Game {
  constructor() {
    this.gameStartScreen = document.getElementById("game-start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-screen");
    this.player = new Player(0, 0, 200, 100, "./images/player.png");
    this.obstacles = [];
    this.projectiles = [];
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

    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      projectile.move();

      // Remove projectiles that are off the screen from the DOM and array
      if (projectile.left + projectile.width > this.gameScreen.clientWidth) {
        projectile.element.remove();
        this.projectiles.splice(i, 1);
        i--;
        console.log(`Projectiles: ${this.projectiles.length}`); // -----> REMOVE
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // Remove obstacles that are off the screen from the DOM and array
      if (obstacle.left + obstacle.width < 0) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }

      // Check for collision (player and obstacle)
      else if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        console.log(`Lives: ${this.lives}`); // -----> REMOVE
        i--;
      }

      // Check for collision (projectile and obstacle)
      for (let j = 0; j < this.projectiles.length; j++) {
        const projectile = this.projectiles[j];

        if (projectile.didCollide(obstacle)) {
          obstacle.element.remove();
          projectile.element.remove();
          this.obstacles.splice(i, 1);
          this.projectiles.splice(j, 1);
          this.score++;
          console.log(`Score: ${this.score}`); // -----> REMOVE
          console.log(`Projectiles: ${this.projectiles.length}`); // -----> REMOVE
          i--;
          j--;
        }
      }
    }
    // Set the frequency of adding new obstacles
    if (Math.random() > 0.99) {
      this.obstacles.push(new Obstacle());
    }

    document.getElementById("lives").innerText = this.lives;
    document.getElementById("score").innerText = this.score;
  }
}
