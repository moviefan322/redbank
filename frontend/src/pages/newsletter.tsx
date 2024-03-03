import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Newsletter from "@/types/Newsletter";
import styles from "./newsletter.module.css";

const NewsletterPage = () => {
  const [allNewsletters, setAllNewsletters] = useState<Newsletter[]>([]);

  const fetchNewsletters = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter`
      );
      const data = await res.json();
      setAllNewsletters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  console.log(allNewsletters);

  return (
    <div>
      <h1 className="text-center my-5">Red Bank Beat</h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {allNewsletters.map((newslettersItem, index) => {
          return (
            <div
              key={index}
              className={`${styles.newslettersItem} col-md-3 mb-4 d-flex flex-column align-items-center justify-content-between mx-5`}
            >
              <Link className="nostyle-link" href={newslettersItem.url}>
                <div
                  className={`${styles.imageWrapper} mx-auto`}
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
                  <p className="mt-3 text-center w-50 mx-auto">
                    {newslettersItem.subject_line}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsletterPage;
