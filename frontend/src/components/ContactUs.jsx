import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import styles from '../styles/ContactUs.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Mail',
      info: 'care@eatbetterco.com',
      link: 'mailto:care@eatbetterco.com'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      info: '9352178141',
      link: 'https://api.whatsapp.com/send?phone=919352178141'
    },
    {
      icon: <FaPhone />,
      title: 'Call',
      info: '9355593014',
      link: 'tel:+919355593014'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://eatbetterbackend.onrender.com/api/contact/submit', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(response.data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (error.response) {
        // Server responded with an error
        setError(error.response.data.message || 'Server error. Please try again.');
      } else if (error.request) {
        // Request was made but no response
        setError('No response from server. Please check your connection.');
      } else {
        // Something else went wrong
        setError('Error sending message. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message or reach out directly.</p>
      </div>

      {/* Reach Out Cards */}
      <div className={styles.contactCards}>
        {contactInfo.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.info}>{item.info}</p>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
        {submitted && (
          <div className={styles.successMessage}>
            Thank you for your message. We'll get back to you soon!
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
