// Mock Database of 25 records
const dataSet = Array.from({ length: 25 }, (_, i) => `Product Catalog #${i + 1}`);

let currentPage = 1;
const itemsPerPage = 4;
const totalPages = Math.ceil(dataSet.length / itemsPerPage);

const grid = document.getElementById('items-view');
const label = document.getElementById('page-label');
const btnPrev = document.getElementById('prev-btn');
const btnNext = document.getElementById('next-btn');

const updateUI = () => {
    grid.innerHTML = ''; // Wipe screen
    
    // Logic: Determine logical boundaries based on zero-based math
    const startIndex = (currentPage - 1) * itemsPerPage;
    const batch = dataSet.slice(startIndex, startIndex + itemsPerPage);

    batch.forEach(name => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = name;
        grid.appendChild(div);
    });

    // Update text indicator
    label.innerText = `Page ${currentPage} of ${totalPages}`;

    // Lock/Unlock boundary button access
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
};

btnPrev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateUI();
    }
});

btnNext.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updateUI();
    }
});

// Ingest first load
updateUI();
