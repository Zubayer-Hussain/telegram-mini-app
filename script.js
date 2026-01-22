let coins = 0;
let miningRate = 1;

// Auto-mining every second
setInterval(() => {
  coins += miningRate;
  document.getElementById("coins").innerText = coins;
}, 1000);

// Upgrade hamster
function upgradeHamster() {
  miningRate += 1;
  alert("Hamster upgraded! Mining rate: " + miningRate + " Xcoin/sec");
}
