import React, { useState, useMemo } from 'react';
import './SearchFilter.css';

const TECH_STACK = ["React", "Vue", "Angular", "Svelte", "Solid", "Next.js", "Nuxt", "Qwik", "Redux", "GraphQL"];

const SearchFilter = () => {
  const [query, setQuery] = useState('');

  // 💡 SENIOR DESIGN PATTERN: Derived state (no need for secondary state array)
  // memoized for instant computational short-circuiting
  const filteredTech = useMemo(() => {
    return TECH_STACK.filter(item => 
      item.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [query]);

  return (
    <div className="react-card">
      <h2>Derived Filter Search</h2>
      <p className="sub-text">Utilizing useMemo computed selectors to derive final render data instead of storing extra state.</p>
      
      <div className="filter-input-wrap">
        <input 
          type="text" 
          placeholder="Filter technologies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="filter-box"
        />
      </div>

      <div className="filter-results-meta">
        Matches Found: <strong>{filteredTech.length}</strong>
      </div>

      <div className="grid-results">
        {filteredTech.length === 0 ? (
          <div className="zero-state">No items matched scan.</div>
        ) : (
          filteredTech.map(item => (
            <div key={item} className="grid-bubble">{item}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
