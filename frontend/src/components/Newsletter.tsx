/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./News.module.css";
import News from "../types/News";

const Upcoming = () => {
  return (
    <div className="d-flex flex-column align-items-center pb-5">
      <h4
        className={`d-flex flex-row justify-content-center justify-content-md-start fs-2 my-4 fw-bold w-75`}
      >
        <u>NEWS</u>
      </h4>
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
              background: `#151515 url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png") no-repeat center center`,
              backgroundSize: "cover",
              backgroundAttachment: "scroll",
            }}
          ></div>
          <div className={styles.descText}>
            <strong>Feb 22, 2024</strong>
          </div>
        </div>
        <div
          className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
        >
          <div
            className={styles.imageWrapper}
            style={{
              background: `#151515 url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png") no-repeat center center`,
              backgroundSize: "cover",
              backgroundAttachment: "scroll",
            }}
          ></div>
          <div className={styles.descText}>
            <strong>Feb 15, 2024</strong>
          </div>
        </div>
        <div
          className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
        >
          <div
            className={styles.imageWrapper}
            style={{
              background: `#151515 url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png") no-repeat center center`,
              backgroundSize: "cover",
              backgroundAttachment: "scroll",
            }}
          ></div>
          <div className={styles.descText}>
            <strong>Feb 8, 2024</strong>
          </div>
        </div>
        <div
          className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
        >
          <div
            className={styles.imageWrapper}
            style={{
              background: `#151515 url("https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png") no-repeat center center`,
              backgroundSize: "cover",
              backgroundAttachment: "scroll",
            }}
          ></div>
          <div className={styles.descText}>
            <strong>Feb 1, 2024</strong>
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
