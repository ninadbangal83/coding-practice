const overlay = document.getElementById('overlay');
const trigger = document.getElementById('trigger-btn');
const closeIcon = document.getElementById('close-icon');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');

const openModal = () => {
    overlay.classList.add('visible');
    // Bonus Interview Point: Prevent background scrolling while open
    document.body.style.overflow = 'hidden'; 
};

const closeModal = () => {
    overlay.classList.remove('visible');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
};

// Fire action on primary trigger
trigger.addEventListener('click', openModal);

// Bind direct close actions
[closeIcon, cancelBtn, confirmBtn].forEach(el => {
    el.addEventListener('click', closeModal);
});

// 💡 CRITICAL INTERVIEW CONCEPT: "Click Outside to Close"
// Ensure that clicks directly targeting the grey overlay close it, 
// but clicks inside the modal-box do not close it.
overlay.addEventListener('click', (e) => {
    // Compare target vs currentTarget to isolate clicks strictly outside the modal
    if (e.target === overlay) {
        closeModal();
    }
});
