/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import styles from "./Upcoming.module.css";
import Link from "next/link";
import Image from "next/image";

interface Event {
  _id: number;
  title: string;
  date: string;
  time: string;
  urlPhoto: string;
  link: string;
  descriptionShort: string;
  description: string;
}

const Upcoming = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
      );
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (events.length < 1) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container d-flex flex-column align-items-center pb-5">
      <h4 className={`${styles.newsh4} my-4 fw-bold`}>UPCOMING EVENTS</h4>
      <div className="row d-flex flex-row justify-content-around mx-auto mt-3">
        {events.map((event, index) => {
          return (
            <div
              key={index}
              className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
            >
              <div
                className={styles.imageWrapper}
                style={{
                  background: `#151515 url("${event.urlPhoto}") no-repeat center center`,
                  backgroundSize: "cover",
                  backgroundAttachment: "scroll",
                }}
              >
                <p className={styles.overlayText}>
                  {event.date.split("/")[0]} <br />
                  <span>{event.date.split("/")[1]}</span>
                </p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <h4>{event.title}</h4>
                <p>{event.descriptionShort}</p>
                <p className="text-primary align-self-start">Read More →</p>
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

export default Upcoming;
