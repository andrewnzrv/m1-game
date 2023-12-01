window.onload = function () {
  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();

    function handleMouseMovements(event) {
      game.player.left = event.clientX;
      game.player.top = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMovements);
  }
};
