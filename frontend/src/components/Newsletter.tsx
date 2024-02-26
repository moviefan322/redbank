/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./Newsletter.module.css";

const Upcoming = () => {
  return (
    <div className="d-flex flex-column align-items-center pb-5">
      <Link className="nostyle-link" href="/newsletter">
        <h4 className={`fs-2 my-4 fw-bold`}>
          <u>RED BANK BEAT</u>
        </h4>
      </Link>
      <div
        className={`d-flex flex-column flex-md-row justify-content-around mx-auto mt-3 w-100`}
      >
        <button className={`noStyleButt ${styles.arrowButt}`}>
          <FaChevronLeft />
        </button>
        <div
          className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
        >
          <div
            className={styles.imageWrapper}
            style={{
              backgroundColor: "#151515",
              backgroundImage: `url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover", // Ensures the image covers the area, might cause "zooming" depending on aspect ratio
              width: "250px",
              height: "250px",
            }}
          ></div>
          <div className="mt-2 fw-bold align-self-start">
            <strong>Feb 22, 2024</strong>
          </div>
        </div>
        <div
          className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
        >
          <div
            className={styles.imageWrapper}
            style={{
              backgroundColor: "#151515",
              backgroundImage: `url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover", // Ensures the image covers the area, might cause "zooming" depending on aspect ratio
              width: "250px",
              height: "250px",
            }}
          ></div>
          <div className="mt-2 fw-bold align-self-start">
            <strong>Feb 15, 2024</strong>
          </div>
        </div>
        <div
          className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
        >
          <div
            className={styles.imageWrapper}
            style={{
              backgroundColor: "#151515",
              backgroundImage: `url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover", // Ensures the image covers the area, might cause "zooming" depending on aspect ratio
              width: "250px",
              height: "250px",
            }}
          ></div>
          <div className="mt-2 fw-bold align-self-start">
            <strong>Feb 8, 2024</strong>
          </div>
        </div>

        <button className={`noStyleButt ${styles.arrowButt}`}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Upcoming;
