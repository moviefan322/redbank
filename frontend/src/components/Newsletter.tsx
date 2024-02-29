/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Newsletter from "@/types/Newsletter";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./Newsletter.module.css";

const Upcoming = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [displayedNewsletters, setDisplayedNewsletters] = useState<
    Newsletter[]
  >([]);
  const [displayedStart, setDisplayedStart] = useState(0);
  const [displayedEnd, setDisplayedEnd] = useState(3);

  const fetchNewsletters = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter`
      );
      const data = await response.json();
      setNewsletters(data as Newsletter[]);
      setDisplayedNewsletters(data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleDisplayPrev3Newsletters = () => {
    const newStart = Math.max(displayedStart - 3, 0);
    const newEnd = newStart + 3;
    setDisplayedStart(newStart);
    setDisplayedEnd(newEnd);
    setDisplayedNewsletters(newsletters.slice(newStart, newEnd));
  };

  const handleDisplayNext3Newsletters = () => {
    const newEnd = Math.min(displayedEnd + 3, newsletters.length);
    const newStart = newEnd - 3;
    setDisplayedStart(newStart);
    setDisplayedEnd(newEnd);
    setDisplayedNewsletters(newsletters.slice(newStart, newEnd));
  };

  console.log(newsletters);

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
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          disabled={displayedStart === 0}
          onClick={() => {
            if (newsletters.length > 3) {
              handleDisplayPrev3Newsletters();
            }
          }}
        >
          <FaChevronLeft />
        </button>
        {displayedNewsletters.map((newslettersItem, index) => {
          return (
            <div
              key={index}
              className={`${styles.newslettersItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
            >
              <Link className="nostyle-link" href={newslettersItem.url}>
                <div
                  className={styles.imageWrapper}
                  style={{
                    backgroundColor: "#151515",
                    backgroundImage: `url(${
                      newslettersItem.imageUrl
                        ? newslettersItem.imageUrl
                        : "https://res.cloudinary.com/dnaj4dehf/image/upload/v1708529356/Screenshot_2024-02-21_at_10.23.36_AM_n9sivx.png"
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    width: "250px",
                    height: "250px",
                  }}
                ></div>
                <div className={styles.descText}>
                  <p className="fw-bolder mt-2">
                    {newslettersItem.create_time
                      ? `${new Date(
                          newslettersItem.create_time
                        ).toLocaleDateString()}`
                      : ""}
                  </p>
                  <p className="mt-3 text-center">
                    {newslettersItem.subject_line}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          disabled={displayedEnd === newsletters.length}
          onClick={() => {
            if (newsletters.length > 3) {
              handleDisplayNext3Newsletters();
            }
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Upcoming;
