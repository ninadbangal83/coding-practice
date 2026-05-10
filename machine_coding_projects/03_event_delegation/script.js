const container = document.getElementById('parent-container');
const logger = document.getElementById('event-log');

// The power of delegation: Instead of adding 4 individual event listeners,
// attach 1 listener to the root ancestor container!
container.addEventListener('click', (event) => {
    // .closest ensures that even if the user clicks an icon inside the button,
    // the code reliably resolves up to the button node bearing our target class.
    const buttonNode = event.target.closest('.action-btn');
    
    if (!buttonNode) return; // Stop execution if user clicked whitespace

    const buttonName = buttonNode.getAttribute('data-name');
    logger.innerText = `🎯 Master Listener Captured: "${buttonName}"`;
});
