/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./Upcoming.module.css";
import Link from "next/link";
import Event from "../types/Event";
import { formatTime } from "@/utils/formatTime";

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
    event.startTime && event.endTime && !event.endDate
      ? `| ${formatTime(event.startTime)} - ${formatTime(event.endTime)}`
      : ""
  }`;
};

const formatEndDate = (event: Event) => {
  if (!event.endDate) return "";
  return `${months2[new Date(event.endDate!).getMonth()]} ${new Date(
    event.endDate!
  ).getDate()}`;
};

const Upcoming = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [displayedStart, setDisplayedStart] = useState(0);
  const [displayedEnd, setDisplayedEnd] = useState(3);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
      );
      const data = await res.json();
      setEvents(data.filter((event: Event) => event.title !== "TEST"));
      setDisplayedEvents(data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisplayPrev3Events = () => {
    const newStart = Math.max(displayedStart - 3, 0);
    const newEnd = newStart + 3;
    setDisplayedStart(newStart);
    setDisplayedEnd(newEnd);
    setDisplayedEvents(events.slice(newStart, newEnd));
  };

  const handleDisplayNext3Events = () => {
    const newEnd = Math.min(displayedEnd + 3, events.length);
    const newStart = newEnd - 3;
    setDisplayedStart(newStart);
    setDisplayedEnd(newEnd);
    setDisplayedEvents(events.slice(newStart, newEnd));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (events.length < 1) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={`d-flex flex-column align-items-center py-5`}>
      <Link className="nostyle-link" href="/events">
        <h4 className={`fs-2 my-4 fw-bold`}>
          <u>EVENTS</u>
        </h4>
      </Link>
      <div
        className={`d-flex flex-column flex-md-row justify-content-around mx-auto mt-3 w-100`}
      >
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          disabled={displayedStart === 0}
          onClick={() => {
            if (events.length > 3) {
              handleDisplayPrev3Events();
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
                    backgroundSize: "cover", // Ensures the image covers the area, might cause "zooming" depending on aspect ratio
                    width: "250px",
                    height: "250px",
                  }}
                >
                  <div>
                    <p className={styles.overlayText}>
                      {months[new Date(event.date).getMonth()]} <br />
                      <span>{new Date(event.date).getDate()}</span>
                    </p>
                  </div>
                </div>
                <div className={styles.descText}>
                  <p>{event.title}</p>
                  <p>
                    {formatDate(event)}
                    {event.endDate ? " - " + formatEndDate(event) : ""}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
        <button
          className={`noStyleButt ${styles.arrowButt}`}
          disabled={displayedEnd === events.length}
          onClick={() => {
            if (events.length > 3) {
              handleDisplayNext3Events();
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
