import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faHeart, faShieldAlt, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Features.module.css';

const Features = () => {
  const features = [
    {
      icon: faLeaf,
      title: "100% Natural",
      description: "All our products are made with natural ingredients, sourced from trusted suppliers."
    },
    {
      icon: faHeart,
      title: "Healthy Choice",
      description: "Every product is crafted to provide maximum nutritional benefits."
    },
    {
      icon: faShieldAlt,
      title: "Quality Assured",
      description: "Rigorous quality control ensures the best standards for our products."
    },
    {
      icon: faAppleAlt,
      title: "Fresh Ingredients",
      description: "We use only the freshest ingredients to maintain superior taste and quality."
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.subtitle}>Experience the difference of truly healthy eating</p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={feature.icon} className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;