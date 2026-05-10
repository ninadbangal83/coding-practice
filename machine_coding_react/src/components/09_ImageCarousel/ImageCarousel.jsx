import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

const IMAGES = [
  { id: 1, url: "https://picsum.photos/id/237/500/300", label: "Puppy Vista" },
  { id: 2, url: "https://picsum.photos/id/10/500/300", label: "Forest Stream" },
  { id: 3, url: "https://picsum.photos/id/20/500/300", label: "Open Desk" },
  { id: 4, url: "https://picsum.photos/id/30/500/300", label: "Coffee Cup" },
];

const ImageCarousel = () => {
  const [idx, setIdx] = useState(0);

  const handleNext = () => setIdx((prev) => (prev + 1) % IMAGES.length);
  const handlePrev = () => setIdx((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  // Auto Play Effect
  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval); // Auto cleanup lifecycle!
  }, []);

  return (
    <div className="react-card">
      <h2>Auto-Cycle Carousel</h2>
      
      <div className="carousel-window">
        <img 
          key={IMAGES[idx].id} // Keys force re-render for smooth keyframe triggers
          src={IMAGES[idx].url} 
          alt={IMAGES[idx].label} 
          className="active-img"
        />

        <button onClick={handlePrev} className="arr left-arr">&#10094;</button>
        <button onClick={handleNext} className="arr right-arr">&#10095;</button>
      </div>

      <div className="dot-indicators">
        {IMAGES.map((_, i) => (
          <span 
            key={i} 
            className={`dot-bubble ${i === idx ? 'active' : ''}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
