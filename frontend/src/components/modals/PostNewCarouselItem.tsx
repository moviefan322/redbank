import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postCarouselItem } from "@/features/carousel/carouselActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import ImageUploader from "../ImageUploader";
import PostCarouselItemReq from "@/types/PostCarouselItemReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewCarouselItemProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postCarouselData: PostCarouselItemReq;
  setPostCarouselData: (data: PostCarouselItemReq) => void;
  carouselItems: any[];
}

const PostNewCarouselItem = ({
  postModalOpen,
  closePostModal,
  postCarouselData,
  setPostCarouselData,
  carouselItems,
}: PostNewCarouselItemProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const validateData = () => {
    if (!postCarouselData.title.trim()) return "Title is required.";
    if (!postCarouselData.linkText.trim()) return "Link text is required.";
    if (!postCarouselData.link.trim()) return "Link is required.";
    if (
      !postCarouselData.urlPhoto.trim() ||
      !postCarouselData.urlPhoto.startsWith("http")
    )
      return "Valid photo URL is required.";
    if (
      postCarouselData.sequenceNo === null ||
      postCarouselData.sequenceNo! < 1
    )
      return "Sequence number is invalid.";
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

    dispatch(postCarouselItem(postCarouselData));
    handleCloseModal();
    setError(""); // Clear any existing error
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New Carousel Item</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-column flex-md-row align-items-center`}>
              <div
                style={{
                  height: "200px",
                  width: "200px",
                  background: `#151515 url("${postCarouselData.urlPhoto}") no-repeat center center / contain`,
                }}
              ></div>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>title:</p>
                  <input
                    placeholder="Title"
                    value={postCarouselData.title}
                    onChange={(e) =>
                      setPostCarouselData({
                        ...postCarouselData,
                        title: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>link text:</p>
                  <input
                    placeholder="Link Text"
                    value={postCarouselData.linkText}
                    onChange={(e) =>
                      setPostCarouselData({
                        ...postCarouselData,
                        linkText: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>url endpoint:</p>
                  <input
                    placeholder="URL"
                    value={postCarouselData.link}
                    onChange={(e) =>
                      setPostCarouselData({
                        ...postCarouselData,
                        link: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>sequence number:</p>
                  <input
                    type="number"
                    min="1"
                    max={carouselItems.length + 1}
                    value={
                      (postCarouselData.sequenceNo &&
                        postCarouselData.sequenceNo) ||
                      carouselItems.length + 1
                    }
                    onChange={(e) =>
                      setPostCarouselData({
                        ...postCarouselData,
                        sequenceNo: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="d-inline">
                  <div className="d-flex flex-row justify-content-between">
                    <p className="w-100">Upload Image:</p>{" "}
                    <div className="justify-self-end w-100 flex-grow-2">
                      <ImageUploader
                        data={postCarouselData}
                        setData={setPostCarouselData}
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

export default PostNewCarouselItem;
