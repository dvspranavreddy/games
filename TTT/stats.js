document.addEventListener("DOMContentLoaded", () => {
  const winsEl = document.getElementById("wins");
  const lossesEl = document.getElementById("losses");
  const tiesEl = document.getElementById("ties");
  const winPercentEl = document.getElementById("winPercent");
  const resetBtn = document.getElementById("resetStatsBtn");
  const backBtn = document.getElementById("backBtn");

  function loadStats() {
    const stats = JSON.parse(localStorage.getItem("tttStats") || "{}");
    const wins = stats.wins || 0;
    const losses = stats.losses || 0;
    const ties = stats.ties || 0;
    const total = wins + losses + ties;
    const percent = total > 0 ? Math.round((wins / total) * 100) : 0;

    winsEl.textContent = wins;
    lossesEl.textContent = losses;
    tiesEl.textContent = ties;
    winPercentEl.textContent = `${percent}%`;
  }

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("tttStats");
    loadStats();
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  loadStats();
});
