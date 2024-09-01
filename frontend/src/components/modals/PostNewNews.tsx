import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postNews } from "@/features/news/newsActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import ImageUploader from "../ImageUploader";
import PostNewsReq from "@/types/PostNewsReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewNewsProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postNewsData: PostNewsReq;
  setPostNewsData: (data: PostNewsReq) => void;
}

const PostNewNews = ({
  postModalOpen,
  closePostModal,
  postNewsData,
  setPostNewsData,
}: PostNewNewsProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const validateData = () => {
    if (!postNewsData.title.trim()) return "Title is required.";
    if (
      !postNewsData.urlPhoto.trim() ||
      !postNewsData.urlPhoto.startsWith("http")
    )
      return "Image is required";
    if (!postNewsData.description.trim()) return "Description is required.";
    if (!postNewsData.descriptionShort.trim())
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

    dispatch(postNews(postNewsData));
    handleCloseModal();
    setError("");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New News</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-column flex-md-row`}>
              <div
                className="w-100 align-self-center"
                style={{
                  height: "300px",
                  width: "300px",
                  background: `#151515 url("${postNewsData.urlPhoto}") no-repeat center center / contain`,
                }}
              ></div>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Title:</p>
                  <input
                    placeholder="Title"
                    value={postNewsData.title}
                    onChange={(e) =>
                      setPostNewsData({
                        ...postNewsData,
                        title: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Link:</p>
                  <input
                    placeholder="Link"
                    value={postNewsData.link}
                    onChange={(e) =>
                      setPostNewsData({
                        ...postNewsData,
                        link: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Link Text:</p>
                  <input
                    placeholder="Link Text"
                    value={postNewsData.linkText}
                    onChange={(e) =>
                      setPostNewsData({
                        ...postNewsData,
                        linkText: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Embedded Video URL:</p>
                  <input
                    placeholder="video link"
                    value={postNewsData.videoLink}
                    onChange={(e) =>
                      setPostNewsData({
                        ...postNewsData,
                        videoLink: e.target.value,
                      })
                    }
                  ></input>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center">
                  <p className="w-100 my-auto">Upload Image:</p>{" "}
                  <div className="justify-self-end w-100 flex-grow-2">
                    <ImageUploader
                      data={postNewsData}
                      setData={setPostNewsData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-75">
              <div className="d-flex flex-column justify-content-between">
                {" "}
                <p>Short Description:</p>
                <textarea
                  placeholder="Short description"
                  value={postNewsData.descriptionShort}
                  onChange={(e) =>
                    setPostNewsData({
                      ...postNewsData,
                      descriptionShort: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="d-flex flex-column justify-content-between">
                {" "}
                <p>Full Description:</p>
                <textarea
                  placeholder="Full description"
                  value={postNewsData.description}
                  onChange={(e) =>
                    setPostNewsData({
                      ...postNewsData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
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

export default PostNewNews;
