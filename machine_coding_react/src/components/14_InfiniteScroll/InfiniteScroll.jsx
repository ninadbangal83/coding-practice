import React, { useState, useEffect, useRef } from 'react';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Data Stream Row #${i + 1}`));
  const [isLoading, setIsLoading] = useState(false);
  
  const observerTarget = useRef(null);

  const loadMoreItems = () => {
    setIsLoading(true);
    // Simulate API Latency Network Delay
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 10 }, (_, i) => `Auto-Loaded Segment #${prev.length + i + 1}`)
      ]);
      setIsLoading(false);
    }, 1200);
  };

  // 🚀 ELITE SENIOR PATTERN: Intersection Observer binding in standard useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // If the invisible element at the end enters the screen, and we aren't currently processing, load more!
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect(); // Total clean release of native API resource on unmount
  }, [isLoading]);

  return (
    <div className="react-card">
      <h2>Reactive Dynamic Scroll</h2>
      <p className="sub-meta">Leveraging Browser Native IntersectionObserver API for extreme efficiency infinite lists.</p>
      
      <div className="scroll-viewport">
        {items.map((item, i) => (
          <div key={i} className="scrolling-node">{item}</div>
        ))}

        {/* ATTACH OBSERVER HOOK HERE */}
        <div ref={observerTarget} className="loading-hook-marker">
          {isLoading ? <div className="loading-react-anim">Parsing Incoming Buffers...</div> : "•••"}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
