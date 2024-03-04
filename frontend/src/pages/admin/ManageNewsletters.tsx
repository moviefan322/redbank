import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/news/newsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllNewsletters,
  updateNewsletter,
} from "@/features/newsletter/newsletterActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
import ImageUploader from "@/components/ImageUploader";
import SorryDave from "@/components/SorryDave";
import NewsletterComponent from "@/components/Newsletter";
import { FaCircleArrowLeft } from "react-icons/fa6";
import UpdateNewsletterReq from "@/types/UpdateNewsletterReq";
import Newsletter from "@/types/Newsletter";
import styles from "./ManageNews.module.css";

const ManageNews = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [updateNewsletterData, setUpdateNewsletterData] =
    useState<UpdateNewsletterReq>({
      _id: "",
      imageUrl: "", // Add the 'imageUrl' property
    });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { newsletters, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.newsletters,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllNewsletters());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  // Modals

  const openPreviewModal = () => setPreviewModalOpen(true);
  const closePreviewModal = () => setPreviewModalOpen(false);

  // Logic

  useEffect(() => {
    dispatch(getAllNewsletters());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateNewsletterData({
      _id: "",
      imageUrl: "",
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    const currentNewsletter = newsletters[index];
    setUpdateNewsletterData({
      _id: currentNewsletter._id,
      imageUrl: currentNewsletter.imageUrl,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    dispatch(updateNewsletter(updateNewsletterData));
    setEditModeIndex(null);
    setSubmitError("");
  };

  if (!isLoggedIn) {
    return <SorryDave />;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin">
      {loading && <Loading />}
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-center pb-5 w-100">
          <Link className="admin-link" href="/admin">
            <button className="mt-5 d-flex flex-row align-items-center btn-admin">
              <FaCircleArrowLeft size={20} className="me-2" /> Back to Admin
              Portal
            </button>
          </Link>
        </div>
        <div className="w-100">
          <Modal
            isOpen={isPreviewModalOpen}
            onClose={closePreviewModal}
            customStyle={{ minWidth: "100%", color: "black" }}
          >
            <NewsletterComponent />
          </Modal>
        </div>
        <h1 className={`${styles.header} mb-5 p-3 mx-3 text-center`}>
          Newsletter Management Desk
        </h1>
        <div className="d-flex flex-row justify-content-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View Newsletters
          </button>
        </div>

        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Newsletters</h2>
          <small>
            *Only upload photos here, for other modifications please make
            changes on mailchimp
          </small>
          <div className="d-flex flex-column align-items-center">
            {newsletters.map((item: Newsletter, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-3 w-100"
              >
                <div className="d-flex flex-column align-items-center w-100">
                  <div
                    className={`${styles.newsItem} d-flex flex-column flex-md-row w-100 align-items-center`}
                  >
                    <div
                      className="align-self-center mb-5 mb-md-0"
                      style={{
                        height: "200px",
                        width: "200px",
                        background: `#151515 url("${
                          editModeIndex === index
                            ? updateNewsletterData.imageUrl
                            : item.imageUrl
                        }") no-repeat center center / cover`,
                        backgroundAttachment: "scroll",
                      }}
                    ></div>
                    {editModeIndex === index ? (
                      <div
                        className={`ms-0 ms-md-5 text-center w-100 mx-5 d-flex d-md-block flex-column justify-content-center align-items-center mx-auto`}
                      >
                        {submitError && submitError}
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Text:</p>
                          <p className="mx-4 text-white">{item.subject_line}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Date Posted:</p>
                          <p className="text-white">
                            {new Date(item.create_time).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Link:</p>
                          <p className="text-white">{item.url}</p>
                        </div>
                        <div className="float-end">
                          <div className="justify-self-end w-100 flex-grow-2">
                            <ImageUploader
                              data={updateNewsletterData}
                              setData={setUpdateNewsletterData}
                              buttonText="Upload New Image"
                              imageParam={"imageUrl"}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-0 ms-md-5 w-75 align-self-center">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center justify-content-center mx-auto">
                          {" "}
                          <p className="col-12 col-md-4">Text:</p>
                          <p className="text-white">{item.subject_line}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Date Posted:</p>
                          <p className="text-white">
                            {new Date(item.create_time).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Link:</p>
                          <p className="text-white">{item.url}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 d-flex flex-row justify-content-center w-100">
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
                          className="btn btn-warning ms-5"
                          onClick={() => handleEditModeButton(index)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center pb-5 w-100">
          <Link className="admin-link" href="/admin">
            <button className="mb-5 d-flex flex-row align-items-center btn-admin">
              <FaCircleArrowLeft size={20} className="me-2" /> Back to Admin
              Portal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageNews;
