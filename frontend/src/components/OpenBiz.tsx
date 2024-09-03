import React from "react";
import styles from "./OpenBiz.module.css";

const OpenBiz = () => {
  return (
    <div className="container pt-3 d-flex flex-column align-items-center pb-5">
      <div className={styles.imageWrapper}>
        <div
          className={`${styles.business}`}
          style={{
            backgroundImage: "url(/biz2.jpeg)",
            backgroundSize: "cover", // Or 'contain', depending on the desired fit
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "400px", // Keep the height fixed to maintain the aspect ratio
          }}
          aria-label="business owner" // For accessibility, replacing alt text
        />
        <div className={styles.textOverlay}>
          <h3 className={styles.h3biz}>
            OPEN A BUSINESS <br /> IN ASBURY PARK!
          </h3>
          <p>
            Join the community of diverse businesses that make up our downtown!
          </p>
          <button className="noStyleButt orangeButt">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default OpenBiz;
