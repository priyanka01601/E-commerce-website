import React, { useState,useEffect } from "react";
import "./Carousel.css"; // Import the corresponding CSS file
import heroImages  from "../Assets/HeroCarousel"


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); 

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  const handlePrev = () => {
    console.log("Handling Prev");
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex < 0 ? heroImages.length - 1 : newIndex);
  };
  
  const handleNext = () => {
    console.log("Handling Next");
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex >= heroImages.length ? 0 : newIndex);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  

  return (
    <div className="carousel">
      <button className="slide prev" onClick={handlePrev}>&#10094;
        </button>
      <div className="image-container" style={{ width: `${heroImages.length * 100}%`, transform: `translateX(-${currentIndex * (100 / heroImages.length)}%)` }}>
        {heroImages.map((image, index) => (
          <img key={index} src={image} alt={`hero-${index}`} className={`carousel-image ${index === currentIndex ? "active" : ""}`} style={{ width: `${100 / heroImages.length}%` }} />
        ))}
      </div>
      <button className="slide next" onClick={handleNext}>
      &#10095;
      </button>
      <div className="dot-container">
        {heroImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

