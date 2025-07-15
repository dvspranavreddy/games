const boardContainer = document.getElementById("sudokuBoard");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");

let fullSolution = [];
let puzzle = [];
let incorrectCount = 0;

function generateCompleteSudoku() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function isSafe(row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[startRow + i][startCol + j] === num) return false;

    return true;
  }

  function fillBoard(pos = 0) {
    if (pos === 81) return true;

    const row = Math.floor(pos / 9);
    const col = pos % 9;

    const nums = [...Array(9).keys()].map(x => x + 1).sort(() => Math.random() - 0.5);
    for (const num of nums) {
      if (isSafe(row, col, num)) {
        board[row][col] = num;
        if (fillBoard(pos + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  fillBoard();
  return board;
}

function generatePuzzle(fullBoard) {
  const puzzle = fullBoard.map(row => row.slice());
  let attempts = 41;

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      attempts--;
    }
  }

  return puzzle;
}

function renderBoard(puzzle, solution, highlight = {}) {
  boardContainer.innerHTML = "";
  boardContainer.classList.add("sudoku-grid");

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("input");
      cell.setAttribute("type", "text");
      cell.setAttribute("maxlength", 1);
      cell.classList.add("sudoku-cell");

      const val = puzzle[row][col];
      if (val !== 0) {
        cell.value = val;
        cell.disabled = true;
        cell.classList.add("fixed");
      } else {
        const key = `${row}-${col}`;
        if (highlight[key]) {
          cell.classList.add(highlight[key] === "correct" ? "correct" : "incorrect");
          cell.value = highlight[key].val;
        }

        cell.addEventListener("input", () => {
          const userVal = parseInt(cell.value);
          const correctVal = solution[row][col];

          if (userVal === correctVal) {
            cell.classList.remove("incorrect");
            cell.classList.add("correct");
            puzzle[row][col] = userVal;
            saveGameState();
            checkWin();
          } else {
            cell.classList.remove("correct");
            cell.classList.add("incorrect");
            incorrectCount++;
            saveGameState();

            if (incorrectCount >= 3) {
              alert("Game Over: Too many incorrect attempts!");
              updateStats(false);
              localStorage.removeItem("sudokuState");
              restartGame();
            }
          }
        });
      }

      boardContainer.appendChild(cell);
    }
  }
}

function checkWin() {
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (puzzle[r][c] !== fullSolution[r][c]) return;

  resultText.textContent = "🎉 You solved the puzzle!";
  updateStats(true);
  localStorage.removeItem("sudokuState");
}

function updateStats(won) {
  const stats = JSON.parse(localStorage.getItem("sudokuStats") || "{}");
  stats.played = (stats.played || 0) + 1;
  if (won) stats.won = (stats.won || 0) + 1;
  localStorage.setItem("sudokuStats", JSON.stringify(stats));
}

function saveGameState() {
  const state = {
    puzzle,
    solution: fullSolution,
    incorrect: incorrectCount
  };
  localStorage.setItem("sudokuState", JSON.stringify(state));
}

function loadGameState() {
  const saved = JSON.parse(localStorage.getItem("sudokuState"));
  if (!saved) return false;
  puzzle = saved.puzzle;
  fullSolution = saved.solution;
  incorrectCount = saved.incorrect || 0;
  renderBoard(puzzle, fullSolution);
  return true;
}

function restartGame() {
  fullSolution = generateCompleteSudoku();
  puzzle = generatePuzzle(fullSolution);
  incorrectCount = 0;
  renderBoard(puzzle, fullSolution);
  saveGameState();
}

restartBtn.addEventListener("click", () => {
  localStorage.removeItem("sudokuState");
  restartGame();
});

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Start game
if (!loadGameState()) {
  restartGame();
}
