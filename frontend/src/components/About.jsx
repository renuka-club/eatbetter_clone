import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={`${styles.title} ${styles.fadeInUp}`}>Our Store</h2>
            <p className={`${styles.description} ${styles.fadeInUp}`}>
              At EatBetter, we believe that healthy eating should be delicious and accessible to everyone. 
              Our journey began with a simple mission: to create nutritious food options that don't compromise on taste.
            </p>
            <p className={`${styles.description} ${styles.fadeInUp}`}>
              Every product in our range is carefully crafted using the finest ingredients, 
              ensuring you get the best of both nutrition and flavor in every bite.
            </p>
            <button className={`${styles.button} ${styles.pulseEffect}`}>Learn More</button>
          </div>
          <div className={`${styles.imageContainer} ${styles.fadeInRight}`}>
            <img src="/images/image1.jpg" alt="About EatBetter" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;