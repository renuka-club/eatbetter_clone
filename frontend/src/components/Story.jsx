import React from 'react';
import styles from '../styles/Story.module.css';

const Story = () => {
  const deliveryPartners = [
    {
      name: 'Blinkit',
      logo: '/images/blinkit-logo.webp',
      url: 'https://blinkit.com'
    },
    {
      name: 'Swiggy Instamart',
      logo: '/images/instagram-logo.webp',
      url: 'https://www.swiggy.com/instamart'
    },
    {
      name: 'Amazon',
      logo: '/images/amazon-logo.webp',
      url: 'https://www.amazon.in'
    },
    {
      name: 'Zepto',
      logo: '/images/zepto.avif',
      url: 'https://www.zeptonow.com'
    }
  ];

  return (
    <section id='story' className={styles.story}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>OUR STORY</h2>
        
        <div className={styles.videoSection}>
          <div className={styles.videoContent}>
            <div className={styles.brandLogo}>
              <img src="images/logo.svg" alt="Eat Better Co" />
            </div>
            <h3 className={styles.title}>Age-Old</h3>
            <div className={styles.founderInfo}>
              <h4 className={styles.founderName}>Mridula Kanoria</h4>
              <p className={styles.founderTitle}>Founder</p>
            </div>
          </div>
          <video 
            className={styles.video}
            controls
            poster="images/click.jpg"
          >
            <source src="vedios/e8eba1ca88b5476d9ee487d2da1979df.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <h3>Our Journey</h3>
            <p>
              At Eat Better Co, we believe in the power of traditional Indian snacks reimagined for modern lifestyles. Our journey began with a simple mission: to create delicious, nutritious snacks that honor our heritage while meeting contemporary health standards.
            </p>
          </div>

          <div className={styles.values}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🌿</span>
              <h4>Natural Ingredients</h4>
              <p>We use only the finest natural ingredients, carefully sourced from trusted suppliers.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>💪</span>
              <h4>Health-Focused</h4>
              <p>Every snack is crafted to provide optimal nutrition without compromising on taste.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🏠</span>
              <h4>Homemade Quality</h4>
              <p>Our recipes are inspired by traditional home cooking methods and family recipes.</p>
            </div>
          </div>
        </div>

        <div className={styles.deliverySection}>
          <h2 className={styles.deliveryTitle}>WE ARE JUST 10 MINUTES AWAY!</h2>
          <div className={styles.deliveryPartners}>
            {deliveryPartners.map((partner, index) => (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerLink}
              >
                <img src={partner.logo} alt={partner.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;