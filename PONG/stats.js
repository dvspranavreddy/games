document.addEventListener("DOMContentLoaded", () => {
  const gamesPlayedEl = document.getElementById("gamesPlayed");
  const winsEl = document.getElementById("wins");
  const lossesEl = document.getElementById("losses");
  const resetBtn = document.getElementById("resetBtn");
  const backBtn = document.getElementById("backBtn");

  gamesPlayedEl.textContent = localStorage.getItem("pongGames") || 0;
  winsEl.textContent = localStorage.getItem("pongWins") || 0;
  lossesEl.textContent = localStorage.getItem("pongLosses") || 0;

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("pongGames");
    localStorage.removeItem("pongWins");
    localStorage.removeItem("pongLosses");

    gamesPlayedEl.textContent = "0";
    winsEl.textContent = "0";
    lossesEl.textContent = "0";
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
