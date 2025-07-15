document.addEventListener("DOMContentLoaded", () => {
  const newGameBtn = document.getElementById("newGameBtn");
  const continueBtn = document.getElementById("continueBtn");
  const backBtn = document.getElementById("backBtn");
  const howToPlayBtn = document.getElementById("howToPlayBtn");
  const statsBtn = document.getElementById("statsBtn");
  const modalContainer = document.getElementById("modalContainer");

  fetch("modals.html")
    .then(res => res.text())
    .then(html => {
      modalContainer.innerHTML = html;
      setupModals();
    });

  function setupModals() {
    const confirmModal = document.getElementById("confirmModal");
    const settingsModal = document.getElementById("settingsModal");
    const startGameBtn = document.getElementById("startGameBtn");

    const themeSelect = document.getElementById("themeSelect");
    const gridSizeSelect = document.getElementById("gridSizeSelect");

    document.getElementById("resumeGameBtn").addEventListener("click", () => {
      confirmModal.classList.add("hidden");
      window.location.href = "game.html";
    });

    document.getElementById("startNewBtn").addEventListener("click", () => {
      confirmModal.classList.add("hidden");
      settingsModal.classList.remove("hidden");
    });

    startGameBtn.addEventListener("click", () => {
      const settings = {
        theme: themeSelect.value,
        gridSize: parseInt(gridSizeSelect.value)
      };
      localStorage.setItem("mmSettings", JSON.stringify(settings));
      localStorage.removeItem("mmState");
      window.location.href = "game.html";
    });

    document.querySelectorAll(".cancelBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        confirmModal.classList.add("hidden");
        settingsModal.classList.add("hidden");
      });
    });

    newGameBtn.addEventListener("click", () => {
      const state = localStorage.getItem("mmState");
      if (state) {
        confirmModal.classList.remove("hidden");
      } else {
        settingsModal.classList.remove("hidden");
      }
    });

    continueBtn.addEventListener("click", () => {
      const state = localStorage.getItem("mmState");
      if (state) {
        window.location.href = "game.html";
      } else {
        alert("No saved game found.");
      }
    });
  }

  backBtn.addEventListener("click", () => {
    location.href = "../index.html";
  });

  howToPlayBtn.addEventListener("click", () => {
    location.href = "howtoplay.html";
  });

  statsBtn.addEventListener("click", () => {
    location.href = "stats.html";
  });
});
