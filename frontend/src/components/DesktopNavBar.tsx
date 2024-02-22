import React from "react";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./DesktopNavBar.module.css";

const DesktopNavBar = () => {
  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center m-2">
        <div className={styles.image1}></div>
        <div className={styles.image2}></div>
      </div>
      <div
        className={`d-flex flex-row justify-content-between align-items-center mx-5`}
      >
        <div>
          <Link href="/events">
            <button className={`noStyleButt ${styles.dropHead}`}>EVENTS</button>
          </Link>
        </div>

        <div>
          <button className={`noStyleButt ${styles.dropHead}`}>
            E-NEWSLETTER
          </button>
        </div>
        <div>
          <button className={`noStyleButt ${styles.dropHead}`}>NEWS</button>
        </div>
        <div className={`noStyleButt ${styles.dropHead}`}>
          <button className={`noStyleButt fw-bold ${styles.dropHeadButt}`}>
            ABOUT
          </button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
              <li>BOARD MEMBERS</li>
              <li>CONTACT US</li>
            </ul>
          </div>
        </div>
        <div>
          <button className={`noStyleButt ${styles.dropHead}`}>
            GIFT CARDS
          </button>
        </div>
        <div>
          <button className={`noStyleButt ${styles.dropHead}`}>
            BUSINESS DIRECTORY
          </button>
        </div>
        <div className={`noStyleButt ${styles.dropHead}`}>
          <button className={`noStyleButt fw-bold`}>VISIT</button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
              <li>PARKING</li>
              <li>LODGING</li>
            </ul>
          </div>
        </div>
        <FaMagnifyingGlass className="m-3" />
        <button className={`noStyleButt ${styles.dropHead}`}>SEARCH</button>
      </div>
    </>
  );
};

export default DesktopNavBar;
