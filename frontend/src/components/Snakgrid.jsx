import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/SnackVedioGrid.css';

const snacks = [
  {
    id: 1,
    name: 'Ultimate Snack Box',
    video: 'vedios/f464eca3-cdb3-11ef-acf4-1e29eb57f71e_video.mp4',
  },
  {
    id: 2,
    name: 'Assorted Laddoo Box',
    video: 'vedios/ed11f3e5-cdb3-11ef-acf4-1e29eb57f71e_preview.mp4',
  },
  {
    id: 3,
    name: 'Millet Namkeen Combo',
    video: 'vedios/f538a3ab-cdb3-11ef-acf4-1e29eb57f71e_preview.mp4',
  },
  {
    id: 4,
    name: 'Special Snack Pack',
    video: 'vedios/ed060647-cdb3-11ef-acf4-1e29eb57f71e_video.mp4',
  },
  {
    id: 5,
    name: 'Premium Treat Box',
    video: 'vedios/ed1214f1-cdb3-11ef-acf4-1e29eb57f71e_preview.mp4',
  }
];

const SnackVideoSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRefs = useRef([]);
  const sliderRef = useRef(null);

  // Set up initial interaction listener
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  const handleVideoHover = (index, isHovering) => {
    setHoveredIndex(isHovering ? index : null);
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      if (isHovering) {
        if (userInteracted) {
          video.muted = false;
          video.play().catch(e => console.log("Playback prevented:", e));
        } else {
          video.muted = true;
          video.play().catch(e => console.log("Playback prevented:", e));
        }
      } else {
        video.pause();
      }
    }
  };

  const scrollToDirection = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="slider-container">
      <button 
        className="scroll-button left" 
        onClick={() => scrollToDirection('left')}
        aria-label="Scroll left"
      >
        <FaChevronLeft className="arrow-icon" />
      </button>

      <div className="video-slider" ref={sliderRef}>
        {snacks.map((snack, index) => (
          <div 
            key={snack.id}
            className="video-card"
            onMouseEnter={() => handleVideoHover(index, true)}
            onMouseLeave={() => handleVideoHover(index, false)}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              src={snack.video}
              className="snack-video"
              loop
              playsInline
              preload="auto"
              muted={!userInteracted || hoveredIndex !== index}
            />
            <div className="snack-name">{snack.name}</div>
          </div>
        ))}
      </div>

      <button 
        className="scroll-button right" 
        onClick={() => scrollToDirection('right')}
        aria-label="Scroll right"
      >
        <FaChevronRight className="arrow-icon" />
      </button>
    </div>
  );
};

export default SnackVideoSlider;