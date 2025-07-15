document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");
  const backBtn = document.getElementById("backBtn");

  const paddleHeight = 50, paddleWidth = 10;
  let playerY = canvas.height / 2 - paddleHeight / 2;
  let computerY = canvas.height / 2 - paddleHeight / 2;

  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballRadius = 7;
  let ballSpeedX = 4;
  let ballSpeedY = 2;

  let playerScore = 0, computerScore = 0;

  function saveGame() {
    const state = {
      playerY, computerY,
      ballX, ballY,
      ballSpeedX, ballSpeedY,
      playerScore, computerScore
    };
    localStorage.setItem("pongGameState", JSON.stringify(state));
  }

  function loadGame() {
    const saved = JSON.parse(localStorage.getItem("pongGameState"));
    if (saved) {
      playerY = saved.playerY;
      computerY = saved.computerY;
      ballX = saved.ballX;
      ballY = saved.ballY;
      ballSpeedX = saved.ballSpeedX;
      ballSpeedY = saved.ballSpeedY;
      playerScore = saved.playerScore;
      computerScore = saved.computerScore;
    }
  }

  document.addEventListener("keydown", e => {
    if (e.key === "w" || e.key === "W") playerY -= 20;
    if (e.key === "s" || e.key === "S") playerY += 20;
  });

  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
      drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
    }
  }

  function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(text, x, y);
  }

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 2;
    saveGame(); // Save after reset
  }

  function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
      ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < paddleWidth) {
      if (ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
      } else {
        computerScore++;
        resetBall();
      }
    }

    if (ballX + ballRadius > canvas.width - paddleWidth) {
      if (ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
      } else {
        playerScore++;
        resetBall();
      }
    }

    computerY += ((ballY - (computerY + paddleHeight / 2))) * 0.05;

    saveGame(); // Save after update
  }

  function render() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawNet();
    drawText(playerScore, canvas.width / 4, 20);
    drawText(computerScore, 3 * canvas.width / 4, 20);
    drawRect(0, playerY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, "white");
    drawCircle(ballX, ballY, ballRadius, "white");
  }

  function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  backBtn.addEventListener("click", () => {
    saveGame();
    window.location.href = "index.html";
  });

  loadGame(); // Load saved position if exists
  gameLoop();
});
