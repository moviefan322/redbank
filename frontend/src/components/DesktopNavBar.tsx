import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./DesktopNavBar.module.css";

const DesktopNavBar = () => {
  return (
    <div className="d-flex flex-row justify-content-between m-3">
      <Image
        src={logo}
        height={60}
        width={60}
        alt="funky logo"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <div
        className={`d-flex flex-row justify-content-between align-items-center ${styles.menu}`}
      >
        <div className={`${styles.dropHead}`}>
          <button className={`noStyleButt ${styles.dropHead}`}>VISIT</button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
              <li>DOWNTOWN BUSINESSES</li>
              <li>
                <Link
                  className={styles.noStyleLink}
                  href="https://www.asbury.edu/admissions-aid/"
                >
                  ASBURY UNIVERSITY
                </Link>
              </li>
              <li>
                <Link
                  className={styles.noStyleLink}
                  href="https://www.stoneponyonline.com/"
                >
                  THE STONE PONY
                </Link>
              </li>
              <li>PARKING</li>
              <li>PHOTO TOUR</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.dropHead}`}>
          <button className={`noStyleButt ${styles.dropHead}`}>EVENTS</button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
              <li>UPCOMING EVENTS</li>
              <li>RECURRING EVENTS</li>
              <li>FARMERS MARKET</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.dropHead}`}>
          <button className={`noStyleButt ${styles.dropHead}`}>ABOUT US</button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
              <li>MISSION & STAFF</li>
              <li>VOLUNTEER</li>
              <li>CONTACT US</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.dropHead}`}>
          <button className={`noStyleButt ${styles.dropHead}`}>
            BUSINESS RESOURCES
          </button>
          <div className={`${styles.dropdown}`}>
            <ul className={styles.noStyleLi}>
            <li>AVAILABLE PROPERTIES</li>
              <li>BUSINESS SUPPORT</li>
              <li>LOCAL EMPLOYMENT</li>
              <li>RESOURCES & LINKS</li>
            </ul>
          </div>
        </div>
        <FaMagnifyingGlass className="m-3" />
        <button className={`noStyleButt btn ${styles.donateButt}`}>
          DONATE
        </button>
      </div>
    </div>
  );
};

export default DesktopNavBar;
