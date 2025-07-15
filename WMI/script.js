document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const scoreText = document.getElementById("score");
  const message = document.getElementById("message");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");

  let tiles = [];
  let score = 0;

  const colors = {
    "2": "#eee4da", "4": "#ede0c8", "8": "#f2b179", "16": "#f59563", "32": "#f67c5f",
    "64": "#f65e3b", "128": "#edcf72", "256": "#edcc61", "512": "#edc850", 
    "1024": "#edc53f", "2048": "#edc22e", "4096": "#3c3a32", "8192": "#1c1c1c"
  };

  function createBoard() {
    grid.innerHTML = "";
    tiles = [];
    for (let i = 0; i < 16; i++) {
      const div = document.createElement("div");
      div.classList.add("tile");
      grid.appendChild(div);
      tiles.push(div);
    }
    score = 0;
    updateScore();
    addNumber();
    addNumber();
    saveGame();
  }

  function addNumber() {
    const empty = tiles.filter(t => t.textContent === "");
    if (empty.length === 0) return;
    const rand = empty[Math.floor(Math.random() * empty.length)];
    rand.textContent = Math.random() < 0.9 ? "2" : "4";
    updateTileStyle();
  }

  function updateTileStyle() {
    tiles.forEach(tile => {
      const val = tile.textContent;
      tile.style.background = colors[val] || "#cdc1b4";
    });
  }

  function slide(row) {
    const filtered = row.filter(val => val !== "");
    const missing = Array(4 - filtered.length).fill("");
    return filtered.concat(missing);
  }

  function combine(row) {
    for (let i = 0; i < 3; i++) {
      if (row[i] && row[i] === row[i + 1]) {
        row[i] = (parseInt(row[i]) * 2).toString();
        score += parseInt(row[i]);
        row[i + 1] = "";
      }
    }
    return slide(row);
  }

  function move(direction) {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let line = [];
      for (let j = 0; j < 4; j++) {
        let idx = direction === "left" ? i * 4 + j :
                  direction === "right" ? i * 4 + (3 - j) :
                  direction === "up" ? j * 4 + i :
                  12 - j * 4 + i;
        line.push(tiles[idx].textContent);
      }

      let original = [...line];
      line = slide(line);
      line = combine(line);

      for (let j = 0; j < 4; j++) {
        let idx = direction === "left" ? i * 4 + j :
                  direction === "right" ? i * 4 + (3 - j) :
                  direction === "up" ? j * 4 + i :
                  12 - j * 4 + i;
        if (tiles[idx].textContent !== line[j]) moved = true;
        tiles[idx].textContent = line[j];
      }
    }

    if (moved) {
      addNumber();
      updateTileStyle();
      updateScore();
      saveGame();
      if (isGameOver()) {
        message.textContent = "❌ Game Over!";
        localStorage.removeItem("2048Game");
      }
    }
  }

  function updateScore() {
    scoreText.textContent = `Score: ${score}`;
    const best = parseInt(localStorage.getItem("2048Best") || 0);
    if (score > best) localStorage.setItem("2048Best", score);
  }

  function saveGame() {
    const data = tiles.map(t => t.textContent);
    localStorage.setItem("2048Game", JSON.stringify({ data, score }));
  }

  function loadGame() {
    const save = JSON.parse(localStorage.getItem("2048Game"));
    if (!save) return false;
    tiles.forEach((tile, i) => tile.textContent = save.data[i]);
    score = save.score;
    updateTileStyle();
    updateScore();
    return true;
  }

  function isGameOver() {
    for (let i = 0; i < 16; i++) {
      if (tiles[i].textContent === "") return false;
      const right = (i % 4 !== 3 && tiles[i].textContent === tiles[i + 1].textContent);
      const down = (i < 12 && tiles[i].textContent === tiles[i + 4].textContent);
      if (right || down) return false;
    }
    return true;
  }

  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "ArrowLeft": move("left"); break;
      case "ArrowRight": move("right"); break;
      case "ArrowUp": move("up"); break;
      case "ArrowDown": move("down"); break;
    }
  });

  restartBtn.addEventListener("click", () => {
    localStorage.removeItem("2048Game");
    createBoard();
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  createBoard();
  loadGame();
});
