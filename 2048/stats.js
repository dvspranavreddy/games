document.addEventListener("DOMContentLoaded", () => {
  const bestTileEl = document.getElementById("bestTile");
  const bestScoreEl = document.getElementById("bestScore");
  const resetBtn = document.getElementById("resetStatsBtn");

  function loadStats() {
    const stats = JSON.parse(localStorage.getItem("2048Stats") || "{}");
    bestTileEl.textContent = stats.bestTile || 0;
    bestScoreEl.textContent = stats.highScore || 0;
  }

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("2048Stats");
    loadStats();
  });

  loadStats();
});
