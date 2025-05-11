import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../styles/CategoryPage.module.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId] = useState('user123');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`https://eatbetterbackend.onrender.com/api/product/category/${categoryName}`);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  const addToCart = async (productId) => {
    try {
      await axios.post(`https://eatbetterbackend.onrender.com/api/cart/${userId}`, {
        productId,
        quantity: 1, // You can make this dynamic based on quantity selection if needed
      });
      // Replace alert with a more modern toast notification
      const toast = document.createElement('div');
      toast.className = styles.toast;
      toast.textContent = 'Product added to cart!';
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Error adding product to cart.');
    }
  };

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <div className={styles.empty}>No products found in this category.</div>;

  return (
    <div className={styles.categoryPage}>
      <h1>{categoryName} Products</h1>
      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product._id} className={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button 
              className={styles.addToCartBtn}
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
