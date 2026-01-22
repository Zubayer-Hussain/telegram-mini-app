const tg = window.Telegram.WebApp;
const balanceEl = document.getElementById('balance');
const tapBtn = document.getElementById('tap-btn');

// 1. Initialize Telegram App
tg.expand(); // Full screen mode
tg.ready();

// 2. Load Progress from LocalStorage
let balance = parseInt(localStorage.getItem('xcoin_balance')) || 0;
balanceEl.innerText = balance.toLocaleString();

// Display real Telegram name
document.getElementById('username').innerText = tg.initDataUnsafe?.user?.first_name || "Guest";

// 3. Tapping Logic
tapBtn.addEventListener('click', () => {
    balance += 1;
    balanceEl.innerText = balance.toLocaleString();
    
    // Save to local memory
    localStorage.setItem('xcoin_balance', balance);

    // Haptic Feedback (Vibrate phone)
    tg.HapticFeedback.impactOccurred('medium');
});

// 4. Tab Switching Logic
function showTab(tabId, btn) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    // Show selected tab
    document.getElementById(tabId).classList.add('active');

    // Update Nav Buttons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    btn.classList.add('active');

    tg.HapticFeedback.selectionChanged();
}

// 5. Invite Friends Logic (Simple Link Generation)
document.getElementById('invite-btn').addEventListener('click', () => {
    const userId = tg.initDataUnsafe?.user?.id || "user";
    const inviteLink = `https://t.me/XCoin_bot/app?startapp=${userId}`;
    
    // Copy to clipboard or use Telegram share
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=Join%20me%20on%20X-Coin!`);
});
