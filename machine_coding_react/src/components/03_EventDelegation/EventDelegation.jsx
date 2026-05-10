import React, { useState } from 'react';
import './EventDelegation.css';

const EventDelegation = () => {
  const [log, setLog] = useState([]);

  const handleGlobalClick = (e) => {
    // Identify which item emitted the bubble event
    const button = e.target.closest('button[data-id]');
    
    if (button) {
      const id = button.getAttribute('data-id');
      setLog(prev => [
        `🔥 Captured event from Action ID: ${id}`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  return (
    <div className="react-card">
      <h2>React Event Bubbling</h2>
      <p className="sub-meta">One single listener on the parent tracks all nested child triggers.</p>
      
      {/* SINGLE PARENT LISTENER */}
      <div className="parent-container" onClick={handleGlobalClick}>
        <button data-id="Alpha" className="action-chip">Action Alpha</button>
        <button data-id="Beta" className="action-chip">Action Beta</button>
        <button data-id="Gamma" className="action-chip">Action Gamma</button>
        <button data-id="Delta" className="action-chip">Action Delta</button>
      </div>

      <div className="log-viewer">
        {log.length === 0 ? (
          <span className="empty">Click any button above...</span>
        ) : (
          log.map((entry, i) => <div key={i} className="log-entry">{entry}</div>)
        )}
      </div>
    </div>
  );
};

export default EventDelegation;
