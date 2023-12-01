class Player {
  constructor(left, top, width, height, imgSrc) {
    this.gameScreen = document.getElementById("game-screen");
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.player = document.createElement("img");

    this.player.src = imgSrc;
    this.player.style.position = "relative";

    this.player.style.left = `${left}px`;
    this.player.style.top = `${top}px`;
    this.player.style.width = `${width}px`;
    this.player.style.height = `${height}px`;

    this.directionX = 0;
    this.directionY = 0;

    this.gameScreen.appendChild(this.player);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    this.updatePosition();
  }

  updatePosition() {
    this.player.style.left = `${left}px`;
    this.player.style.top = `${top}px`;
  }
}
