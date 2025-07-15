let playerScore = 0;
let computerScore = 0;
let totalGames = 0;
let tieCount = 0;
let autoplayInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("rock").addEventListener("click", () => play("rock"));
  document.getElementById("paper").addEventListener("click", () => play("paper"));
  document.getElementById("scissors").addEventListener("click", () => play("scissors"));

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.getElementById("autoplayBtn").addEventListener("click", toggleAutoplay);

  loadStats();
});

function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const resultText = document.getElementById("resultText");

  let result = "";

  if (playerChoice === computerChoice) {
    result = "🤝 It's a tie!";
    tieCount++;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "🎉 You win!";
    playerScore++;
    document.getElementById("winSound").play();
  } else {
    result = "💥 You lose!";
    computerScore++;
    document.getElementById("loseSound").play();
  }

  totalGames++;
  resultText.textContent = `You: ${emoji(playerChoice)} | Computer: ${emoji(computerChoice)} — ${result}`;
  saveStats();
  updateStats();
}

function emoji(choice) {
  return choice === "rock" ? "✊" : choice === "paper" ? "🖐" : "✌";
}

function updateStats() {
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
  const winPercent = totalGames === 0 ? 0 : Math.round((playerScore / totalGames) * 100);
  const lossPercent = totalGames === 0 ? 0 : Math.round((computerScore / totalGames) * 100);
  const tiePercent = totalGames === 0 ? 0 : Math.round((tieCount / totalGames) * 100);
  document.getElementById("winPercentage").textContent = winPercent;
  localStorage.setItem("rpsStats", JSON.stringify({ playerScore, computerScore, totalGames, tieCount }));
}

function saveStats() {
  localStorage.setItem("rpsStats", JSON.stringify({ playerScore, computerScore, totalGames }));
}

function loadStats() {
  const stats = JSON.parse(localStorage.getItem("rpsStats"));
  if (stats) {
    playerScore = stats.playerScore;
    computerScore = stats.computerScore;
    totalGames = stats.totalGames;
    tieCount = stats.tieCount || 0;
    updateStats();
  }
}

function toggleAutoplay() {
  const btn = document.getElementById("autoplayBtn");

  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    btn.textContent = "Start Autoplay";
  } else {
    autoplayInterval = setInterval(() => {
      const moves = ["rock", "paper", "scissors"];
      const randomMove = moves[Math.floor(Math.random() * 3)];
      play(randomMove);
    }, 1000);
    btn.textContent = "Stop Autoplay";
  }
}
