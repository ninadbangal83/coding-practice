let totalSeconds = 0;
let timerInterval = null;
const display = document.getElementById('display');

const formatTime = (total) => {
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
};

document.getElementById('start-btn').addEventListener('click', () => {
    if (timerInterval) return; // Prevent interval spamming
    
    timerInterval = setInterval(() => {
        totalSeconds++;
        display.innerText = formatTime(totalSeconds);
    }, 1000);
});

document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    display.innerText = "00:00:00";
});
