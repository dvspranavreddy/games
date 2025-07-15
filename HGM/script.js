document.addEventListener("DOMContentLoaded", () => {
  const wordList = ["apple", "banana", "orange", "grapes", "mango"];
  let selectedWord = "";
  let displayedWord = [];
  let wrongGuesses = 0;
  let maxWrong = 6;

  const wordDisplay = document.getElementById("wordDisplay");
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const restartBtn = document.getElementById("restartBtn");
  const message = document.getElementById("message");
  const wrongDisplay = document.getElementById("wrongGuesses");
  const backBtn = document.getElementById("backBtn");

  function pickWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    displayedWord = Array(selectedWord.length).fill("_");
    wrongGuesses = 0;
    message.textContent = "";
    updateDisplay();
    saveGameState();
  }

  function updateDisplay() {
    wordDisplay.textContent = displayedWord.join(" ");
    wrongDisplay.textContent = wrongGuesses;
  }

  function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    if (!guess.match(/[a-z]/i) || guess.length !== 1 || displayedWord.includes(guess)) return;

    let correct = false;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess && displayedWord[i] === "_") {
        displayedWord[i] = guess;
        correct = true;
      }
    }

    if (!correct) {
      wrongGuesses++;
    }

    updateDisplay();

    if (!displayedWord.includes("_")) {
      message.textContent = "🎉 You Won!";
      updateStats("win");
      localStorage.removeItem("hangmanGameState");
    } else if (wrongGuesses >= maxWrong) {
      message.textContent = `❌ You Lost! Word was: ${selectedWord}`;
      updateStats("loss");
      localStorage.removeItem("hangmanGameState");
    } else {
      saveGameState(); // still mid-game
    }
  }

  function updateStats(result) {
    let wins = parseInt(localStorage.getItem("hangmanWins") || 0);
    let losses = parseInt(localStorage.getItem("hangmanLosses") || 0);
    if (result === "win") wins++;
    else losses++;
    localStorage.setItem("hangmanWins", wins);
    localStorage.setItem("hangmanLosses", losses);
  }

  function saveGameState() {
    const state = {
      selectedWord,
      displayedWord,
      wrongGuesses
    };
    localStorage.setItem("hangmanGameState", JSON.stringify(state));
  }

  function loadGameState() {
    const saved = JSON.parse(localStorage.getItem("hangmanGameState"));
    if (saved) {
      selectedWord = saved.selectedWord;
      displayedWord = saved.displayedWord;
      wrongGuesses = saved.wrongGuesses;
      message.textContent = "";
      updateDisplay();
    } else {
      pickWord();
    }
  }

  guessBtn.addEventListener("click", checkGuess);
  restartBtn.addEventListener("click", () => {
    localStorage.removeItem("hangmanGameState");
    pickWord();
  });

  backBtn.addEventListener("click", () => {
    saveGameState();
    window.location.href = "index.html";
  });

  loadGameState();
});
