/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import Link from "next/link";

interface News {
  _id: number;
  title: string;
  urlPhoto: string;
  link: string;
  descriptionShort: string;
  description: string;
}

const News = () => {
  const [news, setNews] = useState<News[]>([]);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`
      );
      const data = await res.json();
      setNews(data);
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
    <div className="container d-flex flex-column align-items-center pb-5">
      <h4 className={`${styles.newsh4} my-4 fw-bold`}>NEWS</h4>
      <div className="row d-flex flex-row justify-content-around mx-auto mt-3">
        {news.map((news, index) => {
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
              <div className="d-flex flex-column align-items-center">
                <h4>{news.title}</h4>
                <p>{news.descriptionShort}</p>
                <Link href="/dummy">
                  <p className="text-primary align-self-start">Read More →</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button className={`noStyleButt greenButt`}> ALL EVENTS</button>
      </div>
    </div>
  );
};

export default News;
