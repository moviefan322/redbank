import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import DOMPurify from "dompurify";
import Event from "../types/Event";
import styles from "./OktoberFest.module.css";
import { formatTime } from "@/utils/formatTime";
import { Germania_One } from "next/font/google";

const germaniaOne = Germania_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

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

function OktoberFest(props: Props) {
  const event: Event | undefined = props.event;

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
        <h1
          className={`${germaniaOne.className} align-self-center ${styles.big} text-center`}
        >
          {event.title}
        </h1>
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
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
        {event.tiers.length > 0 && (
          <div>
            <h3
              className={`${germaniaOne.className} ${styles.big2} mx-auto mt-5 text-center`}
            >
              Thank You To Our Sponsors!
            </h3>
            <div className="d-flex flex-column mx-auto align-items-center justify-content-center mt-5">
              {event.tiers.map((tier, tierIndex) => (
                <div key={tierIndex} className="mb-5 mx-auto w-100 text-center">
                  <h1
                    className={`${germaniaOne.className} ${styles.big2} mx-auto`}
                  >
                    {tier.name}
                  </h1>
                  <div className="d-flex flex-row justify-content-around w-100">
                    {tier.sponsors.map((sponsor, sponsorIndex) => (
                      <div
                        key={sponsorIndex}
                        className="d-flex flex-column align-content-between justify-content-center w-100 p-3"
                      >
                        {sponsor.url ? (
                          <Link href={sponsor.url}>
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

export default OktoberFest;
