import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselItem from "@/types/CarouselItem";
import styles from "./ManageCarousel.module.css";

const ManageCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [linkText, setLinkText] = useState("");
  const [link, setLink] = useState("");
  const [sequenceNo, setSequenceNo] = useState(0);


  const dispatch = useDispatch();

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

  const handleRevert = () => {
    setEditModeIndex(null);
    setTitle("");
    setLinkText("");
    setLink("");
    setSequenceNo(0);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="py-5">Carousel Management Desk</h1>
      <div className="d-flex flex-column align-items-center">
        <h2 className="py-3">Current Carousel Items</h2>
        <div className="d-flex flex-column align-items-center">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center py-3"
            >
              <div className={`${styles.carouselItem} d-flex flex-row`}>
                <div
                  className="w-50"
                  style={{
                    height: "200px",
                    width: "200px",
                    background: `#151515 url("${item.urlPhoto}") no-repeat center center`,
                    backgroundSize: "cover",
                    backgroundAttachment: "scroll",
                  }}
                ></div>
                {editModeIndex === index ? (
                  <div className={`${styles.info} ms-5 w-75`}>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>title:</p>
                      <input placeholder={item.title}></input>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>link text:</p>
                      <input placeholder={item.linkText}></input>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>url endpoint:</p>
                      <input placeholder={item.link}></input>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>sequence number:</p>
                      <input placeholder={item.sequenceNo.toString()}></input>
                    </div>
                    <div className="float-end">
                      <button className="btn-admin">Upload New Photo</button>
                    </div>
                  </div>
                ) : (
                  <div className="ms-5 w-75">
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>title:</p>
                      <p>{item.title}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>link text:</p>
                      <p>{item.linkText}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>url endpoint:</p>
                      <p>{item.link}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      {" "}
                      <p>sequence number:</p>
                      <p>{item.sequenceNo}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 d-flex flex-row justify-content-end w-100">
                {editModeIndex === index ? (
                  <>
                    {" "}
                    <button className="btn btn-success">Save</button>
                    <button className="btn btn-danger ms-5" onClick={handleRevert}>Revert</button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      className="btn btn-warning"
                      onClick={() => setEditModeIndex(index)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger ms-5">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCarousel;
