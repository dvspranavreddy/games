document.addEventListener("DOMContentLoaded", () => {
  const rollBtn = document.getElementById("rollBtn");
  const diceImg = document.getElementById("diceImg");
  const resultText = document.getElementById("resultText");
  const backBtn = document.getElementById("backBtn");

  rollBtn.addEventListener("click", () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `images/dice-${roll}.png`;
    resultText.textContent = `You rolled a ${roll}!`;

    let total = parseInt(localStorage.getItem("diceTotal") || 0);
    let highest = parseInt(localStorage.getItem("diceHigh") || 0);

    total++;
    if (roll > highest) highest = roll;

    localStorage.setItem("diceTotal", total);
    localStorage.setItem("diceHigh", highest);
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
