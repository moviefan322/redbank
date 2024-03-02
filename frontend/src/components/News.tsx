/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./News.module.css";
import News from "../types/News";

const Upcoming = () => {
  const [news, setNews] = useState<News[]>([]);
  const [displayedNews, setDisplayedNews] = useState<News[]>([]);
  const [displayedStart, setDisplayedStart] = useState(0);
  const [displayedEnd, setDisplayedEnd] = useState(3);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`
      );
      const data = await res.json();
      setNews(data);
      setDisplayedNews(data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDisplayPrev3News = () => {
    const newStart = Math.max(displayedStart - 3, 0);
    const newEnd = newStart + 3;
    setDisplayedStart(newStart);
    setDisplayedEnd(newEnd);
    setDisplayedNews(news.slice(newStart, newEnd));
  };

  const handleDisplayNext3News = () => {
    const newEnd = Math.min(displayedEnd + 3, news.length);
    const newStart = newEnd - 3;
    setDisplayedStart(newStart);
    setDisplayedEnd(newEnd);
    setDisplayedNews(news.slice(newStart, newEnd));
  };

  if (news.length < 1) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={`d-flex flex-column align-items-center pb-5`}>
      <Link className="nostyle-link" href="/news">
        <h4 className={`fs-2 my-4 fw-bold`}>
          <u>NEWS</u>
        </h4>
      </Link>
      <div
        className={`d-flex flex-column flex-md-row justify-content-around mx-auto mt-3 w-100`}
      >
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          disabled={displayedStart === 0}
          onClick={() => {
            if (news.length > 3) {
              handleDisplayPrev3News();
            }
          }}
        >
          <FaChevronLeft />
        </button>
        {displayedNews.map((newsItem, index) => {
          return (
            <div
              key={index}
              className={`${styles.newsItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
            >
              <Link className="nostyle-link" href={`/news/${newsItem._id}`}>
                <div
                  className={styles.imageWrapper}
                  style={{
                    backgroundColor: "#151515",
                    backgroundImage: `url("${newsItem.urlPhoto}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    width: "250px",
                    height: "250px",
                  }}
                ></div>
                <div className={styles.descText}>
                  <p className={`${styles.overlayText} mt-2`}>
                    {newsItem.createdAt
                      ? `${new Date(newsItem.createdAt).toLocaleDateString()}`
                      : ""}
                  </p>
                  <p className="mt-3 fw-bolder fs-5">{newsItem.title}</p>
                  <p className="text-start">{newsItem.descriptionShort}</p>
                </div>
              </Link>
            </div>
          );
        })}
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          disabled={displayedEnd === news.length}
          onClick={() => {
            if (news.length > 3) {
              handleDisplayNext3News();
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
