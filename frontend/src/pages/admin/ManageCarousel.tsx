import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllCarouselItems,
  DeleteCarouselItem,
} from "@/features/carousel/carouselActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import PostNewCarouselItem from "@/components/modals/PostNewCarouselItem";
import CustomCarousel from "@/components/Carousel";
import PostCarouselItemReq from "@/types/PostCarouselItemReq";
import CarouselItem from "@/types/CarouselItem";
import styles from "./ManageCarousel.module.css";

const ManageCarousel = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [linkText, setLinkText] = useState("");
  const [link, setLink] = useState("");
  const [sequenceNo, setSequenceNo] = useState(0);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);

  const updateCarouselData = {
    title,
    linkText,
    link,
    sequenceNo,
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { carouselItems, loading, error } = useAppSelector(
    (state: any) => state.carousel,
    shallowEqual
  );

  const { isLoggedIn } = useAppSelector(
    (state: any) => state.auth,
    shallowEqual
  );

  const [postCarouselData, setPostCarouselData] = useState<PostCarouselItemReq>(
    {
      title: "",
      linkText: "",
      urlPhoto: "",
      link: "",
      sequenceNo: 0,
    }
  );

  const openPreviewModal = () => setPreviewModalOpen(true);
  const closePreviewModal = () => setPreviewModalOpen(false);
  const openPostModal = () => {
    setPostCarouselData((prevData) => ({
      ...prevData,
      sequenceNo: carouselItems.length + 1,
    }));
    setPostModalOpen(true);
  };
  const closePostModal = () => {
    setPostModalOpen(false);
    setPostCarouselData({
      title: "",
      linkText: "",
      urlPhoto: "",
      link: "",
      sequenceNo: null,
    });
  };

  useEffect(() => {
    dispatch(getAllCarouselItems());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setTitle("");
    setLinkText("");
    setLink("");
    setSequenceNo(0);
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    setTitle(carouselItems[index].title);
    setLinkText(carouselItems[index].linkText);
    setLink(carouselItems[index].link);
    setSequenceNo(carouselItems[index].sequenceNo);
  };

  const handleDelete = (index: number) => {
    dispatch(DeleteCarouselItem(carouselItems[index]._id));
    setAreYouSureModalOpen(false);
  };

  if (!isLoggedIn) {
    <h1>You are not logged in, Admin.... if that is your real name</h1>;
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Modal isOpen={isPreviewModalOpen} onClose={closePreviewModal}>
          <CustomCarousel />
        </Modal>
        <h1 className={`${styles.header} my-5 p-3`}>
          Carousel Management Desk
        </h1>
        <div className="d-flex flex-row justify-content-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View Carousel
          </button>

          <button className="btn-success btn" onClick={openPostModal}>
            Add New Item
          </button>
        </div>

        <PostNewCarouselItem
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postCarouselData={postCarouselData}
          setPostCarouselData={setPostCarouselData}
          carouselItems={carouselItems}
        />
        <div className="d-flex flex-column align-items-center">
          <h2 className="py-3">Current Carousel Items</h2>
          <div className="d-flex flex-column align-items-center">
            {carouselItems.map((item: CarouselItem, index: number) => (
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
                        <input
                          placeholder={item.title}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>link text:</p>
                        <input
                          placeholder={item.linkText}
                          value={linkText}
                          onChange={(e) => setLinkText(e.target.value)}
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>url endpoint:</p>
                        <input
                          placeholder={item.link}
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>sequence number:</p>
                        <input
                          type="number"
                          min="1" // Assuming sequence numbers start at 1
                          max={carouselItems.length} // Set the maximum value to the length of carouselItems
                          value={sequenceNo}
                          onChange={(e) =>
                            setSequenceNo(Number(e.target.value))
                          }
                        />
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
                  <button className="btn btn-secondary">Preview</button>
                  {editModeIndex === index ? (
                    <>
                      {" "}
                      <button className="btn btn-success ms-5">Save</button>
                      <button
                        className="btn btn-danger ms-5"
                        onClick={handleRevert}
                      >
                        Revert
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        className="btn btn-warning ms-5"
                        onClick={() => handleEditModeButton(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-5"
                        onClick={() => setAreYouSureModalOpen(true)}
                      >
                        Delete
                      </button>
                      <Modal
                        isOpen={areYouSureModalOpen}
                        onClose={() => setAreYouSureModalOpen(false)}
                      >
                        <div className="d-flex flex-column text-center bg-dark p-5">
                          <h3>Are you sure you want to delete this item?</h3>
                          <div className="d-flex flex-row justify-content-around mt-2">
                            {" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(index)}
                            >
                              Yes
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={() => setAreYouSureModalOpen(false)}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCarousel;
