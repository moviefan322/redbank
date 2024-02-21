import React from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import styles from "./Foot.module.css";

const Foot = () => {
  return (
    <>
      <div
        className={`${styles.container} d-flex flex-row align-items-center text-white justify-content-around`}
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
          <button className={styles.contactButt}>CONTACT</button>
        </div>
        <div>
          <FaInstagram size={60} />
          <FaFacebook size={60} />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between m-5">
        <div>
          <p>
            Supported in part by a grant from the New Jersey Department of
            State, Division of Travel and Tourism
          </p>
          <p>Copyright ©2024 The Red Bank River Center</p>
        </div>
        <div className="mx-3">
          <Image
            src="/MSNJ.jpeg"
            height={50}
            width={100}
            alt="logo"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Foot;
