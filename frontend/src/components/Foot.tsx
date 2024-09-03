import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import styles from "./Foot.module.css";

const Foot = () => {
  return (
    <div className={styles.foot}>
      <div
        className={`${styles.container} d-flex flex-column flex-md-row align-items-center text-white justify-content-around`}
      >
        <div className={styles.logo}></div>
        <div className={styles.footText}>
          <p>46 English Plaza, Suite 6B</p>
          <p>Red Bank, NJ 07701</p>
        </div>
        <div className={styles.footText}>
          <p>732-842-4244</p>
        </div>
        <div>
          <Link href="/about/contact" className="nostyle-link">
            <button className={styles.contactButt}>CONTACT</button>
          </Link>
        </div>
        <div>
          <Link
            className="nostyle-link text-white"
            href="https://www.instagram.com/redbank_nj/"
          >
            <FaInstagram size={60} />
          </Link>
          <Link
            className="nostyle-link text-white ms-3"
            href="https://www.facebook.com/RedBankRiverCenter"
          >
            <FaFacebook size={60} />
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center m-3">
        <div
          className={`d-flex flex-column align-items-center mx-auto ${styles.bottom}`}
        >
          <p className="text-center text-md-start">
            Supported in part by a grant from the New Jersey Department of
            State, Division of Travel and Tourism
          </p>
          <p className="text-sm-center text-md-start">
            Copyright ©2024 The Red Bank River Center
          </p>
        </div>
        <div className="mx-3">
          <div
            style={{
              backgroundImage: "url(/MSNJ.jpeg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "150px",
              height: "75px",
              maxWidth: "100%",
            }}
            aria-label="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Foot;
