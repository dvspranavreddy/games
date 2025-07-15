document.addEventListener("DOMContentLoaded", () => {
  const highScoreEl = document.getElementById("highScore");
  const resetBtn = document.getElementById("resetBtn");
  const backBtn = document.getElementById("backBtn");

  const highScore = localStorage.getItem("snakeHighScore") || 0;
  highScoreEl.textContent = highScore;

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("snakeHighScore");
    highScoreEl.textContent = 0;
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
