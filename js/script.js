window.onload = function () {
  let shootSoundArr = [];
  let secretModeIsActivated = false;

  document.getElementById("start-button").addEventListener("click", () => {
    startGame();
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    secretModeIsActivated = false;
    game.restart();
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();

    function handleMouseMovements(event) {
      game.player.left = event.clientX;
      game.player.top = event.clientY;
    }

    function handleKeydown(event) {
      if (event.code == "KeyR") {
        secretModeIsActivated = true;
        game.player.element.src = "./images/secret-player.png";
        game.player.element.style.width = "129px";
        game.player.element.style.height = "174px";
      }
    }

    window.addEventListener("mousemove", handleMouseMovements);
    window.addEventListener("keydown", handleKeydown);
    document.getElementById("game-screen").addEventListener("click", () => {
      shoot();
    });
  }

  function shoot() {
    if (secretModeIsActivated) {
      let projectile = new Projectile("./images/secret-projectile.png");
      projectile.element.style.width = `69px`;
      projectile.element.style.height = `25px`;
      projectile.left = game.player.left + 65;
      projectile.top = game.player.top + 133;
      game.projectiles.push(projectile);
    } else {
      let projectile = new Projectile("./images/projectile.png");
      game.projectiles.push(projectile);
    }

    shootSoundArr.push(new Audio("/sounds/shoot.wav"));
    shootSoundArr[shootSoundArr.length - 1].volume = 0.1;
    shootSoundArr[shootSoundArr.length - 1].play();
    setTimeout(() => {
      shootSoundArr.splice(0, 1);
    }, 3000);
  }
};
