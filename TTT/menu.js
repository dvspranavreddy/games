document.addEventListener("DOMContentLoaded", () => {
  const newGameBtn = document.getElementById("newGameBtn");
  const continueBtn = document.getElementById("continueBtn");
  const howToPlayBtn = document.getElementById("howToPlayBtn");
  const statsBtn = document.getElementById("statsBtn");
  const backBtn = document.getElementById("backBtn");
  const modalContainer = document.getElementById("modalContainer");

  fetch("modals.html")
    .then(res => res.text())
    .then(html => {
      modalContainer.innerHTML = html;
      setupModals();
    });

  function setupModals() {
    const settingsModal = document.getElementById("settingsModal");
    const confirmModal = document.getElementById("confirmModal");
    const symbolSelect = document.getElementById("symbolSelect");
    const difficultySelect = document.getElementById("difficultySelect");
    const gridSizeSelect = document.getElementById("gridSizeSelect");

    document.getElementById("startGameBtn").addEventListener("click", () => {
      const settings = {
        symbol: symbolSelect.value,
        difficulty: difficultySelect.value,
        gridSize: parseInt(gridSizeSelect.value)
      };
      localStorage.setItem("tttSettings", JSON.stringify(settings));
      localStorage.removeItem("tttState");
      window.location.href = "game.html";
    });

    document.getElementById("cancelSettingsBtn").addEventListener("click", () => {
      settingsModal.classList.add("hidden");
    });

    document.getElementById("resumeGameBtn").addEventListener("click", () => {
      window.location.href = "game.html";
    });

    document.getElementById("startNewBtn").addEventListener("click", () => {
      confirmModal.classList.add("hidden");
      settingsModal.classList.remove("hidden");
    });

    document.querySelectorAll(".cancelBtn").forEach(btn =>
      btn.addEventListener("click", () => {
        confirmModal.classList.add("hidden");
        settingsModal.classList.add("hidden");
      })
    );

    newGameBtn.addEventListener("click", () => {
      const existingState = localStorage.getItem("tttState");
      if (existingState) {
        confirmModal.classList.remove("hidden");
      } else {
        settingsModal.classList.remove("hidden");
      }
    });

    continueBtn.addEventListener("click", () => {
      const state = localStorage.getItem("tttState");
      if (state) {
        window.location.href = "game.html";
      } else {
        alert("No unfinished game found.");
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
