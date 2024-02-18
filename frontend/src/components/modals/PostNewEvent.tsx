import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postEvent } from "@/features/events/eventActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import ImageUploader from "../ImageUploader";
import PostEventReq from "@/types/PostEventReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewEventProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postEventData: PostEventReq;
  setPostEventData: (data: PostEventReq) => void;
}

const PostNewEvent = ({
  postModalOpen,
  closePostModal,
  postEventData,
  setPostEventData,
}: PostNewEventProps) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const validateData = () => {
    console.log("validation triggered");
    if (!postEventData.title.trim()) return "Title is required.";
    if (year === "" || month === "" || day === "") return "Date is required.";
    if (!postEventData.link.trim()) return "Link is required.";
    if (
      !postEventData.urlPhoto.trim() ||
      !postEventData.urlPhoto.startsWith("http")
    )
      if (!postEventData.description.trim()) return "Description is required.";
    if (!postEventData.descriptionShort.trim())
      return "Short description is required.";
    return "";
  };

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T00:00:00`;

    const updatedPostEventData = {
      ...postEventData,
      date: new Date(formattedDate).toISOString(),
    };

    dispatch(postEvent(updatedPostEventData));
    handleCloseModal();
    setError("");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New Event</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-row`}>
              <div
                className="w-50"
                style={{
                  height: "200px",
                  width: "200px",
                  background: `#151515 url("${postEventData.urlPhoto}") no-repeat center center / contain`,
                }}
              ></div>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>title:</p>
                  <input
                    placeholder="Title"
                    value={postEventData.title}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        title: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <p>Date:</p>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="">Month</option>
                    {[...Array(12)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {new Date(0, index).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                  <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
                    {[...Array(31)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    {[...Array(10)].map((_, index) => {
                      const year = new Date().getFullYear() + index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Time:</p>
                  <input
                    placeholder="Event time"
                    value={postEventData.startTime?.toISOString()}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        startTime: new Date(e.target.value),
                      })
                    }
                  ></input>
                </div> */}
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Link:</p>
                  <input
                    placeholder="Event link"
                    value={postEventData.link}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        link: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Short Description:</p>
                  <input
                    placeholder="Short description"
                    value={postEventData.descriptionShort}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        descriptionShort: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Full Description:</p>
                  <input
                    placeholder="Fill description"
                    value={postEventData.description}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        description: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-inline">
                  <div className="d-flex flex-row justify-content-between">
                    <p className="w-100">Upload Image:</p>{" "}
                    <div className="justify-self-end w-100 flex-grow-2">
                      <ImageUploader
                        data={postEventData}
                        setData={setPostEventData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-end">
              <button className="btn-admin-red ms-5" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn-admin ms-5">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PostNewEvent;
