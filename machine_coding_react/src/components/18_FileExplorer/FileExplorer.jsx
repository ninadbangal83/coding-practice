import React, { useState } from 'react';
import './FileExplorer.css';

// 📂 HIGH DENSITY RECURSIVE DATASET
const FILE_SYSTEM = {
  name: "root",
  isFolder: true,
  children: [
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "components", isFolder: true, children: [
          { name: "Navbar.jsx", isFolder: false },
          { name: "Footer.css", isFolder: false }
        ]},
        { name: "App.jsx", isFolder: false },
        { name: "index.html", isFolder: false }
      ]
    },
    {
      name: "public",
      isFolder: true,
      children: [
        { name: "images", isFolder: true, children: [
            { name: "hero.png", isFolder: false }
        ]},
        { name: "favicon.ico", isFolder: false }
      ]
    },
    { name: "package.json", isFolder: false },
    { name: "README.md", isFolder: false }
  ]
};

// 🛸 RECURSIVE ENGINE COMPONENT
const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.isFolder && node.children && node.children.length > 0;

  return (
    <div className="node-wrap">
      {/* Item Presentation Layer */}
      <div 
        className={`node-row ${node.isFolder ? 'is-folder' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`caret-icon ${isOpen ? 'expanded' : ''}`}>
            {node.isFolder ? '▶' : ''}
        </span>
        <span className={`type-icon ${node.isFolder ? 'folder' : 'file'}`}>
            {node.isFolder ? '📁' : '📄'}
        </span>
        <span>{node.name}</span>
      </div>

      {/* Recursive Rendering Layer conditional on Open state */}
      {isOpen && hasChildren && (
        <div className="sub-level">
          {node.children.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

// 📦 MAIN COMPONENT ENTRY
const FileExplorer = () => {
  return (
    <div className="react-card explorer-card">
      <h2>Recursive File Explorer</h2>
      <p className="sub-meta">React Edition: Infinite hierarchical nesting managed via encapsulated Component State.</p>
      
      <div className="explorer-viewport">
        {/* Map through the primary children of the simulated Root directory */}
        {FILE_SYSTEM.children.map((rootItem, idx) => (
            <TreeNode key={idx} node={rootItem} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
