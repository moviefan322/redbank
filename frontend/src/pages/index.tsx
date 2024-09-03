import React, { useEffect } from "react";
import Carousel from "@/components/Carousel";
import News from "@/components/News";
import Upcoming from "@/components/Upcoming";
import Newsletter from "@/components/Newsletter";
import Spinner from "@/components/modals/Spinner";
import {
  useAppSelector as useSelector,
} from "../hooks/reduxHooks";

export default function Home() {
  const events = useSelector((state) => state.events);

  const { loading } = events;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/test");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Use .text() if the response is not JSON
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Carousel />
      <Upcoming />
      <Newsletter />
      <News />
    </>
  );
}
