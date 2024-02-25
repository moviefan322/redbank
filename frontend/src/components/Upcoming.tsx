/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./Upcoming.module.css";
import Link from "next/link";
import Event from "../types/Event";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const months2 = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (event: Event) => {
  return `${months2[new Date(event.date).getMonth()]} ${new Date(
    event.date
  ).getDate()} ${
    event.startTime && event.endTime
      ? `| ${event.startTime} - ${event.endTime}`
      : ""
  }`;
};

const Upcoming = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
      );
      const data = await res.json();
      setEvents(data);
      setDisplayedEvents(data.slice(0, 3));
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
    <div className={`d-flex flex-column align-items-center pb-5`}>
      <h4
        className={`d-flex flex-row justify-content-center justify-content-md-start fs-2 my-4 fw-bold w-75`}
      >
        <u>EVENTS</u>
      </h4>
      <div
        className={`d-flex flex-column flex-md-row justify-content-around mx-auto mt-3 w-100`}
      >
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          onClick={() => {
            if (events.length > 3) {
              setDisplayedEvents(events.slice(0, 3));
            }
          }}
        >
          <FaChevronLeft />
        </button>
        {displayedEvents.map((event, index) => {
          return (
            <div
              key={index}
              className={`${styles.eventItem} mb-4 d-flex flex-column align-items-center justify-content-between`}
            >
              <Link className="nostyle-link" href={`/events/${event._id}`}>
                <div
                  className={styles.imageWrapper}
                  style={{
                    backgroundColor: "#151515",
                    backgroundImage: `url("${event.urlPhoto}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <p className={styles.overlayText}>
                    {months[new Date(event.date).getMonth()]} <br />
                    <span>{new Date(event.date).getDate()}</span>
                  </p>
                </div>
                <div className={styles.descText}>
                  <p>{event.title}</p>
                  <p>{formatDate(event)}</p>
                </div>
              </Link>
            </div>
          );
        })}
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          onClick={() => {
            if (events.length > 3) {
              setDisplayedEvents(events.slice(3, 8));
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
