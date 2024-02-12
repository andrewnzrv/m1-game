class Explosion {
  constructor(left, top) {
    this.gameScreen = document.getElementById("game-screen");
    this.left = left;
    this.top = top;
    this.width = 200;
    this.height = 200;
    this.element = document.createElement("img");

    this.element.src = "./images/explosion.gif";
    this.element.style.position = "absolute";
    this.element.style.zIndex = "2";

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.gameScreen.appendChild(this.element);
  }
}
