document.addEventListener("DOMContentLoaded", () => {
  const bestScoreEl = document.getElementById("bestScore");
  const resetBtn = document.getElementById("resetBtn");
  const backBtn = document.getElementById("backBtn");

  const bestScore = localStorage.getItem("guessBest");
  bestScoreEl.textContent = bestScore ? bestScore : "-";

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("guessBest");
    bestScoreEl.textContent = "-";
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
