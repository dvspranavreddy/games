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
      setupModalEvents();
    });

  function setupModalEvents() {
    const confirmModal = document.getElementById("confirmModal");

    document.getElementById("resumeGameBtn").addEventListener("click", () => {
      window.location.href = "game.html";
    });

    document.getElementById("startNewBtn").addEventListener("click", () => {
      localStorage.removeItem("2048State");
      confirmModal.classList.add("hidden");
      window.location.href = "game.html";
    });

    document.querySelector(".cancelBtn").addEventListener("click", () => {
      confirmModal.classList.add("hidden");
    });

    newGameBtn.addEventListener("click", () => {
      if (localStorage.getItem("2048State")) {
        confirmModal.classList.remove("hidden");
      } else {
        window.location.href = "game.html";
      }
    });

    continueBtn.addEventListener("click", () => {
      if (localStorage.getItem("2048State")) {
        window.location.href = "game.html";
      } else {
        alert("No saved game found.");
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
