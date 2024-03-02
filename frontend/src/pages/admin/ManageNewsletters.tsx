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
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="mx-3 text-center">
          {`I'm sorry Dave, I'm afraid I can't do that.`}
        </h1>
        <br />
        <br />
        <h5 className="text-center">
          You must <Link href="/admin">log in</Link> to access this page.
        </h5>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {loading && <Loading />}
      <div className="d-flex flex-column align-items-center">
        <div className="w-100">
          <Modal
            isOpen={isPreviewModalOpen}
            onClose={closePreviewModal}
            customStyle={{ minWidth: "100%", color: "black" }}
          >
            <NewsletterComponent />
          </Modal>
        </div>
        <h1 className={`${styles.header} my-5 p-3`}>
          Newsletter Management Desk
        </h1>
        <div className="d-flex flex-row justify-content-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View Newsletters
          </button>
        </div>

        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Newsletters</h2>
          <div className="d-flex flex-column align-items-center">
            {newsletters.map((item: Newsletter, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-3 w-100"
              >
                <div className="d-flex flex-column align-items-center w-100">
                  <div className={`${styles.newsItem} d-flex flex-row w-75`}>
                    <div
                      className="w-50 align-self-center"
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
                      <div className={`${styles.info} ms-5 w-100`}>
                        {submitError && submitError}
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p className="w-75">Text:</p>
                          <p className="text-end">{item.subject_line}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p>Date Posted:</p>
                          <p>
                            {new Date(item.create_time).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p>Link:</p>
                          <p>{item.url}</p>
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
                      <div className="ms-5 w-75 align-self-center">
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p className="w-75">Text:</p>
                          <p className="text-end">{item.subject_line}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p>Date Posted:</p>
                          <p>
                            {new Date(item.create_time).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p>Link:</p>
                          <p>{item.url}</p>
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

export default ManageNews;
