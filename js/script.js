window.onload = function () {
  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    game.restart();
    startGame();
  });

  function startGame() {
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
