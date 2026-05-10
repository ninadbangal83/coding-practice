import React, { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const labels = {
    1: 'Fair 😕',
    2: 'Decent 🙂',
    3: 'Good 😀',
    4: 'Excellent 🤩',
    5: 'Legendary! 👑'
  };

  return (
    <div className="react-card">
      <h2>React Star Ratings</h2>
      <p className="sub-text">Utilizing double state listeners for seamless real-time feedback.</p>
      
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className={`star-icon ${(hover || rating) >= index ? 'active' : ''}`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      <div className={`feedback-box ${rating ? 'visible' : ''}`}>
        {rating ? `You rated this: ${labels[rating]}` : 'Select stars to rate...'}
      </div>
    </div>
  );
};

export default StarRating;
