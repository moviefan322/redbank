import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import styles from './Carousel.module.css';

function CustomCarousel() {
  if (typeof window !== 'undefined') {
    require('bootstrap/dist/js/bootstrap.bundle.min');
  }
  return (
    <section id="testimonials" className="text-white">
      <Carousel id="myCarousel" slide>
        <Carousel.Item interval={5000}>
          <div className={`${styles.carouselItem1} d-flex flex-column justify-content-center align-items-center`}>
            <div className={`${styles.matte}`}></div>
            <h1>Annual Town Hall</h1>
            <h1>Wed Feb 7</h1>
            <h1>6:30pm</h1>
            <button className={`noStyleButt ${styles.carouselButt}`}>
              RSVP
            </button>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className={`${styles.carouselItem2} d-flex flex-column justify-content-center align-items-center`}>
            <div className={`${styles.matte}`}></div>
            <h1>Boardwalk</h1>
            <h1>Gift Certificates</h1>
            <button className={`noStyleButt ${styles.carouselButt}`}>
              PURCHASE
            </button>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className={`${styles.carouselItem3} d-flex flex-column justify-content-center align-items-center`}>
            <div className={`${styles.matte}`}></div>
            <h1>Shop Local</h1>
            <button className={`noStyleButt ${styles.carouselButt}`}>
              DIRECTORY
            </button>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default CustomCarousel;
