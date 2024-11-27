import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import Event from "../../types/Event";
import OktoberFest from "@/components/OktoberFest";
import styles from "./eventDetail.module.css";
import { formatTime } from "@/utils/formatTime";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  if (event.title === "Red Bank Oktoberfest") {
    return <OktoberFest event={event} />;
  }

  console.log(event);

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <div
        className={`${styles.eventDetail} d-flex flex-column justify-content-center align-items-center mb-5`}
      >
        <Link
          className="nostyle-link align-self-start mb-5 fw-bold"
          href="/events"
        >{`<< All Events`}</Link>
        <h1 className={`align-self-center`}>{event.title}</h1>
        <h4>
          {months[new Date(event.date).getMonth()]}{" "}
          {new Date(event.date).getDate()}{" "}
          {event.endDate
            ? `- ${months[new Date(event.endDate).getMonth()]} ${new Date(
                event.endDate
              ).getDate()}`
            : ""}
          {!event.allDay! &&
            `@ ${formatTime(event.startTime!)}-${formatTime(event.endTime!)}`}
        </h4>
        {event.rainDate && (
          <h5>
            Rain Date: {months[new Date(event.rainDate).getMonth()]}{" "}
            {new Date(event.rainDate).getDate()}{" "}
          </h5>
        )}

        <div
          className="m-3"
          style={{
            backgroundColor: "#151515",
            backgroundImage: `url("${event.urlPhoto}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            width: "300px",
            height: "300px",
          }}
        ></div>
        <h6>{event.descriptionShort}</h6>
        <div
          className="mb-5"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
        {event.urlPDF && (
          <a
            className="btn btn-primary border border-1 border-dark"
            style={{ backgroundColor: "#c41f35", color: "white", fontWeight: "bold", fontSize: 18 }}
            href={event.urlPDF}
            target="_blank"
            rel="noreferrer"
          >
            {event.pdfButtonText}
          </a>
        )}
        {event.tiers.length > 0 && (
          <div>
            <h2 className="mt-5 text-center">Thank You To Our Sponsors!</h2>
            <div className="d-flex flex-column mx-auto align-items-center justify-content-center mt-5">
              {event.tiers.map((tier, tierIndex) => (
                <div key={tierIndex} className="mb-5 mx-auto w-100 text-center">
                  <h3 className="mx-auto">{tier.name}</h3>
                  <div className="d-flex flex-md-row flex-column justify-content-around w-100">
                    {tier.sponsors.map((sponsor, sponsorIndex) => (
                      <div
                        key={sponsorIndex}
                        className="d-flex flex-column align-content-between justify-content-center w-100 p-3"
                      >
                        {sponsor.url ? (
                          <Link href={sponsor.url} passHref>
                            <div
                              className="imagePreview p-4 mx-auto"
                              style={{
                                width: `${sponsor.image.width}px`,
                                height: `${sponsor.image.height}px`,
                                backgroundImage: `url(${sponsor.image.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                borderRadius: `${sponsor.image.borderRadius}%`,
                              }}
                            ></div>
                          </Link>
                        ) : (
                          <div
                            className="imagePreview p-4 mx-auto"
                            style={{
                              width: `${sponsor.image.width}px`,
                              height: `${sponsor.image.height}px`,
                              backgroundImage: `url(${sponsor.image.imageUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              borderRadius: `${sponsor.image.borderRadius}%`,
                            }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
