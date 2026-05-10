let rawClicks = 0;
let actualExecutions = 0;

const rawDisplay = document.getElementById('raw-count');
const actualDisplay = document.getElementById('fire-count');
const logDisplay = document.getElementById('log-panel');
const btn = document.getElementById('spam-btn');

// 1. THE CORE LOGIC: Standard Flag-Based Throttle Closure
const throttle = (fn, limit) => {
    let isWaiting = false; // Locks the gate until cooldown passes

    return (...args) => {
        // If locked, ignore user intent completely
        if (isWaiting) return; 

        // 1. Execute immediate first call
        fn(...args); 
        isWaiting = true; // Lock immediately

        // 2. Release lock after the specified timeframe
        setTimeout(() => {
            isWaiting = false;
        }, limit);
    };
};

// The protected logical action we wish to limit
const processClickAction = () => {
    actualExecutions++;
    actualDisplay.innerText = actualExecutions;
    
    // Visual pulse indicator
    logDisplay.innerText = "🔥 EXECUTION TRIGGERED!";
    logDisplay.classList.add('triggered');

    setTimeout(() => {
        logDisplay.innerText = "Cooling down...";
        logDisplay.classList.remove('triggered');
    }, 500);
};

// Wrap it securely
const securedHandler = throttle(processClickAction, 1500);

// Direct raw button listener
btn.addEventListener('click', () => {
    rawClicks++;
    rawDisplay.innerText = rawClicks;
    
    // Feed intent to the secure throttler
    securedHandler();
});
