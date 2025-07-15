document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");
  const message = document.getElementById("message");
  const attemptsEl = document.getElementById("attempts");

  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  function saveGame() {
    localStorage.setItem("guessGameState", JSON.stringify({
      secretNumber,
      attempts,
      message: message.textContent
    }));
  }

  function loadGame() {
    const saved = JSON.parse(localStorage.getItem("guessGameState"));
    if (saved) {
      secretNumber = saved.secretNumber;
      attempts = saved.attempts;
      message.textContent = saved.message;
      attemptsEl.textContent = attempts;
    } else {
      resetGame(); // Start fresh if nothing saved
    }
  }

  function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = "";
    message.textContent = "";
    attemptsEl.textContent = 0;
    localStorage.removeItem("guessGameState");
  }

  function updateStats() {
    const best = localStorage.getItem("guessBest");
    if (!best || attempts < parseInt(best)) {
      localStorage.setItem("guessBest", attempts);
    }
  }

  guessBtn.addEventListener("click", () => {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      message.textContent = "❌ Please enter a number between 1 and 100.";
      saveGame();
      return;
    }

    attempts++;
    attemptsEl.textContent = attempts;

    if (guess < secretNumber) {
      message.textContent = "📉 Too low!";
    } else if (guess > secretNumber) {
      message.textContent = "📈 Too high!";
    } else {
      message.textContent = `🎉 Correct! The number was ${secretNumber}.`;
      updateStats();
      localStorage.removeItem("guessGameState");
    }

    saveGame();
  });

  restartBtn.addEventListener("click", resetGame);

  backBtn.addEventListener("click", () => {
    saveGame();
    window.location.href = "index.html";
  });

  loadGame(); // Load previous game if it exists
});
