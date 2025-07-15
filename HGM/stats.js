document.addEventListener("DOMContentLoaded", () => {
  const wins = document.getElementById("wins");
  const losses = document.getElementById("losses");
  const total = document.getElementById("total");
  const resetBtn = document.getElementById("resetBtn");
  const backBtn = document.getElementById("backBtn");

  let winCount = parseInt(localStorage.getItem("hangmanWins") || 0);
  let lossCount = parseInt(localStorage.getItem("hangmanLosses") || 0);

  wins.textContent = winCount;
  losses.textContent = lossCount;
  total.textContent = winCount + lossCount;

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("hangmanWins");
    localStorage.removeItem("hangmanLosses");
    wins.textContent = 0;
    losses.textContent = 0;
    total.textContent = 0;
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
