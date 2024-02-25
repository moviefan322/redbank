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
          disabled={displayedStart === 0}
          onClick={() => {
            if (news.length > 3) {
              handleDisplayPrev3News();
            }
          }}
        >
          <FaChevronLeft />
        </button>
        {displayedNews.map((news, index) => {
          return (
            <div
              key={index}
              className={`mb-4 d-flex flex-column align-items-center justify-content-between p-1`}
            >
              <Link className="nostyle-link" href={`/news/${news._id}`}>
                <div
                  style={{
                    backgroundColor: "#151515",
                    backgroundImage: `url("${news.urlPhoto}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    width: "250px",
                    height: "250px",
                  }}
                ></div>
                <div>
                  <p className="mt-3 fw-bolder fs-5">{news.title}</p>
                  <p className="text-start">{news.descriptionShort}</p>
                </div>
                <h6 className="mt-3"></h6>
                <div className={styles.descText}></div>
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
