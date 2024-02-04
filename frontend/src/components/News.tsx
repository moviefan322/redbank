/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./News.module.css";
import Image from "next/image";

const News = () => {
  return (
    <div className="container d-flex flex-column align-items-center pb-5">
      <h4 className={`${styles.newsh4} my-4 fw-bold`}>NEWS AND PROMOTIONS</h4>
      <div className="row mx-auto mt-3">
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <Image
            className="mb-2 align-self-center"
            src="/artisan.jpeg"
            height={250}
            width={290}
            alt="artisan crafting"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
          <h4 className={styles.newsHead}>
            ASBURY PARK'S CREATIVE COLLECTIVE POP-UP CALENDAR FOR JAN/FEB IS NOW
            AVAILABLE
          </h4>
          <p>
            Vendor Opportunity: Reserve your spot at Asbury Park's Creative
            Collective Pop-Up
          </p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <Image
            className="mb-2 align-self-center"
            src="/njcoffee.jpeg"
            height={250}
            width={290}
            alt="jersey coffee"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
          <h4 className={styles.newsHead}>
            BOARDWALK BEANS LISTED AMONG NJ.COM'S BEST COFFEE SHOPS IN NJ
          </h4>
          <p>Kudos to Boardwalk Beans for making the list!</p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <Image
            className="mb-2 align-self-center"
            src="/flower.jpeg"
            height={250}
            width={290}
            alt="artisan crafting"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
          <h4 className={styles.newsHead}>
            SEASIDE GREENERY CELEBRATES ITS GRAND OPENING ON FRI DEC 1ST
          </h4>
          <p>Join the celebration at Seaside Greenery's GRAND OPENING!</p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
        <div className="col-12 col-md-3 mb-4 d-flex flex-column align-items-center">
          <Image
            className="mb-2 align-self-center"
            src="/sword.jpeg"
            height={250}
            width={290}
            alt="artisan crafting"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
          <h4 className={styles.newsHead}>
            ASBURY PARK WELCOMES THE CREATIVE COLLECTIVE
          </h4>
          <p>
            The Creative Collective in Asbury Park will host an exclusive
            preview of their innovative new space.
          </p>
          <p className="text-primary align-self-start">Read More →</p>
        </div>
      </div>
      <div>
        <button className={`noStyleButt greenButt`}> ALL NEWS & PROMOTIONS</button>
      </div>
    </div>
  );
};

export default News;
