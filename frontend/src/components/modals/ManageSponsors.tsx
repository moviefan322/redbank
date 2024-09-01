import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { shallowEqual } from "react-redux";
import { updateTiers } from "@/features/events/eventActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import UpdateEventTiersReq from "@/types/UpdateEventTiersReq";
import styles from "./PostNewCarouselItem.module.css";

interface ManageSponsorsProps {
  isSponsorModalOpen: boolean;
  closeSponsorModal: () => void;
  eventId: string;
}

const ManageSponsors = ({
  isSponsorModalOpen,
  closeSponsorModal,
  eventId,
}: ManageSponsorsProps) => {
  const [error, setError] = useState("");
  const [showAddTiers, setShowAddTiers] = useState(false);

  const { events, loading, selectorError, updateSuccess } = useAppSelector(
    (state: any) => state.events,
    shallowEqual
  );

  const eventData = events.find((event: any) => event._id === eventId);

  const [postTierData, setPostTierData] = useState<UpdateEventTiersReq>({
    _id: eventId,
    tiers: [],
  });
  const [postSponsorData, setPostSponsorData] = useState({});
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closeSponsorModal();
  };

  const handleSubmitTiers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postTierData.tiers.length === 0) {
      setError("Please add at least one tier");
      return;
    }

    dispatch(updateTiers(postTierData));
    handleCloseModal();
    setError("");
  };

  const handleSubmitSponsor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting sponsor");
    // Add your sponsor submission logic here
  };

  const handleAddTier = async (tiers: string[] = []) => {
    const tierData: UpdateEventTiersReq = {
      _id: eventId,
      tiers: tiers,
    };

    console.log("Dispatching updateTiers with:", tierData);

    const resultAction = await dispatch(updateTiers(tierData));

    if (updateTiers.fulfilled.match(resultAction)) {
      console.log("Tiers updated successfully:", resultAction.payload);
    } else {
      console.error("Failed to update tiers:", resultAction.payload);
    }
  };

  const postDefaultTiers = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleAddTier(["sponsors"]);
  };

  const clearEventTiers = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleAddTier([]);
  };

  if (!eventData) {
    return (
      <Modal isOpen={isSponsorModalOpen} onClose={handleCloseModal}>
        <div className={styles.modal}>
          <p>Event not found</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isSponsorModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmitSponsor}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Manage Sponsors</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-row`}>
              {eventData.tiers.length > 0 ? (
                <div>
                  <p>List of Tiers</p>
                  <ul>
                    {eventData.tiers.map((tier: string) => (
                      <li key={tier}>{tier}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center">
                  <p>Would you like to use tiered sponsorships?</p>
                  <div>
                    <button type="button" onClick={() => setShowAddTiers(true)}>
                      Yes
                    </button>
                    <button type="button" onClick={postDefaultTiers}>
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex flex-row justify-content-end">
              <button
                type="button"
                className="btn-admin-red ms-5"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn-admin ms-5">
                Submit
              </button>
            </div>
            <div className="d-flex flex-row justify-content-end">
              <button onClick={clearEventTiers} className="btn-admin-red ms-5">
                Clear All Tiers
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ManageSponsors;
