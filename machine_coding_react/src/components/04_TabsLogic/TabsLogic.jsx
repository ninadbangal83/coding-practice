import React, { useState } from 'react';
import './TabsLogic.css';

const TABS = [
  { id: 'html', label: 'HTML', content: 'The skeletal framework of your application defining data hierarchy.' },
  { id: 'css', label: 'CSS', content: 'Responsible for the aesthetic presentation layer and visual harmony.' },
  { id: 'js', label: 'JavaScript', content: 'Injects dynamic logical control mechanisms and interaction flow.' },
];

const TabsLogic = () => {
  const [activeId, setActiveId] = useState(TABS[0].id);

  return (
    <div className="react-card">
      <h2>Dynamic Tab System</h2>
      
      <div className="tabs-header">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeId === tab.id ? 'active' : ''}`}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-viewer">
        <p>{TABS.find(t => t.id === activeId).content}</p>
      </div>
    </div>
  );
};

export default TabsLogic;
