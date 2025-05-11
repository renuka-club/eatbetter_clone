import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Payment.module.css';

const Payment = ({ totalAmount, orderId, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        alert('Razorpay SDK failed to load.');
        return;
      }

      const orderResponse = await axios.post('https://eatbetterbackend.onrender.com/api/payment/create-order', {
        amount: totalAmount * 100,
      });

      const { id: razorpayOrderId, amount } = orderResponse.data;
      const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        alert('Razorpay Key missing in .env');
        return;
      }

      const options = {
        key: razorpayKey,
        amount,
        currency: 'INR',
        name: 'Eat Better Co',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post('https://eatbetterbackend.onrender.com/api/payment/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId, // if you track orders separately
              amount: amount
            });

            onSuccess?.(verifyResponse.data);
          } catch (err) {
            console.error('Verification failed:', err);
            alert('Payment verification failed.');
            onCancel?.();
          }
        },
        prefill: {
          name: billingInfo.name,
          email: billingInfo.email,
          contact: billingInfo.phone,
        },
        notes: {
          address: billingInfo.address,
        },
        theme: {
          color: '#528FF0',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        onCancel?.();
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Something went wrong with payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <h2>Checkout</h2>
      <form onSubmit={handlePayment} className={styles.paymentForm}>
        <div className={styles.billingDetails}>
          <h3>Billing Details</h3>
          {['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'].map((field, i) => (
            <div className={styles.formGroup} key={i}>
              {field !== 'address' ? (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={billingInfo[field]}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <textarea
                  name="address"
                  placeholder="Address"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.paymentSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryItem}>
            <span>Total Amount:</span>
            <span>₹{totalAmount}</span>
          </div>
          <button type="submit" className={styles.paymentButton} disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
