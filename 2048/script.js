document.addEventListener("DOMContentLoaded", () => {
  const boardEl = document.getElementById("gameBoard");
  const scoreEl = document.getElementById("score");
  const highScoreEl = document.getElementById("highScore");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");

  let board, score, gameOver;

  function init() {
    const saved = JSON.parse(localStorage.getItem("2048State"));
    if (saved) {
      board = saved.board;
      score = saved.score;
    } else {
      board = Array(16).fill(0);
      score = 0;
      addTile();
      addTile();
    }
    gameOver = false;
    render();
  }

  function addTile() {
    const empty = board.map((v, i) => (v === 0 ? i : null)).filter(i => i !== null);
    if (empty.length === 0) return;
    const idx = empty[Math.floor(Math.random() * empty.length)];
    board[idx] = Math.random() < 0.9 ? 2 : 4;
  }

  function render() {
    boardEl.innerHTML = "";
    board.forEach(value => {
      const div = document.createElement("div");
      div.className = `tile tile-${value}`;
      div.textContent = value > 0 ? value : "";
      boardEl.appendChild(div);
    });
    scoreEl.textContent = `Score: ${score}`;
    const best = Math.max(score, parseInt(localStorage.getItem("2048HighScore") || "0"));
    localStorage.setItem("2048HighScore", best);
    highScoreEl.textContent = `High Score: ${best}`;
    updateStats();
    saveState();
  }

  function saveState() {
    localStorage.setItem("2048State", JSON.stringify({ board, score }));
  }

  function updateStats() {
    const stats = JSON.parse(localStorage.getItem("2048Stats") || "{}");
    const maxTile = Math.max(...board);
    if (!stats.bestTile || maxTile > stats.bestTile) stats.bestTile = maxTile;
    if (!stats.highScore || score > stats.highScore) stats.highScore = score;
    localStorage.setItem("2048Stats", JSON.stringify(stats));
  }

  function move(dir) {
    const prev = [...board];
    const newBoard = Array(16).fill(0);
    let changed = false;
    let merged;

    const lines = {
      left: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]],
      right: [[3, 2, 1, 0], [7, 6, 5, 4], [11, 10, 9, 8], [15, 14, 13, 12]],
      up: [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]],
      down: [[12, 8, 4, 0], [13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3]]
    };

    for (let line of lines[dir]) {
      let values = line.map(i => board[i]).filter(v => v !== 0);
      merged = [];
      for (let i = 0; i < values.length - 1; i++) {
        if (values[i] === values[i + 1] && !merged.includes(i)) {
          values[i] *= 2;
          score += values[i];
          values.splice(i + 1, 1);
          merged.push(i);
        }
      }
      while (values.length < 4) values.push(0);
      line.forEach((idx, i) => newBoard[idx] = values[i]);
    }

    if (newBoard.some((v, i) => v !== board[i])) {
      board = newBoard;
      addTile();
      changed = true;
    }

    if (changed) {
      render();
      if (!canMove()) {
        gameOver = true;
        localStorage.removeItem("2048State");
        alert("Game Over!");
      }
    }
  }

  function canMove() {
    for (let i = 0; i < 16; i++) {
      if (board[i] === 0) return true;
      if (i % 4 < 3 && board[i] === board[i + 1]) return true;
      if (i < 12 && board[i] === board[i + 4]) return true;
    }
    return false;
  }

  document.addEventListener("keydown", e => {
    if (gameOver) return;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      const dir = e.key.replace("Arrow", "").toLowerCase();
      move(dir);
    }
  });

  restartBtn.addEventListener("click", () => {
    localStorage.removeItem("2048State");
    init();
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  init();
});
