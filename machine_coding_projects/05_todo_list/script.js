const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

const addTask = () => {
    const val = input.value.trim();
    if (!val) return;

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${val}</span>
        <button class="del-btn">×</button>
    `;
    
    // Inline scope listener binding per element (efficient for small lists)
    li.querySelector('.del-btn').addEventListener('click', () => li.remove());

    list.appendChild(li);
    input.value = ''; // Clear
    input.focus();
};

// Bind Button Click
addBtn.addEventListener('click', addTask);

// Bind "Enter" key press
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
