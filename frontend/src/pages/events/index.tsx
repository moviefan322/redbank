import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import Event from "@/types/Event";
import styles from "./index.module.css";

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

type Props = {
  events: Event[];
};

function EventsPage(props: Props): JSX.Element {
  const router = useRouter();
  const allEvents: Event[] = props.events;

  function findEventsHandler(year: string, month: string) {
    const fullPath: string = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  console.log(allEvents)

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <h1 className="text-center mt-5">Upcoming Events</h1>
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        {/* <EventSearch onSearch={findEventsHandler} /> */}
        {allEvents.filter((event) => event.title !== "TEST").map((event) => {
          return (
            <div
              key={event._id}
              className="d-flex flex-column align-items-center"
            >
              <Link href={`/events/${event._id}`} className="nostyle-link">
                <div
                  className={`${styles.imageWrapper} m-3`}
                  style={{
                    backgroundColor: "#151515",
                    backgroundImage: `url("${event.urlPhoto}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    width: "300px",
                    height: "300px",
                    position: "relative",
                  }}
                >
                  <div className={styles.overlayText}>
                    <h2>{event.title}</h2>
                    <p>
                      {months2[new Date(event.date).getMonth()]}{" "}
                      {new Date(event.date).getDate()}
                      {!event.allDay && (
                        <>
                          : {event.startTime} - {event.endTime}
                        </>
                      )}{" "}
                      <br />
                      {event.descriptionShort}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
  );
  const allEvents: Event[] = await response.json();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};

export default EventsPage;
