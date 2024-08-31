import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateTiers } from "@/features/events/eventActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import UpdateEventTiersReq from "@/types/UpdateEventTiersReq";
import ImageUploader from "../ImageUploader";
// import PostSponsorReq from "@/types/PostSponsorReq";
import styles from "./Modal.module.css";

interface ManageSponsorsProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  eventId: string;
  sponsors: string[];
  tiers: string[];
}

const ManageSponsors = ({
  postModalOpen,
  closePostModal,
  eventId,
  sponsors,
  tiers,
}: ManageSponsorsProps) => {
  const [error, setError] = useState("");
  const [postTierData, setPostTierData] = useState<UpdateEventTiersReq>({
    _id: eventId,
    tiers,
  });
  const [postSponsorData, setPostSponsorData] = useState({});
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmitTiers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // make sure post tier data is not empty
    if (postTierData.tiers.length === 0) {
      setError("Please add at least one tier");
      return;
    }

    dispatch(updateTiers(postTierData));
    handleCloseModal();
    setError("");
  };

  const handleSubmitSponsor = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting sponsor");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmitSponsor}>
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
                    value="Nothing"
                    onChange={(e) => console.log(e.target.value)}
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

export default ManageSponsors;
