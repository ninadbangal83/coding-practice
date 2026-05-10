import React, { useState } from 'react';
import './DragAndDrop.css';

const INITIAL_TASKS = [
  { id: 1, text: 'Design System Audit', status: 'todo' },
  { id: 2, text: 'Code React Component', status: 'todo' },
  { id: 3, text: 'Merge Main Branch', status: 'todo' },
];

const DragAndDrop = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedId, setDraggedId] = useState(null);

  const onDragStart = (id) => {
    setDraggedId(id);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // Crucial to allow dropping
  };

  const onDrop = (targetStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === draggedId ? { ...task, status: targetStatus } : task
      )
    );
    setDraggedId(null);
  };

  const renderColumn = (status, title) => {
    const columnTasks = tasks.filter(t => t.status === status);

    return (
      <div 
        className="board-col"
        onDragOver={onDragOver}
        onDrop={() => onDrop(status)}
      >
        <h4 className="col-title">{title} ({columnTasks.length})</h4>
        <div className="col-body">
          {columnTasks.map(task => (
            <div 
              key={task.id} 
              className="drag-item" 
              draggable 
              onDragStart={() => onDragStart(task.id)}
            >
              {task.text}
            </div>
          ))}
          {columnTasks.length === 0 && <div className="drop-hint">Drop Here</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="react-card wide-card">
      <h2>React Kanban Board</h2>
      <p className="sub-text">Draggable list using native HTML5 integrated state hooks.</p>
      
      <div className="kanban-board">
        {renderColumn('todo', 'To Do')}
        {renderColumn('done', 'Completed')}
      </div>
    </div>
  );
};

export default DragAndDrop;
