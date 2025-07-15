document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("playBtn").addEventListener("click", () => {
    window.location.href = "game.html";
  });

  document.getElementById("continueBtn").addEventListener("click", () => {
    window.location.href = "game.html";
  });

  document.getElementById("howToPlayBtn").addEventListener("click", () => {
    window.location.href = "howtoplay.html";
  });

  document.getElementById("statsBtn").addEventListener("click", () => {
    window.location.href = "stats.html";
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
