/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./News.module.css";
import News from "../types/News";

const Upcoming = () => {
  const [news, setNews] = useState<News[]>([]);
  const [displayedNews, setDisplayedNews] = useState<News[]>([]);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`
      );
      const data = await res.json();
      setNews(data);
      setDisplayedNews(data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (news.length < 1) {
    return <h1>Loading...</h1>;
  }

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
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          onClick={() => {
            if (news.length > 4) {
              setDisplayedNews(news.slice(0, 4));
            }
          }}
        >
          <FaChevronLeft />
        </button>
        {displayedNews.map((news, index) => {
          return (
            <div
              key={index}
              className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
            >
              <div
                className={styles.imageWrapper}
                style={{
                  background: `#151515 url("${news.urlPhoto}") no-repeat center center`,
                  backgroundSize: "cover",
                  backgroundAttachment: "scroll",
                }}
              ></div>
              <div className={styles.descText}>{news.descriptionShort}</div>
            </div>
          );
        })}
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          onClick={() => {
            if (news.length > 4) {
              setDisplayedNews(news.slice(4, 8));
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
