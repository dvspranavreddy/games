document.addEventListener("DOMContentLoaded", () => {
  const bestMovesEl = document.getElementById("bestMoves");
  const resetBtn = document.getElementById("resetStatsBtn");

  function loadStats() {
    const stats = JSON.parse(localStorage.getItem("mmStats") || "{}");
    bestMovesEl.textContent = stats.bestMoves || "N/A";
  }

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("mmStats");
    loadStats();
  });

  loadStats();
});
