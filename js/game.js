class Game {
  constructor() {
    this.gameStartScreen = document.getElementById("game-start-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameScreen = document.getElementById("game-screen");
    this.gameStats = document.getElementById("game-stats");
    this.livesImg = document.getElementById("lives");
    this.scoreNumImg = document.getElementById("score-number");
    this.gameEndScreen = document.getElementById("game-end-screen");
    this.player = new Player(0, 0, 189, 105, "./images/player.png");
    this.obstacles = [];
    this.projectiles = [];
    this.explosions = [];
    this.lives = 3;
    this.score = 0;
    this.gameIsOver = false;
  }

  start() {
    this.gameStartScreen.style.display = "none";
    this.gameEndScreen.style.display = "none";
    this.gameContainer.style.display = "block";
    this.gameContainer
      .querySelectorAll("*")
      .forEach((element) => (element.style.display = "flex"));
    this.scoreNumImg.innerHTML = "";
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

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
          // Explode
          let explosion = new Explosion(obstacle.left, obstacle.top);
          setTimeout(() => {
            explosion.element.remove();
          }, 500);

          obstacle.element.remove();
          projectile.element.remove();
          this.obstacles.splice(i, 1);
          this.projectiles.splice(j, 1);
          this.score++;
          console.log(`Score: ${this.score}`); // -----> REMOVE
          console.log(`Projectiles: ${this.projectiles.length}`); // -----> REMOVE
          i--;
          j--;

          // Update score
          this.scoreNumImg.innerHTML = "";
          const scoreArray = Array.from(String(this.score), Number);
          scoreArray.forEach((digit) => {
            this.scoreNumImg.appendChild(
              Object.assign(document.createElement("img"), {
                src: `images/score/${digit}.png`,
              })
            );
          });
        }
      }
    }
    // Set the frequency of adding new obstacles
    if (Math.random() > 0.99) {
      this.obstacles.push(new Obstacle());
    }

    // Update life images
    switch (this.lives) {
      case 3:
        this.livesImg
          .querySelectorAll("*")
          .forEach((element) => (element.style.display = "flex"));
        break;
      case 2:
        document.getElementById("life-3").style.display = "none";
        break;
      case 1:
        document.getElementById("life-2").style.display = "none";
        document.getElementById("life-3").style.display = "none";
        break;
      case 0:
        document.getElementById("life-1").style.display = "none";
        document.getElementById("life-2").style.display = "none";
        document.getElementById("life-3").style.display = "none";
        break;
    }

    // Check if game is over
    if (this.lives === 0 || this.score === 50) {
      this.endGame();
    }
  }

  endGame() {
    this.gameIsOver = true;

    this.gameContainer
      .querySelectorAll("*")
      .forEach((element) => (element.style.opacity = "0.5"));
    this.gameEndScreen.style.display = "flex";
    this.gameEndScreen
      .querySelectorAll("*")
      .forEach((element) => (element.style.display = "block"));
    this.gameContainer
      .querySelectorAll("*")
      .forEach((element) => (element.style.cursor = "auto"));
  }

  restart() {
    this.player.element.remove();
    this.projectiles.forEach((projectile) => projectile.element.remove());
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameContainer
      .querySelectorAll("*")
      .forEach((element) => (element.style.opacity = "1"));
    this.gameContainer
      .querySelectorAll("*")
      .forEach((element) => (element.style.cursor = "none"));
  }
}
