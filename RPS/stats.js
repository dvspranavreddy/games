document.addEventListener("DOMContentLoaded", () => {
  const stats = JSON.parse(localStorage.getItem("rpsStats")) || {
    playerScore: 0,
    computerScore: 0,
    totalGames: 0,
    tieCount: 0,
  };

  const { playerScore, computerScore, totalGames, tieCount } = stats;

  const winPercent = totalGames === 0 ? 0 : Math.round((playerScore / totalGames) * 100);
  const lossPercent = totalGames === 0 ? 0 : Math.round((computerScore / totalGames) * 100);
  const tiePercent = totalGames === 0 ? 0 : Math.round((tieCount / totalGames) * 100);

  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("winPercentage").textContent = winPercent;
  document.getElementById("lossPercentage").textContent = lossPercent;
  document.getElementById("tiePercentage").textContent = tiePercent;

  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem("rpsStats");
    location.reload();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

