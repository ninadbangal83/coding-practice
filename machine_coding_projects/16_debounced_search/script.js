let keystrokes = 0;
let apiRequests = 0;

const inputNode = document.getElementById('search-box');
const keyBadge = document.getElementById('key-count');
const apiBadge = document.getElementById('api-count');
const logs = document.getElementById('api-logs');

// 1. The CORE INTERVIEW LOGIC: Standard Debounce Closure
const debounce = (callback, delayTime) => {
    let timerId = null;

    return (...args) => {
        // Wipe clear the previous scheduled task every single keystroke!
        clearTimeout(timerId); 
        
        // Re-schedule the final execution task 
        timerId = setTimeout(() => {
            callback(...args);
        }, delayTime);
    };
};

// 2. The dummy API function we want saved from spamming
const fetchResultsFromNetwork = (query) => {
    apiRequests++;
    apiBadge.innerText = apiRequests;

    const time = new Date().toLocaleTimeString();
    const logItem = document.createElement('div');
    logItem.innerHTML = `<span>[${time}]</span> 📡 Sent: <b>"${query}"</b>`;
    logs.prepend(logItem); // Add most recent at the very top
};

// 3. Wrap native function inside protected debounce wrapper
const processChange = debounce((value) => {
    fetchResultsFromNetwork(value);
}, 500); // 500ms buffer delay

// Listen for raw input stream
inputNode.addEventListener('input', (e) => {
    keystrokes++;
    keyBadge.innerText = keystrokes;

    const text = e.target.value.trim();
    if(!text) return;

    // Pass the baton to the debounced executor
    processChange(text);
});
