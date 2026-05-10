import React, { useState, useEffect } from 'react';
import './ModalPopup.css';

const ModalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Standard Interview Pattern: Lock body scrolling when modal loads
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <div className="react-card central-card">
      <h2>System Overlay Test</h2>
      <p className="sub-text">Testing conditional rendering & React Portals equivalent.</p>
      
      <button className="btn-launch" onClick={() => setIsOpen(true)}>
        Execute Modal
      </button>

      {isOpen && (
        <div className="react-modal-overlay" onClick={() => setIsOpen(false)}>
          {/* Stop propagation to prevent child clicks from closing modal */}
          <div className="react-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="r-modal-header">
              <h3>Confirmation Prompt</h3>
              <button className="btn-close-x" onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            <div className="r-modal-body">
              Are you sure you want to commit this React build to production branch?
            </div>
            <div className="r-modal-footer">
              <button className="btn-lite" onClick={() => setIsOpen(false)}>Cancel</button>
              <button className="btn-prime" onClick={() => setIsOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPopup;
