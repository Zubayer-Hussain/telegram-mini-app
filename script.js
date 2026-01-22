const tg = window.Telegram.WebApp;
const balanceDisplay = document.getElementById('coin-balance');
const tapBtn = document.getElementById('tap-btn');

// Load saved balance
let coins = 0;
function handleTap() {
    coins++;
    updateUI();
    // This tells Telegram to vibrate the phone
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
}

// Initialize Telegram
tg.expand();
document.getElementById('user-name').innerText = tg.initDataUnsafe?.user?.first_name || "Player";

tapBtn.addEventListener('click', () => {
    coins += 1;
    balanceDisplay.innerText = coins.toLocaleString();
    localStorage.setItem('xcoins', coins);

    // Mobile Vibrate
    tg.HapticFeedback.impactOccurred('medium');
});
