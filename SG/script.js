document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("score");
  const highScoreEl = document.getElementById("highScore");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");

  const gridSize = 20;
  const canvasSize = 400;
  let snake = [{ x: 200, y: 200 }];
  let food = getRandomPosition();
  let dx = gridSize;
  let dy = 0;
  let score = 0;
  let highScore = localStorage.getItem("snakeHighScore") || 0;
  let gameInterval;

  highScoreEl.textContent = highScore;

  function getRandomPosition() {
    return {
      x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
  }

  function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(part => {
      ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      food = getRandomPosition();
    } else {
      snake.pop();
    }
  }

  function isGameOver() {
    const head = snake[0];
    if (
      head.x < 0 || head.y < 0 ||
      head.x >= canvasSize || head.y >= canvasSize ||
      snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
      clearInterval(gameInterval);
      if (score > highScore) {
        localStorage.setItem("snakeHighScore", score);
        highScoreEl.textContent = score;
      }
    }
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawFood();
    moveSnake();
    drawSnake();
    isGameOver();
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dy === 0) {
      dx = 0; dy = -gridSize;
    } else if (e.key === "ArrowDown" && dy === 0) {
      dx = 0; dy = gridSize;
    } else if (e.key === "ArrowLeft" && dx === 0) {
      dx = -gridSize; dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
      dx = gridSize; dy = 0;
    }
  });

  restartBtn.addEventListener("click", () => {
    score = 0;
    snake = [{ x: 200, y: 200 }];
    dx = gridSize;
    dy = 0;
    food = getRandomPosition();
    scoreEl.textContent = score;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  gameInterval = setInterval(gameLoop, 100);
});