import React from "react";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./DesktopNavBar.module.css";

const DesktopNavBar = () => {
  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center m-2">
        <Link href="/">
          <div className={styles.image1}></div>
        </Link>

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
          <Link href="/newsletter">
            <button className={`noStyleButt ${styles.dropHead}`}>
              E-NEWSLETTER
            </button>
          </Link>
        </div>
        <div>
          <Link href="/news">
            <button className={`noStyleButt ${styles.dropHead}`}>NEWS</button>
          </Link>
        </div>
        <div className={`noStyleButt ${styles.dropHead}`}>
          <button className={`noStyleButt fw-bold ${styles.dropHeadButt}`}>
            ABOUT
          </button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
              <Link className="nostyle-link" href="/about/boardMembers">
                <li>BOARD MEMBERS</li>
              </Link>
              <Link className="nostyle-link" href="/about/contact">
                <li>CONTACT US</li>
              </Link>
            </ul>
          </div>
        </div>
        <div>
          <Link className="nostyle-link" href="/giftCard">
            <button className={`noStyleButt ${styles.dropHead}`}>
              GIFT CARDS
            </button>
          </Link>
        </div>
        <div>
          <Link className="nostyle-link" href="/businessDirectory">
            <button className={`noStyleButt ${styles.dropHead}`}>
              BUSINESS DIRECTORY
            </button>
          </Link>
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
