import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/BestSellers.module.css';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 'user123'; // ✅ Use same logic as Products.jsx

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('https://eatbetterbackend.onrender.com/api/product/bestsellers');
        setBestSellers(res.data);
      } catch (err) {
        console.error('Error fetching best sellers:', err);
        setError('Failed to load best sellers.');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(`https://eatbetterbackend.onrender.com/api/cart/${userId}`, {
        productId,
        quantity: 1,
      });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart.');
    }
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    setShowAll(true);
  };

  if (loading) return <p className={styles.loading}>Loading the best sellers.</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <section id='bestseller' className={styles.bestSellers}>
      <div className={styles.container}>
        <h2 className={styles.title}>BETTER SNACKING STARTS HERE!</h2>

        {!showAll && (
          <div className={styles.viewAll}>
            <a href="#bestseller" onClick={handleViewAll}>VIEW ALL</a>
          </div>
        )}

        <div className={styles.productGrid}>
          {(showAll ? bestSellers : bestSellers.slice(0, 4)).map((product, index) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} />
                {index === 0 && !showAll && (
                  <span className={styles.bestSellerTag}>Best Seller</span>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <div className={styles.ratingContainer}>
                  <div className={styles.stars}>
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>
                  <span className={styles.ratingText}>
                    {product.rating || 4.5} • {product.reviews?.length || 100} reviews
                  </span>
                </div>
                <div className={styles.price}>₹{product.price}</div>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
