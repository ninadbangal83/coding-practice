// 1. Define image pool utilizing external stable IDs from Picsum
const imageSources = [
    "https://picsum.photos/id/237/400/250",
    "https://picsum.photos/id/10/400/250",
    "https://picsum.photos/id/20/400/250",
    "https://picsum.photos/id/30/400/250",
    "https://picsum.photos/id/40/400/250"
];

let currentIndex = 0;
const totalImages = imageSources.length;

const imgNode = document.getElementById('slider-img');
const dotsContainer = document.getElementById('dots-container');

// 2. Auto-Generate Pagination Dots at runtime based on count
imageSources.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => jumpToSlide(i));
    dotsContainer.appendChild(dot);
});

const allDots = document.querySelectorAll('.dot');

// 3. The Render/Update Engine
const updateSlide = () => {
    // Perform soft Fade animation via opacity toggle
    imgNode.style.opacity = '0.3';
    
    setTimeout(() => {
        imgNode.src = imageSources[currentIndex];
        imgNode.style.opacity = '1';

        // Update dots tracking
        allDots.forEach((d, i) => {
            d.classList.toggle('active', i === currentIndex);
        });
    }, 150);
};

const jumpToSlide = (idx) => {
    currentIndex = idx;
    updateSlide();
};

// 4. CORE MATH: Cycle wrap-around handlers
const handleNext = () => {
    // Interview optimization: Using modular math is considered "Senior style"
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlide();
};

const handlePrev = () => {
    // Advanced modulo addressing JS negative numbers quirk
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlide();
};

document.getElementById('go-next').addEventListener('click', handleNext);
document.getElementById('go-prev').addEventListener('click', handlePrev);

// 💡 Bonus Feature: Auto-rotate every 5 seconds
setInterval(handleNext, 5000);
