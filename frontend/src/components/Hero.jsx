import React, { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/image1.jpg",
      title: "We Swam with the Sharks &",
      subtitle: "Sealed the Deal",
      buttonText: "Shop Best-Sellers Now"
    },
    {
      image: "/images/image2.jpg",
      title: "Healthy Living Starts Here",
      subtitle: "Discover Our Premium Products",
      buttonText: "Shop Now"
    },
    {
      image: "/images/image3.jpg",
      title: "Natural & Organic",
      subtitle: "Quality You Can Trust",
      buttonText: "Explore More"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slideBackground} ${
            currentSlide === index ? styles.active : ''
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className={styles.overlay}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {slides[currentSlide].title}
          </h1>
          <p className={styles.subtitle}>
            {slides[currentSlide].subtitle}
          </p>
          <button className={styles.button}>
            {slides[currentSlide].buttonText}
          </button>
        </div>
      </div>

      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.scrollingBar}>
  <div className={styles.scrollingWrapper}>
    <div className={styles.scrollingContent}>
      <div className={styles.scrollText}>
        <span>Delicious</span>
        <span className={styles.dot}>•</span>
        <span>Natural</span>
        <span className={styles.dot}>•</span>
        <span>Wholesome</span>
      </div>
      
      {/* Repeat to make scrolling seamless */}
      <div className={styles.scrollText}>
        <span>Delicious</span>
        <span className={styles.dot}>•</span>
        <span>Natural</span>
        <span className={styles.dot}>•</span>
        <span>Wholesome</span>
      </div>
    </div>
  </div>
</div>

    </section>
  );
};

export default Hero;