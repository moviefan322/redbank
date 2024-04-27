import React, { useEffect, useState } from "react";
import Business from "@/types/Business";
import styles from "./businessDirectory.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BusinessDirectory = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
  };

  const filteredBusinesses = businesses
    .filter((business) =>
      selectedLetter
        ? business.name.toUpperCase().startsWith(selectedLetter)
        : true
    )
    .filter((business) =>
      searchQuery ? business.name.toUpperCase().includes(searchQuery) : true
    );

  const pageCount = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBusinesses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center mx-5 my-5">
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
      <div className="d-flex flex-row justify-content-between w-100 bg-brown my-5 p-3">
        <div className="d-none d-md-flex flex-row justify-content-around w-100 me-3">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterChange(letter)}
              className={selectedLetter === letter ? "active" : ""}
            >
              {letter}
            </button>
          ))}
          <button
            onClick={() => handleLetterChange("")}
            className={!selectedLetter ? "active" : ""}
          >
            All
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} // Convert to uppercase if you are doing case-insensitive comparison
            className="search-input"
          />
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center col-12">
        {currentItems.map((business, index) => (
          <div
            key={index}
            className="d-flex flex-column bg-brown m-3 justify-content-between align-items-center col-12 col-md-5 text-center text-white p-3"
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
        <span className="d-none d-md-block">
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
        </span>

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
