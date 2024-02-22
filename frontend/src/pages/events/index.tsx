import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps } from "next";
import Event from "@/types/Event";

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

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <div>
        {/* <EventSearch onSearch={findEventsHandler} /> */}
        {allEvents.map((event) => {
          return (
            <div key={event._id}>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
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
