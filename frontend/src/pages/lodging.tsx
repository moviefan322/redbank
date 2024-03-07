import React, { useState, useEffect } from "react";
import Lodging from "@/types/Lodging";
import { FaMapMarker } from "react-icons/fa";
import styles from "./lodging.module.css";

interface LodgingsByCity {
  [key: string]: Lodging[];
}

const Lodging = () => {
  const [lodging, setLodging] = useState<Lodging[]>([]);

  const fetchLodging = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lodging`
      );
      const data = await res.json();
      setLodging(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLodging();
  }, []);

  const redBankLodgings = lodging.filter((lodge) => lodge.city === "Red Bank");
  const otherLodgings = lodging.filter((lodge) => lodge.city !== "Red Bank");
  const lodgingsByCity: LodgingsByCity = otherLodgings.reduce((acc, lodge) => {
    const city = lodge.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(lodge);
    return acc;
  }, {} as LodgingsByCity);
  const otherLodgingsGrouped = Object.entries(lodgingsByCity).sort();

  if (!lodging) return <h1>Loading...</h1>;

  console.log(lodging);

  //https://res.cloudinary.com/dnaj4dehf/image/upload/v1709604640/hotel_avt7th.webp

  return (
    <>
      <div className={styles.imageBG}>
        <div
          className={`d-flex flex-column align-items-center ${styles.headerDiv}`}
        >
          <h1>Lodging</h1>
          <h6 className="text-center">Find A Place to Stay in Red Bank</h6>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center m-5">
        <div className="align-self-center align-self-md-start ms-md-5 my-5 col-12 col-md-10">
          <h2>
            <FaMapMarker /> Red Bank
          </h2>
          {redBankLodgings.map((lodge, index) => (
            <div
              className="col-12 my-4 border border-1 border-dark bg-gray p-3"
              key={index}
            >
              {lodge.description && <p>{lodge.description}</p>}
              <strong>{lodge.name}</strong>
              <p>{lodge.address}</p>
              <p>{lodge.phoneNumber.toString()}</p>
              <p>{lodge.website}</p>
            </div>
          ))}
        </div>

        {otherLodgingsGrouped.map(([city, lodges]) => (
          <React.Fragment key={city}>
            <div className="align-self-center align-self-md-start ms-5 my-5 col-12 col-md-10">
              <h2>
                <FaMapMarker /> {city}
              </h2>
              {lodges.map((lodge, index) => (
                <div
                  className="col-12 my-4 border border-1 border-dark bg-gray p-3"
                  key={index}
                >
                  {lodge.description && <p>{lodge.description}</p>}
                  <strong>{lodge.name}</strong>
                  <p>{lodge.address}</p>
                  <p>{lodge.phoneNumber && lodge.phoneNumber.toString()}</p>
                  <p>{lodge.website}</p>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Lodging;
