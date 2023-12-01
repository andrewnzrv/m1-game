window.onload = function () {
  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();

    function handleMouseMovements(event) {
      //event.preventDefault();
      game.player.directionX = event.clientX;
      game.player.directionY = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMovements);

    console.log(game.player.directionX);
  }
};
