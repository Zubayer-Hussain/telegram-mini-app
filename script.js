const tg = window.Telegram.WebApp;
const balanceDisplay = document.getElementById('coin-balance');
const tapBtn = document.getElementById('tap-btn');

// Load saved balance
let coins = parseInt(localStorage.getItem('xcoins')) || 0;
balanceDisplay.innerText = coins.toLocaleString();

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
