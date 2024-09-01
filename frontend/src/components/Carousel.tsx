import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import styles from "./Carousel.module.css";
import Link from "next/link";

interface CarouselItem {
  _id: string;
  link: string;
  urlPhoto: string;
  title: string;
  linkText: string;
  createdAt: string;
  updatedAt: string;
  sequenceNo: number;
  _v: number;
}

function CustomCarousel() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  }
  const fetchCarouselItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carouselItems`
      );
      const data = await response.json();
      setCarouselItems(data);
    } catch (error) {
      console.error("Error fetching carousel items: ", error);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  if (!carouselItems.length) {
    return <div>Loading...</div>;
  }

  return (
    <section id="testimonials" className="text-white">
      <Carousel id="myCarousel" slide>
        {carouselItems.map((item, index) => {
          return (
            <Carousel.Item key={index} interval={5000}>
              <div
                className={`${styles.carouselItem} d-flex flex-column justify-content-center align-items-center`}
                style={{
                  height: "40vh",
                  background: `#151515 url("${item.urlPhoto}") no-repeat center center`,
                  backgroundSize: "cover",
                }}
              >
                <div className={`${styles.matte}`}></div>
                <h1>{item.title}</h1>
                <Link href={item.link} className={`${styles.carouselButt}`}>
                  {item.linkText}
                </Link>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

export default CustomCarousel;
