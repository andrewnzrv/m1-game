class Game {
  constructor() {
    this.gameStartScreen = document.getElementById("game-start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-screen");

    this.player = new Player(100, 100, 200, 200, "./images/player.png");
  }

  start() {
    this.gameStartScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameLoop();
  }

  gameLoop() {
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();
  }
}
