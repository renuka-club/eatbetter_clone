import { Link } from 'react-router-dom';
import styles from '../styles/ProductSection.module.css';

const ProductSection = () => {
  return (
    <div className={styles.productSectionContainer}>
      <h1 className={styles.mainTitle}>SNACKS FOR EVERY MOOD – MEETHA YA NAMKEEN!</h1>
      
      <div className={styles.categoriesContainer}>
        <Link to="/category/meetha" className={styles.categoryCard}>
          <div className={styles.imageContainer}>
            <img src="/images/image2.jpg" alt="Better Meetha Collection" />
            <div className={styles.imageOverlay}>
              <h2>BETTER MEETHA</h2>
              <p>Click to explore our delicious and healthy laddoo collection</p>
            </div>
          </div>
        </Link>

        <Link to="/category/namkeen" className={styles.categoryCard}>
          <div className={styles.imageContainer}>
            <img src="/images/image1.jpg" alt="Better Namkeen Collection" />
            <div className={styles.imageOverlay}>
              <h2>BETTER NAMKEEN</h2>
              <p>Click to explore our healthy and tasty namkeen collection</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
