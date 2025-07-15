document.addEventListener("DOMContentLoaded", () => {
  const totalRollsEl = document.getElementById("totalRolls");
  const highestRollEl = document.getElementById("highestRoll");
  const resetBtn = document.getElementById("resetBtn");
  const backBtn = document.getElementById("backBtn");

  let total = localStorage.getItem("diceTotal") || 0;
  let high = localStorage.getItem("diceHigh") || 0;

  totalRollsEl.textContent = total;
  highestRollEl.textContent = high;

  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("diceTotal");
    localStorage.removeItem("diceHigh");
    totalRollsEl.textContent = 0;
    highestRollEl.textContent = 0;
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
