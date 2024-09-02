import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { getEvent } from "@/features/events/eventActions";
import styles from "./test.module.css";
import { formatTime } from "@/utils/formatTime";
import Event from "@/types/Event";

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

function Test() {
  const dispatch = useAppDispatch();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await dispatch(getEvent("66d3ab437dc7fae6669f6581"));
      if (getEvent.fulfilled.match(result)) {
        setEvent(result.payload);
      } else {
        console.error(result.payload); // Handle errors appropriately
      }
      setLoading(false);
    };

    fetchEvent();
  }, [dispatch]);

  const sanitizeData = (data: string) => {
    const sanitizedData = () => ({
      __html: DOMPurify.sanitize(data),
    });
    return <div dangerouslySetInnerHTML={sanitizedData()} />;
  };

  if (!event) {
    return (
      <div className="center">
        <h1>Loading..</h1>
      </div>
    );
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
        <h1 className="align-self-center">{event.title}</h1>
        <h5>
          {months[new Date(event.date).getMonth()]}{" "}
          {new Date(event.date).getDate()}{" "}
          {event.endDate
            ? `- ${months[new Date(event.endDate).getMonth()]} ${new Date(
                event.endDate
              ).getDate()}`
            : ""}
          {!event.allDay! &&
            `@ ${formatTime(event.startTime!)}-${formatTime(event.endTime!)}`}
        </h5>
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
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
        <div>
          <h3 className="mt-5">Thank You To Our Sponsors!</h3>
          <div className="d-flex flex-column mx-auto align-items-center justify-content-center mt-5">
            {event.tiers.map((tier, tierIndex) => (
              <div key={tierIndex} className="mb-5 mx-auto w-100 text-center">
                <h5 className='mx-auto'>{tier.name}</h5>
                <div className="d-flex flex-row justify-content-around w-100">
                  {tier.sponsors.map((sponsor, sponsorIndex) => (
                    <div
                      key={sponsorIndex}
                      className="d-flex flex-column align-items-center"
                    >
                      <div
                        className="imagePreview mx-auto"
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Test;
