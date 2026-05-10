import React, { useState, useEffect } from 'react';
import './DebouncedSearch.css';

const DebouncedSearch = () => {
  const [rawInput, setRawInput] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [logs, setLogs] = useState([]);

  // 🏆 THE ELITE REACT DEBOUNCE PATTERN: 
  // Utilizing useEffect dependency cleanup to natively overwrite timers
  useEffect(() => {
    if (!rawInput.trim()) return;

    // Set the execution payload
    const handler = setTimeout(() => {
      setDebouncedTerm(rawInput);
      
      // Log the execution for visual display
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [`[${time}] 📡 Network API Fired: "${rawInput}"`, ...prev.slice(0, 3)]);
    }, 600);

    // THE CLEANUP: Canceled instantly if dependency (rawInput) changes before 600ms!
    return () => clearTimeout(handler); 
  }, [rawInput]);

  return (
    <div className="react-card">
      <h2>React Custom Debounce</h2>
      <p className="sub-meta">Utilizing natural lifecycle side-effect cleanup overrides to simulate defensive network queries.</p>
      
      <input 
        type="text" 
        placeholder="Type quickly without stopping..."
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        className="db-input"
      />

      <div className="live-state-compare">
        <div className="comp-box">Instant State: <br/><strong>{rawInput || '—'}</strong></div>
        <div className="comp-box active">Debounced: <br/><strong>{debouncedTerm || '—'}</strong></div>
      </div>

      <div className="db-logs">
        {logs.length === 0 ? (
          <span className="ghost">Logs will appear when timer hits 600ms...</span>
        ) : (
          logs.map((entry, i) => <div key={i} className="db-log-row">{entry}</div>)
        )}
      </div>
    </div>
  );
};

export default DebouncedSearch;
