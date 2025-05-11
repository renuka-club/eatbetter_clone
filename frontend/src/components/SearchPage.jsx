import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import searchStyles from '../styles/SearchPage.module.css';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`https://eatbetterbackend.onrender.com/api/product/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchResults(response.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const addToCart = async (productId) => {
    try {
      await axios.post(`https://eatbetterbackend.onrender.com/api/cart/user123`, {
        productId,
        quantity: 1
      });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart.');
    }
  };

  if (loading) {
    return (
      <div className={searchStyles.loadingContainer}>
        <div className={searchStyles.loader}></div>
        <p>Searching for products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={searchStyles.errorContainer}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button className={searchStyles.retryButton} onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <div className={searchStyles.noResults}>
        <h2>No products found</h2>
        <p>We couldn't find any products matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className={searchStyles.searchPage}>
      <div className={searchStyles.searchHeader}>
        <h1>Search Results</h1>
        <p>Found {searchResults.length} products for "{searchQuery}"</p>
      </div>

      <div className={searchStyles.searchResults}>
        {searchResults.map((product) => (
          <div key={product._id} className={searchStyles.productCard}>
            <div className={searchStyles.imageContainer}>
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={searchStyles.productInfo}>
              <h3>{product.name}</h3>
              <p className={searchStyles.description}>{product.description}</p>
              <div className={searchStyles.priceRow}>
                <span className={searchStyles.price}>₹{product.price}</span>
                <button 
                  className={searchStyles.addToCartBtn}
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
  );
};

export default SearchPage;
