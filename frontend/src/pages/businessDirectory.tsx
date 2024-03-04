import React, { useEffect, useState } from "react";
import Business from "@/types/Business";

const BusinessDirectory = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const fetchBusinesses = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/businesses`
      );
      const data = await res.json();
      setBusinesses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  console.log(businesses);
  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center mx-auto mt-5">
      <div className="flex-column justify-content-center align-items-center mx-auto text-center">
        <h1>Business Directory</h1>
        <h5> RED BANK GIFT CARD PROGRAM:</h5>
        <h5 className="text-center">
          Red Bank Gift Cards are not currently on sale while we work on
          launching a new and improved program! In the meantime we still
          encourage you to shop and support local by purchasing a gift card
          directly from your favorite Red Bank restaurant or retailer.
        </h5>
      </div>
      <div className="w-100 bg-secondary my-5 p-3">SEARCH BAR</div>
      <div>
        {businesses.map((business, index) => (
          <div
            key={index}
            className="d-flex flex-column bg-brown m-3 justify-content-between align-items-center w-75 text-center text-white p-3"
          >
            <h3>{business.name}</h3>
            <h5>{business.address}</h5>
            <h5>{business.phoneNumber}</h5>
            <h5>{business.website}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessDirectory;
