import React, { useState, useEffect } from "react";
import { setLoading, resetSuccess } from "@/features/carousel/carouselSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllCarouselItems,
  deleteCarouselItem,
  updateCarouselItem,
} from "@/features/carousel/carouselActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
import PostNewCarouselItem from "@/components/modals/PostNewCarouselItem";
import CustomCarousel from "@/components/Carousel";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostCarouselItemReq from "@/types/PostCarouselItemReq";
import UpdateCarouselItemReq from "@/types/UpdateCarouselItemReq";
import CarouselItem from "@/types/CarouselItem";
import styles from "./ManageCarousel.module.css";

const ManageCarousel = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [previewModeIndex, setPreviewModeIndex] = useState<number>(0);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [isSinglePreviewOpen, setSinglePreviewOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [updateCarouselData, setUpdateCarouselData] =
    useState<UpdateCarouselItemReq>({
      _id: "",
      title: "",
      linkText: "",
      link: "",
      sequenceNo: 0,
    });

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { carouselItems, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.carousel,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllCarouselItems());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postCarouselData, setPostCarouselData] = useState<PostCarouselItemReq>(
    {
      title: "",
      linkText: "",
      urlPhoto: "",
      link: "",
      sequenceNo: 0,
    }
  );

  // Modals

  const openPreviewModal = () => setPreviewModalOpen(true);
  const closePreviewModal = () => setPreviewModalOpen(false);
  const openPostModal = () => {
    setPostCarouselData({
      title: "",
      linkText: "",
      urlPhoto: "",
      link: "",
      sequenceNo: carouselItems.length + 1,
    });
    setPostModalOpen(true);
  };
  const closePostModal = () => {
    setPostModalOpen(false);
    setPostCarouselData({
      title: "",
      linkText: "",
      urlPhoto: "",
      link: "",
      sequenceNo: 0,
    });
  };
  const closeSinglePreviewModal = () => setSinglePreviewOpen(false);
  const openSinglePreviewModal = () => setSinglePreviewOpen(true);

  // Logic

  useEffect(() => {
    dispatch(getAllCarouselItems());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateCarouselData({
      _id: "",
      title: "",
      linkText: "",
      link: "",
      sequenceNo: 0,
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    setUpdateCarouselData({
      _id: carouselItems[index]._id,
      title: carouselItems[index].title,
      linkText: carouselItems[index].linkText,
      link: carouselItems[index].link,
      sequenceNo: carouselItems[index].sequenceNo,
      urlPhoto: carouselItems[index].urlPhoto,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    dispatch(
      updateCarouselItem({
        ...updateCarouselData,
      })
    );
    setEditModeIndex(null);
  };

  const handleDelete = () => {
    dispatch(deleteCarouselItem(currentItemId));
    setAreYouSureModalOpen(false);
  };

  const handleOpenPreview = (index: number) => {
    setPreviewModeIndex(index);
    openSinglePreviewModal();
  };

  if (!isLoggedIn) {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="mx-3 text-center">
          You are not logged in, Admin.... if that is your real name
        </h1>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  console.log(currentItemId);

  return (
    <>
      {loading && <Loading />}
      <div className="d-flex flex-column align-items-center">
        <Modal isOpen={isPreviewModalOpen} onClose={closePreviewModal}>
          <CustomCarousel />
        </Modal>
        <h1 className={`${styles.header} my-5 p-3 text-center mx-3`}>
          Carousel Management Desk
        </h1>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View Carousel
          </button>

          <button
            className="btn-success btn mt-2 mt-md-0"
            onClick={openPostModal}
          >
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
        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current Carousel Items</h2>
          <div className="d-flex flex-column align-items-center">
            {carouselItems.map((item: CarouselItem, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3"
              >
                <div
                  className={`${styles.carouselItem} d-flex flex-column flex-md-row align-items-center `}
                >
                  <div
                    className="w-50"
                    style={{
                      height: "200px",
                      width: "200px",
                      background: `#151515 url("${item.urlPhoto}") no-repeat center center / cover`,
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
                          value={updateCarouselData.title}
                          onChange={(e) =>
                            setUpdateCarouselData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>link text:</p>
                        <input
                          placeholder={item.linkText}
                          value={updateCarouselData.linkText}
                          onChange={(e) =>
                            setUpdateCarouselData((prev) => ({
                              ...prev,
                              linkText: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>url endpoint:</p>
                        <input
                          placeholder={item.link}
                          value={updateCarouselData.link}
                          onChange={(e) =>
                            setUpdateCarouselData((prev) => ({
                              ...prev,
                              link: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>sequence number:</p>
                        <input
                          type="number"
                          min="1" // Assuming sequence numbers start at 1
                          max={carouselItems.length} // Set the maximum value to the length of carouselItems
                          value={updateCarouselData.sequenceNo!}
                          onChange={(e) =>
                            setUpdateCarouselData((prev) => ({
                              ...prev,
                              sequenceNo: +e.target.value,
                            }))
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
                <Modal
                  isOpen={isSinglePreviewOpen}
                  onClose={closeSinglePreviewModal}
                >
                  <Carousel id="myCarousel">
                    <Carousel.Item interval={5000}>
                      <div
                        className={`${styles.carouselItemPrev} d-flex flex-column justify-content-center align-items-center`}
                        style={{
                          height: "90vh",
                          background: `#151515 url("${
                            editModeIndex === previewModeIndex
                              ? updateCarouselData.urlPhoto
                              : carouselItems[previewModeIndex!].urlPhoto
                          }") no-repeat center center`,
                          backgroundSize: "cover",
                          backgroundAttachment: "scroll",
                        }}
                      >
                        <div className={`${styles.matte}`}></div>
                        <h1>
                          {editModeIndex === previewModeIndex
                            ? updateCarouselData.title
                            : carouselItems[previewModeIndex!].title}
                        </h1>
                        <Link
                          href={
                            editModeIndex === previewModeIndex
                              ? updateCarouselData.link
                              : carouselItems[previewModeIndex!].link
                          }
                          className={`${styles.carouselButt}`}
                        >
                          {editModeIndex === previewModeIndex
                            ? updateCarouselData.linkText
                            : carouselItems[previewModeIndex!].linkText}
                        </Link>
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </Modal>

                <div className="mt-4 d-flex flex-column flex-md-row justify-content-center align-items-center w-100">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpenPreview(index)}
                  >
                    Preview
                  </button>
                  {editModeIndex === index ? (
                    <>
                      {" "}
                      <button
                        className="btn btn-success ms-5"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
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
                        className="btn btn-warning ms-md-5 mt-2 mt-md-0"
                        onClick={() => handleEditModeButton(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-md-5 mt-2 mt-md-0"
                        onClick={() => {
                          setAreYouSureModalOpen(true);
                          setCurrentItemId(item._id);
                        }}
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
                              onClick={() => handleDelete()}
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
        <div className="d-flex flex-row justify-content-end pb-5 w-100">
          <Link className="admin-link" href="/admin">
            <button className="mb-5 d-flex flex-row align-items-center btn-admin">
              <FaCircleArrowLeft size={20} className="me-2" /> Back to Admin
              Portal
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManageCarousel;
