import React from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { PostCarouselItem } from "@/features/carousel/carouselActions";
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
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(PostCarouselItem(postCarouselData));
    closePostModal();
    console.log("submit: ", postCarouselData);
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New Carousel Item</h2>
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-row`}>
              <div
                className="w-50"
                style={{
                  height: "200px",
                  width: "200px",
                  background: `#151515 url("${postCarouselData.urlPhoto}") no-repeat center center / contain`,
                }}
              ></div>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-row justify-content-between">
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
                <div className="d-flex flex-row justify-content-between">
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
                <div className="d-flex flex-row justify-content-between">
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
                <div className="d-flex flex-row justify-content-between">
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
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Photo URL:</p>
                  <input
                    type="text"
                    placeholder="URL"
                    value={postCarouselData.urlPhoto}
                    onChange={(e) =>
                      setPostCarouselData({
                        ...postCarouselData,
                        urlPhoto: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-end">
              <button className="btn-admin-red ms-5">Cancel</button>
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
