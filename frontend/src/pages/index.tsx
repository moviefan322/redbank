import React, { useEffect } from "react";
import Carousel from "@/components/Carousel";
import Greetings from "@/components/Greetings";
import News from "@/components/News";
import Upcoming from "@/components/Upcoming";
import OpenBiz from "@/components/OpenBiz";
import Subscribe from "@/components/Subscribe";
import Foot from "@/components/Foot";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/test");
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Use .text() if the response is not JSON
        console.log(data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Carousel />
      <hr className="w-75 mx-auto" />
      <Upcoming />
      <News />
      <hr className="w-75 mx-auto" />
      <OpenBiz />
      <Subscribe />
      <Foot />
    </>
  );
}
