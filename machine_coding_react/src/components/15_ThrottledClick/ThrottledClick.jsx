import React, { useState, useRef } from 'react';
import './ThrottledClick.css';

const ThrottledClick = () => {
  const [rawCount, setRawCount] = useState(0);
  const [fireCount, setFireCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Utilize Ref to store true lock state so we don't rely purely on async render cycle for gatekeeper
  const isLockedRef = useRef(false);

  const handleAttempt = () => {
    setRawCount(prev => prev + 1);

    // GATEKEEPER CHECK
    if (isLockedRef.current) return; 

    // EXECUTE & LOCK
    setFireCount(prev => prev + 1);
    setIsActive(true);
    isLockedRef.current = true;

    // RELEASE LOCK DELAY
    setTimeout(() => {
      setIsActive(false);
      isLockedRef.current = false;
    }, 1500);
  };

  return (
    <div className="react-card">
      <h2>React Throttle Lock</h2>
      <p className="sub-meta">Synchronizing mutable state refs to maintain perfect execution gates regardless of click speed.</p>
      
      <button className="throttle-master-btn" onClick={handleAttempt}>
        SPAM BUTTON ⚡
      </button>

      <div className="throttled-stats-grid">
        <div className="t-stat">
          <span>Intended Clicks</span>
          <strong>{rawCount}</strong>
        </div>
        <div className="t-stat highlight">
          <span>Allowed Actions</span>
          <strong>{fireCount}</strong>
        </div>
      </div>

      <div className={`throttle-monitor ${isActive ? 'active' : ''}`}>
        {isActive ? '🔥 GATE LOCKED & FIRING...' : 'Ready for next pulse...'}
      </div>
    </div>
  );
};

export default ThrottledClick;
