import React, { useState } from 'react';
import './Autocomplete.css';

const FRUITS = ["Apple", "Apricot", "Banana", "Blueberry", "Blackberry", "Cherry", "Grape", "Mango", "Peach"];

const Autocomplete = () => {
  const [val, setVal] = useState('');
  const [active, setActive] = useState(false);

  const matches = val.trim() 
    ? FRUITS.filter(f => f.toLowerCase().includes(val.toLowerCase().trim()))
    : [];

  // 💡 SENIOR PATTERN: Dynamically fracturing string into JSX sub-nodes for highlighting
  const renderHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={i} className="react-hl">{part}</mark> 
        : part
    );
  };

  return (
    <div className="react-card relative-card">
      <h2>Predictive Highlight</h2>
      <p className="sub-meta">Utilizes dynamic string fragmentation instead of dangerous innerHTML mappings.</p>
      
      <div className="search-field-box">
        <input 
          type="text" 
          placeholder="Type here (e.g. apple)"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setTimeout(() => setActive(false), 150)} // Buffer for selection click
          className="a-input"
        />

        {active && matches.length > 0 && (
          <ul className="results-float-list">
            {matches.map(item => (
              <li key={item} className="result-row" onClick={() => { setVal(item); setActive(false); }}>
                {renderHighlightedText(item, val)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
