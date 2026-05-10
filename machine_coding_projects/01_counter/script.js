let count = 0;
const display = document.getElementById('count-display');

const updateDisplay = () => {
    display.innerText = count;
    // Quick color pop trick for visual dynamics
    display.style.color = count === 0 ? 'royalblue' : (count > 0 ? '#10b981' : '#ef4444');
};

document.getElementById('increment').addEventListener('click', () => {
    count++;
    updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
    count--;
    updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    updateDisplay();
});
