const database = [
    "Angular", "Backbone", "Ember", "Express", "GraphQL", "JQuery", "Laravel", 
    "NextJS", "NodeJS", "NuxtJS", "React", "Redux", "Svelte", "Tailwind", "TypeScript", "VueJS"
];

const input = document.getElementById('query');
const grid = document.getElementById('results-grid');
const meta = document.getElementById('count-label');

const render = (text = "") => {
    grid.innerHTML = ''; // Clear existing
    
    const matches = database.filter(tech => tech.toLowerCase().includes(text.toLowerCase()));
    
    matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'item-box';
        div.innerText = match;
        grid.appendChild(div);
    });

    meta.innerText = `${matches.length} Results Found`;
};

// Boot initial render
render();

// Input listener for live filtering
input.addEventListener('input', (e) => {
    render(e.target.value.trim());
});
