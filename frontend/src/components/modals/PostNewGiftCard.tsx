import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postGiftCard } from "@/features/giftCards/giftCardActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import PostGiftCardReq from "@/types/PostGiftCardReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewGiftCardProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postGiftCardData: PostGiftCardReq;
  setPostGiftCardData: (data: PostGiftCardReq) => void;
}

const PostNewGiftCard = ({
  postModalOpen,
  closePostModal,
  postGiftCardData,
  setPostGiftCardData,
}: PostNewGiftCardProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postGiftCard(postGiftCardData));
    handleCloseModal();
    setError("");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New GiftCard</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-row`}>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Name:</p>
                  <input
                    placeholder="Name"
                    value={postGiftCardData.name}
                    onChange={(e) =>
                      setPostGiftCardData({
                        ...postGiftCardData,
                        name: e.target.value,
                      })
                    }
                  ></input>
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

export default PostNewGiftCard;
