window.onload = function () {
  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();

    function handleMouseMovements(event) {
      game.player.left = event.clientX;
      game.player.top = event.clientY;
    }

    setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMovements);
      window.addEventListener("click", () => {
        game.projectiles.push(new Projectile());
      });
    }, 1000);
  }
};
