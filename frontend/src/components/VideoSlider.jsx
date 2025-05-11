import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import styles from '../styles/VideoSlider.module.css';

const VideoSlider = () => {
  const videos = [
    {
      id: 1,
      url: '/videos/ultimate-snack-box.mp4',
      thumbnail: '/images/ultimate-snack-box.jpg',
      title: 'Ultimate Snack Box - Combo',
      price: '₹830.00'
    },
    {
      id: 2,
      url: '/videos/assorted-laddoo.mp4',
      thumbnail: '/images/assorted-laddoo.jpg',
      title: 'Assorted Laddoo Box - 4 Flavours',
      price: '₹694.00'
    },
    {
      id: 3,
      url: '/videos/coffee-almond.mp4',
      thumbnail: '/images/coffee-almond.jpg',
      title: 'Coffee Almond Laddoos',
      price: '₹99.00'
    },
    {
      id: 4,
      url: '/videos/better-laddoos.mp4',
      thumbnail: '/images/better-laddoos.jpg',
      title: 'The Better Laddoos - Hazelnut',
      price: '₹399.00'
    },
    {
      id: 5,
      url: '/videos/millet-namkeen.mp4',
      thumbnail: '/images/millet-namkeen.jpg',
      title: 'Millet Namkeen',
      price: '₹276.00'
    }
  ];

  return (
    <div className={styles.videoSliderContainer}>
      <div className={styles.sectionHeader}>
        <h2>Featured Products</h2>
        <p>Discover our healthy and delicious snacks</p>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className={styles.videoCard}>
              <div className={styles.videoWrapper}>
                <video
                  loop
                  muted
                  playsInline
                  poster={video.thumbnail}
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                >
                  <source src={video.url} type="video/mp4" />
                </video>
                <div className={styles.overlay}>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                </div>
              </div>
              <div className={styles.productInfo}>
                <h3>{video.title}</h3>
                <p>{video.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;