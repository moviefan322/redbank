import React from 'react';
import Image from "next/image";
import styles from './OpenBiz.module.css';

const OpenBiz = () => {
  return (
    <div className="container pt-3 d-flex flex-column align-items-center pb-5">
      <div className={styles.imageWrapper}>
        <Image
          className={`${styles.business}`}
          src="/biz2.jpeg"
          width={400}
          height={400}
          alt="business owner"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto"
          }} />
        <div className={styles.textOverlay}>
          <h3 className={styles.h3biz}>OPEN A BUSINESS <br /> IN ASBURY PARK!</h3>
          <p>Join the community of diverse businesses that make up our downtown!</p>
          <button className="noStyleButt orangeButt">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default OpenBiz;

