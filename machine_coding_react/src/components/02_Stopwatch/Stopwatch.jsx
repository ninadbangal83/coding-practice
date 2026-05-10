import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const handleStartPause = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIsRunning(true);
    } else {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    // Safety cleanup phase
    return () => clearInterval(timerRef.current);
  }, []);

  // Utility formatting math
  const formatTime = () => {
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const milliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="react-card">
      <h2>React Interval Timer</h2>
      <div className="timer-display font-mono">{formatTime()}</div>
      <div className="timer-controls">
        <button 
          onClick={handleStartPause} 
          className={`btn-timer ${isRunning ? 'pause' : 'start'}`}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button onClick={handleReset} className="btn-timer reset">RESET</button>
      </div>
    </div>
  );
};

export default Stopwatch;
