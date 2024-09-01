import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { shallowEqual } from "react-redux";
import { updateTiers } from "@/features/events/eventActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import AddSponsorForm from "./AddSponsorForm";
import UpdateEventTiersReq from "@/types/UpdateEventTiersReq";
import styles from "./PostNewCarouselItem.module.css";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";

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
  const [editTierIndex, setEditTierIndex] = useState<number | null>(null);
  const [visibleAddSponsorForms, setVisibleAddSponsorForms] = useState<
    boolean[]
  >([]);
  const { events } = useAppSelector((state: any) => state.events, shallowEqual);
  const eventData = events.find((event: any) => event._id === eventId);
  const [postTierData, setPostTierData] = useState<UpdateEventTiersReq>({
    _id: eventId,
    tiers: eventData?.tiers || [], // Initialize with current event tiers
  });
  const tierNames = ["Gold", "Silver", "Bronze", "Copper", "Tin"];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (eventData) {
      setPostTierData({
        _id: eventId,
        tiers: eventData.tiers,
      });
      setVisibleAddSponsorForms(new Array(eventData.tiers.length).fill(false));
    }
  }, [eventData, eventId]);

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

  const handleTierNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTiers = [...postTierData.tiers];
    newTiers[index].name = e.target.value; // Update the name of the tier
    setPostTierData({ ...postTierData, tiers: newTiers });
  };

  const handleEditTierConfirm = () => {
    dispatch(updateTiers(postTierData));
    setEditTierIndex(null);
  };

  const postDefaultTiers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostTierData({
      ...postTierData,
      tiers: tierNames.slice(0, 3).map((name) => ({ name, sponsors: [] })),
    });
  };

  const postDefaultTier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostTierData({
      ...postTierData,
      tiers: [{ name: "sponsors", sponsors: [] }],
    });
  };

  const handleAddTier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTiers = [
      ...postTierData.tiers,
      {
        name:
          tierNames[postTierData.tiers.length] ||
          `Tier ${postTierData.tiers.length + 1}`,
        sponsors: [],
      },
    ];
    setPostTierData({ ...postTierData, tiers: newTiers });
  };

  const deleteLastTier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTiers = postTierData.tiers.slice(0, -1);
    setPostTierData({ ...postTierData, tiers: newTiers });
  };

  const clearEventTiers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostTierData({ ...postTierData, tiers: [] });
  };

  const toggleAddSponsorForm = (index: number) => {
    setVisibleAddSponsorForms((prevState) =>
      prevState.map((visible, i) => (i === index ? !visible : visible))
    );
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
      <form onSubmit={handleSubmitTiers}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Manage Sponsors</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-row">
              {postTierData.tiers.length > 0 && (
                <div>
                  <ul className="d-flex flex-column justify-content-center text-center list-group list-unstyled">
                    {postTierData.tiers.map((tier, index) => (
                      <li className="w-50 mx-auto" key={index}>
                        <div className="d-flex flex-row justify-content-center">
                          {editTierIndex !== index ? (
                            <>
                              <h3 className="my-auto">{tier.name} </h3>
                              <button
                                type="button"
                                onClick={() => setEditTierIndex(index)}
                                className="limeButtIcon"
                              >
                                <FaPencil />
                              </button>
                            </>
                          ) : (
                            <>
                              <input
                                type="text"
                                value={tier.name}
                                onChange={(e) => handleTierNameChange(e, index)}
                              />
                              <button
                                type="button"
                                onClick={handleEditTierConfirm}
                              >
                                <IoIosCheckmarkCircle />
                              </button>
                            </>
                          )}
                          {index === postTierData.tiers.length - 1 && (
                            <button
                              onClick={deleteLastTier}
                              className="limeButtIcon"
                            >
                              <FaTrashCan />
                            </button>
                          )}
                        </div>
                        <ul>
                          {tier.sponsors.length > 0 && (
                            <li>
                              <p>Item</p>
                            </li>
                          )}
                          <button
                            className="btn-admin mx-auto"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleAddSponsorForm(index);
                            }}
                          >
                            {visibleAddSponsorForms[index]
                              ? "Hide Sponsor Form"
                              : "Add Sponsor"}
                          </button>
                          {visibleAddSponsorForms[index] && (
                            <AddSponsorForm
                              index={index}
                              setPostTierData={setPostTierData}
                            />
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              {postTierData.tiers.length < 1 && (
                <div className="text-center">
                  <p>Would you like to use tiered sponsorships?</p>
                  <div>
                    <button type="button" onClick={postDefaultTiers}>
                      Yes
                    </button>
                    <button type="button" onClick={postDefaultTier}>
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex flex-row">
              <div className="d-flex flex-row justify-content-center">
                <button
                  onClick={handleAddTier}
                  className="btn-admin ms-5"
                  disabled={postTierData.tiers.length >= tierNames.length}
                >
                  Add New Tier
                </button>
              </div>
              <div className="d-flex flex-row justify-content-center">
                <button
                  onClick={clearEventTiers}
                  className="btn-admin-red ms-5"
                >
                  Clear All Tiers
                </button>
              </div>
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
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ManageSponsors;
