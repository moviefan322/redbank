import React, { useState, useEffect } from "react";
import CarouselItem from "@/types/CarouselItem";

const ManageCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const fetchCarouselItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carouselItems`
      );
      const data = await response.json();
      setCarouselItems(data);
    } catch (error) {
      console.error("Error fetching carousel items: ", error);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);
  return (
    <div>
      <h1>Carousel Management Desk</h1>
    </div>
  );
};

export default ManageCarousel;
