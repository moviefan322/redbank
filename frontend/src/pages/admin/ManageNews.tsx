import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/news/newsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllNews,
  deleteNews,
  updateNews,
} from "@/features/news/newsActions";
import { shallowEqual } from "react-redux";
import DOMPurify from "dompurify";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
// import PostNewNews from "@/components/modals/PostNewNews";
import NewsComponent from "@/components/News";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostNewsReq from "@/types/PostNewsReq";
import UpdateNewsReq from "@/types/UpdateNewsReq";
import News from "@/types/News";
import styles from "./ManageNews.module.css";

const ManageNews = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [previewModeIndex, setPreviewModeIndex] = useState<number>(0);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [isSinglePreviewOpen, setSinglePreviewOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [isDescriptionValid, setDescriptionValid] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [updateNewsData, setUpdateNewsData] = useState<UpdateNewsReq>({
    _id: "",
    title: "",
    urlPhoto: "",
    link: "",
    description: "",
    descriptionShort: "",
    videoLink: "",
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

  const { news, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.news,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllNews());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postNewsData, setPostNewsData] = useState<PostNewsReq>({
    title: "",
    urlPhoto: "",
    link: "",
    description: "",
    descriptionShort: "",
  });

  // Modals

  const openPreviewModal = () => setPreviewModalOpen(true);
  const closePreviewModal = () => setPreviewModalOpen(false);
  const openPostModal = () => {
    setPostNewsData({
      title: "",
      urlPhoto: "",
      link: "",
      description: "",
      descriptionShort: "",
      videoLink: "",
    });
    setPostModalOpen(true);
  };
  const closePostModal = () => {
    setPostModalOpen(false);
    setPostNewsData({
      title: "",
      urlPhoto: "",
      link: "",
      description: "",
      descriptionShort: "",
      videoLink: "",
    });
  };
  const closeSinglePreviewModal = () => setSinglePreviewOpen(false);
  const openSinglePreviewModal = () => setSinglePreviewOpen(true);

  // Logic

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateNewsData({
      _id: "",
      title: "",
      urlPhoto: "",
      link: "",
      description: "",
      descriptionShort: "",
      videoLink: "",
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    const currentNews = news[index];
    setUpdateNewsData({
      _id: currentNews._id,
      title: currentNews.title,
      urlPhoto: currentNews.urlPhoto,
      link: currentNews.link,
      description: currentNews.description,
      descriptionShort: currentNews.descriptionShort,
      videoLink: currentNews.videoLink,
    });

    // Validate existing descriptions when entering edit mode
    const isDescriptionShortValid =
      currentNews.descriptionShort.trim().length > 0;
    const isDescriptionValid = currentNews.description.trim().length > 0;

    // Assume both descriptions need to be valid to enable the Save button
    setDescriptionValid(isDescriptionShortValid && isDescriptionValid);
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    dispatch(updateNews(updateNewsData));
    setEditModeIndex(null);
    setSubmitError("");
  };

  const handleDelete = () => {
    dispatch(deleteNews(currentItemId));
    setAreYouSureModalOpen(false);
  };

  const handleOpenPreview = (index: number) => {
    setPreviewModeIndex(index);
    openSinglePreviewModal();
  };

  const handleDescriptionChange = (e: any, type: any) => {
    const value = e.target.value;
    setUpdateNewsData((prev) => ({ ...prev, [type]: value }));

    if (type === "descriptionShort" || type === "description") {
      setDescriptionValid(value.trim().length > 0);
    }
  };

  const sanitizeData = (data: string) => {
    const sanitizedData = () => ({
      __html: DOMPurify.sanitize(data),
    });
    return <div dangerouslySetInnerHTML={sanitizedData()} />;
  };

  if (!isLoggedIn) {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="mx-3 text-center">
          {`I'm sorry Dave, I'm afraid I can't do that.`}
          You must <Link href="/admin">log in</Link> to access this page.
        </h1>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  console.log(updateNewsData);

  return (
    <>
      {loading && <Loading />}
      <div className="d-flex flex-column align-items-center">
        <Modal isOpen={isPreviewModalOpen} onClose={closePreviewModal}>
          <NewsComponent />
        </Modal>
        <h1 className={`${styles.header} my-5 p-3`}>News Management Desk</h1>
        <div className="d-flex flex-row justify-content-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View News
          </button>
          <button className="btn-success btn" onClick={openPostModal}>
            Add New Item
          </button>
        </div>

        {/* <PostNewNews
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postNewsData={postNewsData}
          setPostNewsData={setPostNewsData}
        /> */}
        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current News</h2>
          <div className="d-flex flex-column align-items-center">
            {news.map((item: News, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-3 w-100"
              >
                <div className="d-flex flex-column align-items-center">
                  <div className={`${styles.newsItem} d-flex flex-row`}>
                    <div
                      className="w-100 align-self-center"
                      style={{
                        height: "300px",
                        width: "300px",
                        background: `#151515 url("${item.urlPhoto}") no-repeat center center / cover`,
                        backgroundAttachment: "scroll",
                      }}
                    ></div>
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-75`}>
                        {submitError && submitError}
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p>Title:</p>
                          <input
                            placeholder={item.title}
                            value={updateNewsData.title}
                            onChange={(e) =>
                              setUpdateNewsData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="float-end">
                          <button className="btn-admin">
                            Upload New Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-5 w-75 align-self-center">
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p>Title:</p>
                          <p>{item.title}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {editModeIndex !== index ? (
                    <div className="w-75 my-3">
                      <div>Short Description: {item.descriptionShort}</div>
                      <div className="my-3">
                        {" "}
                        Full Description: {sanitizeData(item.description)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-75 my-3">
                      <div className="d-flex flex-column justify-content-between">
                        {" "}
                        <p>Short Description:</p>
                        <textarea
                          placeholder={item.descriptionShort}
                          value={updateNewsData.descriptionShort}
                          onChange={(e) =>
                            handleDescriptionChange(e, "descriptionShort")
                          }
                        ></textarea>
                      </div>
                      <div className="d-flex flex-column justify-content-between mt-3">
                        {" "}
                        <p>Full Description:</p>
                        <textarea
                          placeholder={item.description}
                          value={updateNewsData.description}
                          onChange={(e) =>
                            handleDescriptionChange(e, "description")
                          }
                        ></textarea>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 d-flex flex-row justify-content-center w-100">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleOpenPreview(index)}
                    >
                      Preview
                    </button>
                    <Modal
                      isOpen={isSinglePreviewOpen}
                      onClose={closeSinglePreviewModal}
                    >
                      <h1>News Preview</h1>
                    </Modal>
                    {editModeIndex === index ? (
                      <>
                        {" "}
                        <button
                          className="btn btn-success ms-5"
                          onClick={handleUpdate}
                          disabled={!isDescriptionValid}
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
                        <button
                          className="btn btn-danger ms-5"
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
