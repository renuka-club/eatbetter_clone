import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 'user123'; // ✅ Replace with real user ID from auth/session

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://eatbetterbackend.onrender.com/api/product');
        // Only take the first three products
        setProducts(res.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(`https://eatbetterbackend.onrender.com/api/cart/${userId}`, {
        productId,
        quantity: 1,
      });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Error adding to cart.');
    }
  };

  if (loading) return <p className={styles.loading}>Loading products...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <section id="products" className={styles.products}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>Our top picks for you</p>
        </div>

        <div className={styles.grid}>
          {products.map(product => (
            <div key={product._id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} className={styles.image} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>₹{product.price}</span>
                  <button 
                    className={styles.button}
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
