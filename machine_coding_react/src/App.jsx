import React, { useState } from 'react';
import './App.css';
import Counter from './components/01_Counter/Counter';
import Stopwatch from './components/02_Stopwatch/Stopwatch';
import EventDelegation from './components/03_EventDelegation/EventDelegation';
import TabsLogic from './components/04_TabsLogic/TabsLogic';
import TodoList from './components/05_TodoList/TodoList';
import StarRating from './components/06_StarRating/StarRating';
import ModalPopup from './components/07_ModalPopup/ModalPopup';
import DragAndDrop from './components/08_DragAndDrop/DragAndDrop';
import ImageCarousel from './components/09_ImageCarousel/ImageCarousel';
import FormValidation from './components/10_FormValidation/FormValidation';
import SearchFilter from './components/11_SearchFilter/SearchFilter';
import Autocomplete from './components/12_Autocomplete/Autocomplete';
import Pagination from './components/13_Pagination/Pagination';
import InfiniteScroll from './components/14_InfiniteScroll/InfiniteScroll';
import ThrottledClick from './components/15_ThrottledClick/ThrottledClick';
import DebouncedSearch from './components/16_DebouncedSearch/DebouncedSearch';
import NestedComments from './components/17_NestedComments/NestedComments';

// Master Registry of all challenges
const PROJECTS = [
  { id: '01', title: '01. Basic Counter', component: <Counter /> },
  { id: '02', title: '02. Digital Stopwatch', component: <Stopwatch /> },
  { id: '03', title: '03. Event Delegation', component: <EventDelegation /> },
  { id: '04', title: '04. Tabs System', component: <TabsLogic /> },
  { id: '05', title: '05. Todo Manager', component: <TodoList /> },
  { id: '06', title: '06. Star Rating', component: <StarRating /> },
  { id: '07', title: '07. Modal Popup', component: <ModalPopup /> },
  { id: '08', title: '08. Drag & Drop', component: <DragAndDrop /> },
  { id: '09', title: '09. Image Carousel', component: <ImageCarousel /> },
  { id: '10', title: '10. Form Validation', component: <FormValidation /> },
  { id: '11', title: '11. Search Filter', component: <SearchFilter /> },
  { id: '12', title: '12. Autocomplete', component: <Autocomplete /> },
  { id: '13', title: '13. Pagination Engine', component: <Pagination /> },
  { id: '14', title: '14. Infinite Scroll', component: <InfiniteScroll /> },
  { id: '15', title: '15. Throttled Click', component: <ThrottledClick /> },
  { id: '16', title: '16. Debounced Search', component: <DebouncedSearch /> },
  { id: '17', title: '17. Nested Comments', component: <NestedComments /> },
];

function App() {
  const [activeId, setActiveId] = useState(null);

  const renderContent = () => {
    if (!activeId) {
      return (
        <div className="welcome-screen">
          <h2>⚛️ React Machine Coding Hub</h2>
          <p>Select a challenge from the left sidebar to launch the sandbox.</p>
        </div>
      );
    }
    const activeProject = PROJECTS.find(p => p.id === activeId);
    return activeProject?.component || <div>Component Under Construction 🚧</div>;
  };

  return (
    <div className="dashboard-container">
      {/* 🧭 SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Frontend Prep</h1>
          <p>React Edition v1.0</p>
        </div>
        <ul className="nav-list">
          {PROJECTS.map((item) => (
            <li 
              key={item.id}
              className={`nav-item ${activeId === item.id ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* 📺 DYNAMIC SANDBOX VIEWER */}
      <main className="content-viewer">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
