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
  Events: any[];
}

const PostNewEvent = ({
  postModalOpen,
  closePostModal,
  postEventData,
  setPostEventData,
  Events,
}: PostNewEventProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const validateData = () => {
    console.log("validation triggered");
    if (!postEventData.title.trim()) return "Title is required.";
    if (!postEventData.date.trim()) return "Date is required.";
    if (!postEventData.time.trim()) return "Time is required.";
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

    dispatch(postEvent(postEventData));
    handleCloseModal();
    setError(""); // Clear any existing error
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
                  {" "}
                  <p>Date:</p>
                  <input
                    placeholder="Event date"
                    value={postEventData.date}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        date: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Time:</p>
                  <input
                    placeholder="Event time"
                    value={postEventData.time}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        time: e.target.value,
                      })
                    }
                  ></input>
                </div>
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
