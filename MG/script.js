document.addEventListener("DOMContentLoaded", () => {
  const boardEl = document.getElementById("gameBoard");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");
  const moveCounter = document.getElementById("moveCounter");

  const emojiSets = {
    fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥝", "🍑", "🍊", "🍒", "🥭", "🍐", "🥥", "🫐", "🍋", "🫒", "🌽", "🥕", "🍅", "🧄", "🥔", "🍈", "🫑", "🧅", "🥬"],
    animals: ["🐶", "🐱", "🦊", "🐻", "🐼", "🐯", "🦁", "🐷", "🐸", "🐵", "🐧", "🐔", "🐦", "🐤", "🦆", "🦉", "🐮", "🐰", "🐭", "🐢", "🐍", "🐙", "🦄", "🐳", "🐬"],
    shapes: ["🔴", "🔵", "🟢", "🟡", "🟣", "🟠", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⬛", "⬜", "🔷", "🔶", "⭐", "✳️", "❇️", "❌", "⭕", "🔺", "🔻", "🆗", "🆕"]
  };

  let settings = JSON.parse(localStorage.getItem("mmSettings")) || { gridSize: 4, theme: "fruits" };
  let gridSize = settings.gridSize;
  let theme = settings.theme;
  let emojis = emojiSets[theme];
  let board = [];
  let flipped = [];
  let matched = [];
  let moves = 0;
  let lockBoard = false;

  function saveState() {
    const state = {
      board,
      flipped,
      matched,
      moves,
      settings
    };
    localStorage.setItem("mmState", JSON.stringify(state));
  }

  function loadState() {
    const state = JSON.parse(localStorage.getItem("mmState"));
    if (state && state.settings.gridSize === gridSize && state.settings.theme === theme) {
      board = state.board;
      flipped = state.flipped;
      matched = state.matched;
      moves = state.moves;
      return true;
    }
    return false;
  }

  function updateMoves() {
    moveCounter.textContent = `Moves: ${moves}`;
  }

  function generateBoard() {
    const pairCount = (gridSize * gridSize) / 2;
    const cards = shuffle([...emojis].slice(0, pairCount).flatMap(e => [e, e]));
    board = cards;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function renderBoard() {
    boardEl.innerHTML = "";
    boardEl.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    board.forEach((emoji, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      if (matched.includes(index) || flipped.includes(index)) {
        card.classList.add("flipped");
        card.textContent = emoji;
      } else {
        card.textContent = "";
      }
      card.dataset.index = index;
      boardEl.appendChild(card);
    });
  }

  function handleCardClick(index) {
    if (lockBoard || flipped.includes(index) || matched.includes(index)) return;

    flipped.push(index);
    renderBoard();

    if (flipped.length === 2) {
      moves++;
      updateMoves();
      lockBoard = true;

      const [i1, i2] = flipped;
      if (board[i1] === board[i2]) {
        matched.push(i1, i2);
        flipped = [];
        lockBoard = false;
        if (matched.length === board.length) {
          localStorage.removeItem("mmState");
          updateStats();
          setTimeout(() => {
            alert("🎉 You matched all cards!");
          }, 300);
        }
      } else {
        setTimeout(() => {
          flipped = [];
          renderBoard();
          lockBoard = false;
        }, 1000);
      }
    }

    saveState();
  }

  boardEl.addEventListener("click", e => {
    if (e.target.classList.contains("card")) {
      handleCardClick(parseInt(e.target.dataset.index));
    }
  });

  function updateStats() {
    const stats = JSON.parse(localStorage.getItem("mmStats") || "{}");
    if (!stats.bestMoves || moves < stats.bestMoves) {
      stats.bestMoves = moves;
      localStorage.setItem("mmStats", JSON.stringify(stats));
    }
  }

  restartBtn.addEventListener("click", () => {
    startNewGame();
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  function startNewGame() {
    matched = [];
    flipped = [];
    moves = 0;
    updateMoves();
    generateBoard();
    renderBoard();
    saveState();
  }

  const restored = loadState();
  if (restored) {
    updateMoves();
    renderBoard();
  } else {
    startNewGame();
  }
});
