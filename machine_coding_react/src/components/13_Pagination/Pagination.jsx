import React, { useState, useMemo } from 'react';
import './Pagination.css';

// Generate dummy records sequence for testing
const MASTER_LIST = Array.from({ length: 25 }, (_, i) => `Database Record Item #${i + 1}`);
const PAGE_SIZE = 6;

const Pagination = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(MASTER_LIST.length / PAGE_SIZE);

  // Calculate sliced derived list automatically
  const currentSlice = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return MASTER_LIST.slice(startIndex, startIndex + PAGE_SIZE);
  }, [page]);

  return (
    <div className="react-card">
      <h2>Paginated Table Set</h2>
      <p className="sub-meta">Dynamic dataset subset calculation using derived state slice mapping.</p>
      
      <div className="record-box">
        {currentSlice.map(item => (
          <div key={item} className="record-entry">{item}</div>
        ))}
      </div>

      <div className="pagination-control-bar">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(p => p - 1)}
          className="pg-ctrl"
        >
          &larr; Prev
        </button>

        <div className="page-status">
          PAGE <strong>{page}</strong> OF {totalPages}
        </div>

        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(p => p + 1)}
          className="pg-ctrl"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
