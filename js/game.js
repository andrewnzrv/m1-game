class Game {
  constructor() {
    this.gameStartScreen = document.getElementById("game-start-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameScreen = document.getElementById("game-screen");
    this.gameStats = document.getElementById("game-stats");
    this.livesImg = document.getElementById("lives");
    this.scoreNumImg = document.getElementById("score-number");
    this.gameEndScreen = document.getElementById("game-end-screen");
    this.player = new Player(189, 105, "./images/player.png");

    this.explosionSound = "./sounds/explosion.wav";
    this.gameSound = new Audio("./sounds/game.ogg");
    this.winSound = new Audio("./sounds/win.ogg");
    this.loseSound = new Audio("./sounds/lose.ogg");

    this.gameSound.volume = 0.1;
    //this.explosionSound.volume = 0.1;
    this.winSound.volume = 0.1;
    this.loseSound.volume = 0.1;

    this.obstacles = [];
    this.projectiles = [];
    this.explosions = [];
    this.explosionSoundArr = [];
    this.lives = 3;
    this.score = 0;
    this.gameIsOver = false;
  }

  start() {
    this.gameSound.play();

    this.gameStartScreen.style.display = "none";
    this.gameEndScreen.style.display = "none";
    this.gameEndScreen
      .querySelectorAll("*")
      .forEach((element) => (element.style.display = "none"));
    this.scoreNumImg.innerHTML = "";
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
        this.explode(obstacle.left, obstacle.top);
        /*
        // Explode
        let explosion = new Explosion(this.player.left, this.player.top);
        setTimeout(() => {
          explosion.element.remove();
        }, 500);
        //this.explosionSound.play();*/

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
          /*let explosion = new Explosion(obstacle.left, obstacle.top);
          setTimeout(() => {
            explosion.element.remove();
          }, 500);
          this.explosionSoundArr.push(new Audio(this.explosionSound));
          this.explosionSoundArr[
            this.explosionSoundArr.length - 1
          ].volume = 0.1;
          this.explosionSoundArr[this.explosionSoundArr.length - 1].play();
          setTimeout(() => {
            this.explosionSoundArr.splice(0, 1);
          }, 3000);*/

          this.explode(obstacle.left, obstacle.top);

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
    if (Math.random() > 0.98) {
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
    this.gameSound.pause();

    this.gameIsOver = true;

    this.gameEndScreen.style.display = "flex";
    document.getElementById("restart-button").style.display = "block";

    if (this.lives === 0) {
      document.getElementById("you-lose").style.display = "block";
      this.loseSound.play();
    } else {
      document.getElementById("you-win").style.display = "block";
      this.winSound.play();
    }

    this.gameContainer
      .querySelectorAll("*")
      .forEach((element) => (element.style.cursor = "auto"));
  }

  restart() {
    this.loseSound.pause();
    this.winSound.pause();

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

  explode(left, top) {
    let explosion = new Explosion(left, top);
    setTimeout(() => {
      explosion.element.remove();
    }, 500);
    this.explosionSoundArr.push(new Audio(this.explosionSound));
    this.explosionSoundArr[this.explosionSoundArr.length - 1].volume = 0.1;
    this.explosionSoundArr[this.explosionSoundArr.length - 1].play();
    setTimeout(() => {
      this.explosionSoundArr.splice(0, 1);
    }, 3000);
  }
}
