import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postLodging } from "@/features/lodging/lodgingActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import PostLodgingReq from "@/types/PostLodgingReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewLodgingProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postLodgingData: PostLodgingReq;
  setPostLodgingData: (data: PostLodgingReq) => void;
}

const PostNewLodging = ({
  postModalOpen,
  closePostModal,
  postLodgingData,
  setPostLodgingData,
}: PostNewLodgingProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postLodging(postLodgingData));
    handleCloseModal();
    setError("");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New Lodging</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-column flex-md-row`}>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Name:</p>
                  <input
                    placeholder="Name"
                    value={postLodgingData.name}
                    onChange={(e) =>
                      setPostLodgingData({
                        ...postLodgingData,
                        name: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Address:</p>
                  <input
                    placeholder="Address"
                    value={postLodgingData.address}
                    onChange={(e) =>
                      setPostLodgingData({
                        ...postLodgingData,
                        address: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Phone #:</p>
                  <input
                    placeholder="Phone #"
                    value={postLodgingData.phoneNumber}
                    onChange={(e) =>
                      setPostLodgingData({
                        ...postLodgingData,
                        phoneNumber: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Website:</p>
                  <input
                    placeholder="Website"
                    value={postLodgingData.website}
                    onChange={(e) =>
                      setPostLodgingData({
                        ...postLodgingData,
                        website: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>City:</p>
                  <input
                    placeholder="City"
                    value={postLodgingData.city}
                    onChange={(e) =>
                      setPostLodgingData({
                        ...postLodgingData,
                        city: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>Description:</p>
                  <textarea
                    placeholder="Description"
                    value={postLodgingData.description}
                    onChange={(e) =>
                      setPostLodgingData({
                        ...postLodgingData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
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

export default PostNewLodging;
