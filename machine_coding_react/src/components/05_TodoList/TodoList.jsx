import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setTasks([...tasks, { id: Date.now(), text: text.trim() }]);
    setText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="react-card">
      <h2>Task Management React</h2>
      
      <form className="input-group" onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="Enter a new mission..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-add">ADD</button>
      </form>

      <div className="todo-box">
        {tasks.length === 0 ? (
          <p className="empty-tasks">Zero pending tasks! Secure zone.</p>
        ) : (
          <ul className="todo-container">
            {tasks.map(task => (
              <li key={task.id} className="todo-row">
                <span>{task.text}</span>
                <button className="btn-del" onClick={() => deleteTask(task.id)}>&times;</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
