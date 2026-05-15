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
    
    list.appendChild(li);
    input.value = ''; // Clear
    input.focus();
};

// 🎯 Master Event Delegation: Handles deletion and scalable click operations
list.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.del-btn');
    if (delBtn) {
        delBtn.closest('.todo-item').remove();
    }
});

// Bind Button Click
addBtn.addEventListener('click', addTask);

// Bind "Enter" key press
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
