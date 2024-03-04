import React, { useEffect, useState } from "react";
import Business from "@/types/Business";
import styles from "./businessDirectory.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BusinessDirectory = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

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

  // Calculate the total number of pages
  const pageCount = Math.ceil(businesses.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the businesses to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businesses.slice(indexOfFirstItem, indexOfLastItem);
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
      <div className="d-flex flex-wrap justify-content-center">
        {currentItems.map((business, index) => (
          <div
            key={index}
            className="d-flex flex-column bg-brown m-3 justify-content-between align-items-center col-5 text-center text-white p-3"
          >
            <h3>{business.name}</h3>
            <h5>{business.address}</h5>
            <h5>{business.phoneNumber}</h5>
            <h5>{business.website}</h5>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="noStyleButt"
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`${currentPage === number ? "active" : ""} ${
              styles.paginationButton
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="noStyleButt"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BusinessDirectory;
