import React from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import styles from '../styles/Contact.module.css';

const Contact = () => {
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

  return (
    <section id='contact' className={styles.contact}>
      <h2 className={styles.mainTitle}>REACH OUT TO US</h2>
      
      <div className={styles.contactCards}>
        {contactInfo.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.card}
          >
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.info}>{item.info}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;