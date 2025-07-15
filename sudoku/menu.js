document.addEventListener("DOMContentLoaded", () => {
  const modalContainer = document.getElementById("modalContainer");
  const newGameBtn = document.getElementById("newGameBtn");
  const continueBtn = document.getElementById("continueBtn");
  const howToPlayBtn = document.getElementById("howToPlayBtn");
  const statsBtn = document.getElementById("statsBtn");
  const backBtn = document.getElementById("backBtn");

  fetch("modals.html")
    .then(res => res.text())
    .then(html => {
      modalContainer.innerHTML = html;
      setupModals();
    });

  function setupModals() {
    const confirmModal = document.getElementById("confirmModal");

    document.getElementById("resumeGameBtn").addEventListener("click", () => {
      window.location.href = "game.html";
    });

    document.getElementById("startNewBtn").addEventListener("click", () => {
      localStorage.removeItem("sudokuState");
      window.location.href = "game.html";
    });

    document.querySelector(".cancelBtn").addEventListener("click", () => {
      confirmModal.classList.add("hidden");
    });

    newGameBtn.addEventListener("click", () => {
      const hasSave = localStorage.getItem("sudokuState");
      if (hasSave) {
        confirmModal.classList.remove("hidden");
      } else {
        window.location.href = "game.html";
      }
    });

    continueBtn.addEventListener("click", () => {
      if (localStorage.getItem("sudokuState")) {
        window.location.href = "game.html";
      } else {
        alert("No saved game to continue.");
      }
    });
  }

  howToPlayBtn.addEventListener("click", () => {
    window.location.href = "howtoplay.html";
  });

  statsBtn.addEventListener("click", () => {
    window.location.href = "stats.html";
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
