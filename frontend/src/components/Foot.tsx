import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./Foot.module.css";

const Foot = () => {
  return <>
    <div
      className={`${styles.container} d-flex flex-column align-items-center`}
    >
      <div className={`${styles.textItems}`}>
        <p>DOWNTOWN DIRECTORY</p>
        <p>EVENTS</p>
        <p>BUSINESS SUPPORT</p>
        <p>TERMS</p>
        <p>PRIVACY</p>
      </div>
      <div className={`${styles.addressBlock}`}>
        76 Asbury Ave, 3rd Floor • Asbury Park, NJ 07712 • (732) 555-1234 •
        info@asburyparkdowntown.org
      </div>
      <div
        className={` d-flex flex-column flex-md-row ${styles.buttonsIcons}`}
      >
        <button className={`noStyleButt blueButt me-md-5`}>CONTACT</button>
        <div className={styles.icons}>
          <FaFacebookF className={styles.icon} />
          <FaTwitter className={styles.icon} />
          <FaInstagram className={styles.icon} />
          <FaYoutube className={styles.icon} />
        </div>
        <button className={`noStyleButt blueButt ms-md-5`}>DONATE</button>
      </div>
    </div>
    <hr className="w-75 mx-auto" />
    <div className="d-flex flex-row justify-content-between m-5">
      <div>
        <p>
          Copyright ©2021 Asbury Park Village Center Alliance. All Rights
          Reserved.
        </p>
      </div>
      <div className="mx-3">
        <Image
          src='/MSA.jpeg'
          height={50}
          width={100}
          alt="logo"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <Image
          src='/MSNJ.jpeg'
          height={50}
          width={100}
          alt="logo"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
    </div>
  </>;
};

export default Foot;
