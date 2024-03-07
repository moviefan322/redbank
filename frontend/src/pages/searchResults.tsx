// pages/search-results.js
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/loading";
import News from "@/types/News";
import Event from "@/types/Event";
import Lodging from "@/types/Lodging";
import Business from "@/types/Business";
import styles from "./searchResults.module.css";

interface Results {
  news: News[];
  events: Event[];
  lodgings: Lodging[];
  businesses: Business[];
}

const SearchResultsPage = () => {
  const [results, setResults] = useState<Results | null>(null);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search?searchQuery=${query}`
      )
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [query]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
  };

  if (!results) {
    return <Loading />;
  }

  console.log(results);

  return (
    <div className="col-10 mx-auto">
      <h2 className="py-5">Search Results</h2>
      {results.news.length === 0 &&
        results.events.length === 0 &&
        results.lodgings.length === 0 &&
        results.businesses.length === 0 && (
          <p className="mb-5">{`No results found for "${query}"`}</p>
        )}
      {results.news.map((newsItem, index) => (
        <Link
          className="nostyle-link"
          key={index}
          href={`/news/${newsItem._id}`}
        >
          <div
            className={`mb-4 d-flex flex-column flex-md-row align-items-start justify-content-start`}
          >
            <div
              style={{
                backgroundColor: "#151515",
                backgroundImage: `url("${newsItem.urlPhoto}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                width: "125px",
                height: "125px",
              }}
            ></div>
            <div className="ms-5">
              <p className="mt-3 fw-bolder fs-5 mb-0">{newsItem.title}</p>
              <small className="mt-0">
                {new Date(newsItem.createdAt).toLocaleDateString()}
              </small>
              <br />
              <p>{truncateText(newsItem.description, 100)} </p>
            </div>
          </div>
        </Link>
      ))}
      {results.events.map((eventItem, index) => (
        <Link
          className="nostyle-link"
          key={index}
          href={`/events/${eventItem._id}`}
        >
          <div
            className={`mb-4 d-flex flex-column flex-md-row align-items-start justify-content-start`}
          >
            <div
              style={{
                backgroundColor: "#151515",
                backgroundImage: `url("${eventItem.urlPhoto}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                width: "125px",
                height: "125px",
              }}
            ></div>
            <div className="ms-5">
              <p className="mt-3 fw-bolder fs-5 mb-0">{eventItem.title}</p>
              <small className="mt-0">
                {new Date(eventItem.date).toLocaleDateString()}
              </small>
              <br />
              <p>{truncateText(eventItem.description, 100)} </p>
            </div>
          </div>
        </Link>
      ))}
      {results.lodgings.map((lodgingItem, index) => (
        <div
          key={index}
          className={`mb-4 d-flex flex-column flex-md-row align-items-start justify-content-start`}
        >
          -{" "}
          <div>
            <p>
              <strong>{lodgingItem.name}</strong> found in{" "}
              <Link href="/lodging">Lodging</Link>
            </p>
          </div>
        </div>
      ))}
      {results.businesses.map((businessItem, index) => (
        <div
          key={index}
          className={`mb-4 d-flex flex-column flex-md-row align-items-start justify-content-start`}
        >
          -{" "}
          <div>
            <p>
              <strong>{businessItem.name}</strong> found in{" "}
              <Link href="/businessDirectory">Businesses Directory</Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
