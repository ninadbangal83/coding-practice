import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="react-card">
      <h2>React State Counter</h2>
      <div className="counter-display">{count}</div>
      <div className="counter-controls">
        <button className="btn-react" onClick={() => setCount(count - 1)}>Decrement</button>
        <button className="btn-react reset" onClick={() => setCount(0)}>Reset</button>
        <button className="btn-react" onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default Counter;
