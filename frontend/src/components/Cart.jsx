import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Cart.module.css';
import Payment from './Payment';

const Cart = ({ onClose }) => {
  const userId = 'user123'; // Replace with actual user ID logic
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://eatbetterbackend.onrender.com/api/cart/${userId}`);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`https://eatbetterbackend.onrender.com/api/cart/${userId}/${productId}`);
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`https://eatbetterbackend.onrender.com/api/cart/${userId}`);
      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const handleCheckout = async () => {
    const total = calculateTotal();
    setTotalAmount(total);

    try {
      const orderResponse = await axios.post('https://eatbetterbackend.onrender.com/api/payment/create-order', {
        amount: total * 100,
      });
      setOrderId(orderResponse.data.id);
      setShowPayment(true);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return item.product ? total + item.product.price * item.quantity : total;
    }, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <div className={styles.cartTitle}>
            <span className={styles.cartIcon}>🛒</span>
            Your cart • {cartItems.length} items
          </div>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.shippingProgress}>
          <div className={styles.progressText}>
            {calculateTotal() >= 399 ? 'Free Shipping Unlocked!' : `₹${399 - calculateTotal()} away from Free Shipping`}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${Math.min((calculateTotal() / 399) * 100, 100)}%` }}
            ></div>
            <div className={styles.progressAmount}>₹399</div>
          </div>
          <div className={styles.freeShippingText}>Free Shipping</div>
        </div>

        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty.</p>
          ) : (
            cartItems.map(item => 
              item.product ? (
                <div key={item._id} className={styles.cartItem}>
                  <img src={item.product.imageUrl} alt={item.product.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3>{item.product.name}</h3>
                    <div className={styles.quantityControls}>
                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>
                    </div>
                    <span className={styles.price}>₹{item.product.price * item.quantity}</span>
                  </div>
                  <button 
                    className={styles.removeItem}
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    🗑️
                  </button>
                </div>
              ) : null
            )
          )}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.couponSection}>
            <div className={styles.couponInfo}>
              <span className={styles.saveText}>Save ₹{Math.floor(calculateTotal() * 0.1)}</span>
              <span className={styles.couponCode}>with 'SHARK10'</span>
            </div>
            <button className={styles.applyButton}>Apply</button>
          </div>

          <div className={styles.subscribeSection}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>Keep me posted about sales and offers</span>
            </label>
          </div>

          <div className={styles.totalSection}>
            <div className={styles.estimatedTotal}>
              <span>₹{calculateTotal()}</span>
              <span className={styles.totalLabel}>Estimated total</span>
            </div>
            <button 
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>

          <div className={styles.secureCheckout}>
            🔒 Secured by shopflo
          </div>
        </div>
      </div>

      {showPayment && (
        <Payment
          totalAmount={totalAmount}
          orderId={orderId}
          onSuccess={(response) => {
            console.log('Payment successful:', response);
            alert('Payment successful!');
            clearCart();
          }}
          onCancel={() => {
            console.log('Payment canceled');
            setShowPayment(false);
          }}
        />
      )}
    </div>
  );
};

export default Cart;












// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../styles/Cart.module.css';
// import Payment from './Payment';

// const Cart = ({ onClose }) => {
//   const userId = 'user123'; // Replace with actual user ID logic
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPayment, setShowPayment] = useState(false);
//   const [orderId, setOrderId] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`https://eatbetterbackend.onrender.com/api/cart/${userId}`);
//       setCartItems(res.data.items || []);
//     } catch (err) {
//       console.error('Error fetching cart:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:1000/api/cart/${userId}/${productId}`);
//       fetchCart();
//     } catch (err) {
//       console.error('Error removing item:', err);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       await axios.delete(`http://localhost:1000/api/cart/${userId}`);
//       setCartItems([]);
//     } catch (err) {
//       console.error('Error clearing cart:', err);
//     }
//   };

//   const handleCheckout = async () => {
//     const total = calculateTotal();
//     setTotalAmount(total);

//     try {
//       const orderResponse = await axios.post('http://localhost:1000/api/payment/create-order', {
//         amount: total * 100,
//       });
//       setOrderId(orderResponse.data.id);
//       setShowPayment(true);
//     } catch (err) {
//       console.error('Error creating order:', err);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return item.product ? total + item.product.price * item.quantity : total;
//     }, 0);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (loading) return <p>Loading cart...</p>;

//   return (
//     <section className={styles.cart}>
//       <div className={styles.header}>
//         <h2>Your Cart</h2>
//         <button onClick={onClose} className={styles.closeBtn} title="Close Cart">✕</button>
//       </div>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <div className={styles.cartItems}>
//             {cartItems.map(item =>
//               item.product ? (
//                 <div key={item._id} className={styles.cartItem}>
//                   <img src={item.product.imageUrl} alt={item.product.name} className={styles.image} />
//                   <div className={styles.details}>
//                     <h4>{item.product.name}</h4>
//                     <p>₹{item.product.price} × {item.quantity}</p>
//                     <p>Total: ₹{item.product.price * item.quantity}</p>
//                     <button onClick={() => removeFromCart(item.product._id)} className={styles.removeBtn}>
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div key={item._id} className={styles.cartItem}>
//                   <p>Product details not available.</p>
//                   <button onClick={() => removeFromCart(item._id)} className={styles.removeBtn}>
//                     Remove
//                   </button>
//                 </div>
//               )
//             )}
//           </div>

//           <div className={styles.summary}>
//             <h3>Total: ₹{calculateTotal()}</h3>
//             <button onClick={clearCart} className={styles.clearBtn}>
//               Clear Cart
//             </button>
//             <button onClick={handleCheckout} className={styles.checkoutBtn}>
//               Checkout
//             </button>
//           </div>
//         </>
//       )}

//       {showPayment && (
//         <Payment
//           totalAmount={totalAmount}
//           orderId={orderId}
//           onSuccess={(response) => {
//             console.log('Payment successful:', response);
//             alert('Payment successful!');
//             clearCart();
//           }}
//           onCancel={() => {
//             console.log('Payment canceled');
//             setShowPayment(false);
//           }}
//         />
//       )}
//     </section>
//   );
// };

// export default Cart;
