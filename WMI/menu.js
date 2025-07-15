document.addEventListener("DOMContentLoaded", () => {
  const modalContainer = document.getElementById("modalContainer");

  fetch("modals.html")
    .then(res => res.text())
    .then(html => {
      modalContainer.innerHTML = html;
      setupModals();
    });

  function setupModals() {
    const confirmModal = document.getElementById("confirmModal");
    const resumeBtn = document.getElementById("resumeGameBtn");
    const startNewBtn = document.getElementById("startNewBtn");
    const cancelBtn = document.querySelector(".cancelBtn");

    document.getElementById("newGameBtn").addEventListener("click", () => {
      const saved = localStorage.getItem("2048Game");
      if (saved) {
        confirmModal.classList.remove("hidden");
      } else {
        startNewGame();
      }
    });

    resumeBtn.addEventListener("click", () => {
      window.location.href = "game.html";
    });

    startNewBtn.addEventListener("click", () => {
      localStorage.removeItem("2048Game");
      localStorage.removeItem("2048Score");
      window.location.href = "game.html";
    });

    cancelBtn.addEventListener("click", () => {
      confirmModal.classList.add("hidden");
    });

    document.getElementById("continueBtn").addEventListener("click", () => {
      if (localStorage.getItem("2048Game")) {
        window.location.href = "game.html";
      } else {
        alert("No saved game found.");
      }
    });
  }

  document.getElementById("howToPlayBtn").addEventListener("click", () => {
    window.location.href = "howtoplay.html";
  });

  document.getElementById("statsBtn").addEventListener("click", () => {
    window.location.href = "stats.html";
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  // Hide Continue if no saved game
  if (!localStorage.getItem("2048Game")) {
    document.getElementById("continueBtn").style.display = "none";
  }
});
