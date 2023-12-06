window.onload = function () {
  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    game.restart();
    startGame();
    console.log("Restart clicked"); // -----> REMOVE
  });

  function startGame() {
    function handleMouseMovements(event) {
      game.player.left = event.clientX;
      game.player.top = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMovements);

    window.addEventListener("click", () => {
      game.projectiles.push(new Projectile());
      console.log("FIRE!!!"); // -----> REMOVE
    });

    game = new Game();
    game.start();
  }
};
