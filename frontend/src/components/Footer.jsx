import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.logo}>EatBetter</h3>
            <p className={styles.description}>Making healthy eating delicious and accessible for everyone.</p>
          </div>
          <div>
            <h4 className={styles.title}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#home" className={styles.link}>Home</a></li>
              <li><a href="#about" className={styles.link}>About</a></li>
              <li><a href="#products" className={styles.link}>Products</a></li>
              <li><a href="#contact" className={styles.link}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.title}>Contact Info</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>123 Health Street</li>
              <li className={styles.contactItem}>Wellness City, WC 12345</li>
              <li className={styles.contactItem}>Phone: (123) 456-7890</li>
              <li className={styles.contactItem}>Email: info@eatbetter.com</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.title}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com/eatbetter" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com/eatbetter" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com/eatbetter" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} EatBetter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;