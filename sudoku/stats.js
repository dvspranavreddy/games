document.addEventListener("DOMContentLoaded", () => {
  const gamesPlayed = document.getElementById("gamesPlayed");
  const gamesWon = document.getElementById("gamesWon");
  const winPercent = document.getElementById("winPercent");
  const resetBtn = document.getElementById("resetStatsBtn");

  function loadStats() {
    const stats = JSON.parse(localStorage.getItem("sudokuStats") || "{}");
    const played = stats.played || 0;
    const won = stats.won || 0;
    gamesPlayed.textContent = played;
    gamesWon.textContent = won;
    winPercent.textContent = played > 0 ? Math.round((won / played) * 100) + "%" : "0%";
  }

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("sudokuStats");
    loadStats();
  });

  loadStats();
});
