/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./News.module.css";
import Image from "next/image";

const Upcoming = () => {
  return (
    <div className="container d-flex flex-column align-items-center pb-5">
      <h4 className={`${styles.newsh4} my-4 fw-bold`}>UPCOMING EVENTS</h4>
      <div className="row mx-auto mt-3">
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className={styles.imageWrapper}>
            <Image
              className="mb-2 align-self-center"
              src="/relax.jpeg"
              height={250}
              width={290}
              alt="artisan crafting"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
            <p className={styles.overlayText}>
              JAN <br />
              <span>27</span>
            </p>
          </div>

          <h4 className={styles.newsHead}>
            RELAX & RELEASE: Breath & Sound for Inner Peace
          </h4>
          <p>
            Join us for guided meditation, sound healing and breath work to
            relax and release your stress and anxiety.
          </p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className={styles.imageWrapper}>
            <Image
              className="mb-2 align-self-center"
              src="/booze.jpeg"
              height={250}
              width={290}
              alt="artisan crafting"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
            <p className={styles.overlayText}>
              FEB <br />
              <span>10</span>
            </p>
          </div>

          <h4 className={styles.newsHead}>Boozy Brushes Sip & Paint</h4>
          <p>
            Get ready for an artsy evening at the Asbury Park Valentines Bazaar,
            where we'll be painting wine bottles/ vases & creating flower
            bouquets.
          </p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className={styles.imageWrapper}>
            <Image
              className="mb-2 align-self-center"
              src="/oak.jpeg"
              height={250}
              width={290}
              alt="artisan crafting"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
            <p className={styles.overlayText}>
              FEB <br />
              <span>21</span>
            </p>
          </div>

          <h4 className={styles.newsHead}>
            Business Made Social at The Berkeley Oceanfront Hotel
          </h4>
          <p>
            The Asbury Park Chamber invites you to join us for our monthly
            business card exchange, at The Berkeley Oceanfront Hotel
          </p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className={styles.imageWrapper}>
            <Image
              className="mb-2 align-self-center"
              src="/cocktail.jpeg"
              height={250}
              width={290}
              alt="artisan crafting"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
            <p className={styles.overlayText}>
              FEB <br />
              <span>25</span>
            </p>
          </div>

          <h4 className={styles.newsHead}>
          Pittie Love Cocktail Party
          </h4>
          <p>
          Fundraiser For Pitties & Pals Rescue Featuring An Open Bar & Light Fare, DJ, Raffles And Baskets!
          </p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
      </div>
      <div>
        <button className={`noStyleButt greenButt`}> ALL EVENTS</button>
      </div>
    </div>
  );
};

export default Upcoming;
