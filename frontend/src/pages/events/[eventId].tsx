import React, { Fragment } from "react";
import Head from "next/head";
import Event from "../../types/Event";

type Props = {
  event: Event;
};

function EventDetail(props: Props) {
  const event: Event | undefined = props.event;

  if (!event) {
    return (
      <div className="center">
        <h1>Loading..</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      {event.title}
      {event.date}
      {event.urlPhoto}
      {event.description}
      {event._id}
    </Fragment>
  );
}

export async function getStaticProps(context: any) {
  const eventId: string = context.params.eventId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${eventId}`
  );
  const event: Event | undefined = await response.json();

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // Example: Fetch a list of events
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
  );
  const events = await response.json();

  // Generate the paths we want to pre-render based on events
  const paths = events.map((event: Event) => ({
    params: { eventId: event._id.toString() },
  }));

  return { paths, fallback: "blocking" }; // or fallback: true/false
}

export default EventDetail;
