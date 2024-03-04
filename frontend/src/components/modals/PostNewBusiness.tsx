import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postBusiness } from "@/features/businesses/businessActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import PostBusinessReq from "@/types/PostBusinessReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewBusinessProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postBusinessData: PostBusinessReq;
  setPostBusinessData: (data: PostBusinessReq) => void;
}

const PostNewBusiness = ({
  postModalOpen,
  closePostModal,
  postBusinessData,
  setPostBusinessData,
}: PostNewBusinessProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postBusiness(postBusinessData));
    handleCloseModal();
    setError("");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New Business</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-row`}>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Name:</p>
                  <input
                    placeholder="Name"
                    value={postBusinessData.name}
                    onChange={(e) =>
                      setPostBusinessData({
                        ...postBusinessData,
                        name: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Address:</p>
                  <input
                    placeholder="Address"
                    value={postBusinessData.address}
                    onChange={(e) =>
                      setPostBusinessData({
                        ...postBusinessData,
                        address: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Phone #:</p>
                  <input
                    placeholder="Phone #"
                    value={postBusinessData.phoneNumber}
                    onChange={(e) =>
                      setPostBusinessData({
                        ...postBusinessData,
                        phoneNumber: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  {" "}
                  <p>Website:</p>
                  <input
                    placeholder="Website"
                    value={postBusinessData.website}
                    onChange={(e) =>
                      setPostBusinessData({
                        ...postBusinessData,
                        website: e.target.value,
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

export default PostNewBusiness;
