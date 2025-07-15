document.addEventListener("DOMContentLoaded", () => {
  const boardEl = document.getElementById("gameBoard");
  const resultText = document.getElementById("resultText");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");

  let settings = JSON.parse(localStorage.getItem("tttSettings")) || {
    symbol: "X",
    difficulty: "easy",
    gridSize: 3
  };

  const playerSymbol = settings.symbol;
  const computerSymbol = playerSymbol === "X" ? "O" : "X";
  const size = settings.gridSize;
  let board = Array(size * size).fill("");
  let currentPlayer = "X";
  let gameActive = true;

  function renderBoard() {
    boardEl.innerHTML = "";
    boardEl.style.setProperty("--grid-size", size);
    boardEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.forEach((cell, index) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.index = index;
      div.textContent = cell;
      boardEl.appendChild(div);
    });
  }

  function saveState() {
    localStorage.setItem("tttState", JSON.stringify({ board, currentPlayer, settings }));
  }

  function loadState() {
    const state = JSON.parse(localStorage.getItem("tttState"));
    if (state && state.settings.gridSize === size) {
      board = state.board;
      currentPlayer = state.currentPlayer;
    }
  }

  function checkWin(symbol) {
    const winLines = [];

    for (let i = 0; i < size; i++) {
      winLines.push([...Array(size)].map((_, j) => i * size + j)); // rows
      winLines.push([...Array(size)].map((_, j) => j * size + i)); // columns
    }

    winLines.push([...Array(size)].map((_, i) => i * size + i)); // diagonal
    winLines.push([...Array(size)].map((_, i) => (i + 1) * (size - 1))); // anti-diagonal

    return winLines.some(line => line.every(index => board[index] === symbol));
  }

  function checkTie() {
    return board.every(cell => cell !== "");
  }

  function handleMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    renderBoard();
    saveState();

    if (checkWin(currentPlayer)) {
      resultText.textContent =
        currentPlayer === playerSymbol ? "🎉 You win!" : "💻 Computer wins!";
      updateStats(currentPlayer === playerSymbol ? "win" : "loss");
      localStorage.removeItem("tttState");
      gameActive = false;
      return;
    }

    if (checkTie()) {
      resultText.textContent = "It's a tie!";
      updateStats("tie");
      localStorage.removeItem("tttState");
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    resultText.textContent = currentPlayer === playerSymbol ? "Your turn!" : "Computer's turn";

    if (currentPlayer === computerSymbol) {
      setTimeout(computerMove, 500);
    }
  }

  function computerMove() {
    let available = board.map((v, i) => (v === "" ? i : null)).filter(i => i !== null);
    let move;

    if (settings.difficulty === "easy") {
      move = available[Math.floor(Math.random() * available.length)];
    } else {
      move = minimax(board, computerSymbol).index;
    }

    handleMove(move);
  }

  function minimax(newBoard, player) {
    const availSpots = newBoard.map((v, i) => (v === "" ? i : null)).filter(i => i !== null);

    if (checkStaticWin(newBoard, playerSymbol)) return { score: -10 };
    if (checkStaticWin(newBoard, computerSymbol)) return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];

    for (let i of availSpots) {
      const move = {};
      move.index = i;
      newBoard[i] = player;

      const result = minimax(newBoard, player === computerSymbol ? playerSymbol : computerSymbol);
      move.score = result.score;

      newBoard[i] = "";
      moves.push(move);
    }

    let bestMove;
    if (player === computerSymbol) {
      let bestScore = -Infinity;
      for (let m of moves) {
        if (m.score > bestScore) {
          bestScore = m.score;
          bestMove = m;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let m of moves) {
        if (m.score < bestScore) {
          bestScore = m.score;
          bestMove = m;
        }
      }
    }

    return bestMove;
  }

  function checkStaticWin(bd, symbol) {
    const lines = [];

    for (let i = 0; i < size; i++) {
      lines.push([...Array(size)].map((_, j) => i * size + j));
      lines.push([...Array(size)].map((_, j) => j * size + i));
    }

    lines.push([...Array(size)].map((_, i) => i * size + i));
    lines.push([...Array(size)].map((_, i) => (i + 1) * (size - 1)));

    return lines.some(line => line.every(idx => bd[idx] === symbol));
  }

  function updateStats(result) {
    const stats = JSON.parse(localStorage.getItem("tttStats") || "{}");
    stats.wins = stats.wins || 0;
    stats.losses = stats.losses || 0;
    stats.ties = stats.ties || 0;

    if (result === "win") stats.wins++;
    if (result === "loss") stats.losses++;
    if (result === "tie") stats.ties++;

    localStorage.setItem("tttStats", JSON.stringify(stats));
  }

  boardEl.addEventListener("click", e => {
    if (e.target.classList.contains("cell")) {
      const index = parseInt(e.target.dataset.index);
      handleMove(index);
    }
  });

  restartBtn.addEventListener("click", () => {
    board = Array(size * size).fill("");
    currentPlayer = "X";
    gameActive = true;
    resultText.textContent = "Your turn!";
    renderBoard();
    saveState();
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  loadState();
  renderBoard();

  if (currentPlayer === computerSymbol) {
    resultText.textContent = "Computer's turn";
    setTimeout(computerMove, 500);
  } else {
    resultText.textContent = "Your turn!";
  }
});
