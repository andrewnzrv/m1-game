window.onload = function () {
  const introSound = new Audio("./sounds/intro.ogg");
  introSound.play();
  introSound.volume = 0.1;

  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    game.restart();
    startGame();
  });

  function startGame() {
    introSound.pause();

    function handleMouseMovements(event) {
      game.player.left = event.clientX;
      game.player.top = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMovements);

    document.getElementById("game-screen").addEventListener("click", () => {
      game.projectiles.push(new Projectile());
    });

    game = new Game();
    game.start();
  }
};
