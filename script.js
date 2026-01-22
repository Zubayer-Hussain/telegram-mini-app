const tg = window.Telegram.WebApp;
const balanceEl = document.getElementById('balance');
const tapBtn = document.getElementById('tap-btn');

tg.expand();
tg.ready();

// 1. Load Balance and Tasks
let balance = parseInt(localStorage.getItem('xcoin_balance')) || 0;
let completedTasks = JSON.parse(localStorage.getItem('xcoin_completed_tasks')) || [];

balanceEl.innerText = balance.toLocaleString();
document.getElementById('username').innerText = tg.initDataUnsafe?.user?.first_name || "Zubayer";

// 2. Initialize Task Buttons
function initTasks() {
    if (completedTasks.includes('channel')) {
        const btn = document.getElementById('task-channel');
        btn.innerText = "Done";
        btn.style.background = "#28a745"; // Green
        btn.disabled = true;
    }
    if (completedTasks.includes('twitter')) {
        const btn = document.getElementById('task-twitter');
        btn.innerText = "Done";
        btn.style.background = "#28a745";
        btn.disabled = true;
    }
}
initTasks();

// 3. Tapping Logic
tapBtn.addEventListener('click', () => {
    balance += 1;
    updateBalance();
    tg.HapticFeedback.impactOccurred('medium');
});

// 4. Task Logic
function handleTask(taskId, link, reward) {
    if (completedTasks.includes(taskId)) return;

    // Open the social link
    tg.openLink(link);

    // Change button to "Claim" after they click
    const btn = document.getElementById(`task-${taskId}`);
    btn.innerText = "Claiming...";
    
    // In a real app, we'd check via API. For now, we reward them after 3 seconds.
    setTimeout(() => {
        balance += reward;
        updateBalance();
        
        completedTasks.push(taskId);
        localStorage.setItem('xcoin_completed_tasks', JSON.stringify(completedTasks));
        
        btn.innerText = "Done";
        btn.style.background = "#28a745";
        btn.disabled = true;
        
        tg.HapticFeedback.notificationOccurred('success');
        alert(`Success! You earned ${reward.toLocaleString()} X-Coins.`);
    }, 3000);
}

// 5. General Functions
function updateBalance() {
    balanceEl.innerText = balance.toLocaleString();
    localStorage.setItem('xcoin_balance', balance);
}

function showTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    btn.classList.add('active');
    tg.HapticFeedback.selectionChanged();
}

// Invite logic
document.getElementById('invite-btn').addEventListener('click', () => {
    const inviteLink = `https://t.me/xcoin999bot/app?startapp=${tg.initDataUnsafe?.user?.id || '123'}`;
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=Join%20X-Coin%20and%20start%20mining!`);
});
