const container = document.getElementById('star-box');
const stars = document.querySelectorAll('.star');
const display = document.getElementById('log-text');

let currentPermanentRating = 0;

const updateStarsVisual = (score, category = 'locked') => {
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-rank'));
        
        if (category === 'locked') star.classList.remove('locked');
        star.classList.remove('hovered');

        if (val <= score) {
            star.classList.add(category);
        }
    });
};

// 1. HOVER LOGIC (ENTER)
container.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('star')) return;
    const hoverScore = parseInt(e.target.getAttribute('data-rank'));
    updateStarsVisual(hoverScore, 'hovered');
});

// 2. HOVER LOGIC (LEAVE)
container.addEventListener('mouseout', () => {
    stars.forEach(s => s.classList.remove('hovered'));
});

// 3. CLICK LOGIC (LOCK SELECTION)
container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('star')) return;
    currentPermanentRating = parseInt(e.target.getAttribute('data-rank'));
    updateStarsVisual(currentPermanentRating, 'locked');
    display.innerText = `You gave this ${currentPermanentRating} Stars! 🎉`;
});
