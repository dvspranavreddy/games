document.addEventListener("DOMContentLoaded", () => {
  const highScoreEl = document.getElementById("highScore");
  const bestTileEl = document.getElementById("bestTile");
  const resetBtn = document.getElementById("resetStatsBtn");

  const stats = JSON.parse(localStorage.getItem("2048Stats") || "{}");

  highScoreEl.textContent = stats.highScore || 0;
  bestTileEl.textContent = stats.bestTile || 0;

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("2048Stats");
    highScoreEl.textContent = "0";
    bestTileEl.textContent = "0";
  });
});
