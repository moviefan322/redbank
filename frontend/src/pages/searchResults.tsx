// pages/search-results.js
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading";
import News from "@/types/News";
import Event from "@/types/Event";
import Lodging from "@/types/Lodging";
import Business from "@/types/Business";

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

  console.log(results);

  if (!results) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Search Results</h2>
      {results.news.map((news) => (
        <div key={news._id}>
          <h3>{news.title}</h3>
          <p>{news.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
