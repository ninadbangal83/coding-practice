const data = ["Apple", "Apricot", "Banana", "Blueberry", "Blackberry", "Cherry", "Coconut", "Grape", "Lemon", "Lime", "Mango", "Orange", "Peach", "Watermelon"];
        
const searchInput = document.getElementById('search-box');
const resultsContainer = document.getElementById('results-container');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    resultsContainer.innerHTML = ''; 

    if (!query) return;

    const filtered = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('list-item');
        
        // Regex wrapper for highlighted text
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedText = item.replace(regex, `<span class="highlight">$1</span>`);
        
        div.innerHTML = highlightedText;
        resultsContainer.appendChild(div);
    });
});
