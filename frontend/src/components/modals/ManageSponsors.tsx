import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { shallowEqual } from "react-redux";
import { updateTiers } from "@/features/events/eventActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import AddSponsorForm from "./AddSponsorForm";
import EditSponsorForm from "./EditSponsorForm";
import UpdateEventTiersReq from "@/types/UpdateEventTiersReq";
import styles from "./PostNewCarouselItem.module.css";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Sponsor from "@/types/Sponsor";
import Tier from "@/types/Tier";

interface ManageSponsorsProps {
  isSponsorModalOpen: boolean;
  closeSponsorModal: () => void;
  eventId: string;
  onSponsorUpdate: (updatedTiers: Tier[]) => void;
}

const ManageSponsors = ({
  isSponsorModalOpen,
  closeSponsorModal,
  eventId,
  onSponsorUpdate,
}: ManageSponsorsProps) => {
  const [error, setError] = useState("");
  const [editTierIndex, setEditTierIndex] = useState<number | null>(null);
  const [activeAddSponsorForm, setActiveAddSponsorForm] = useState<
    number | null
  >(null);
  const [activeEditSponsorForm, setActiveEditSponsorForm] = useState<{
    tierIndex: number;
    sponsorIndex: number;
  } | null>(null);

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
      if (!eventData.tiers) {
        eventData.tiers = [];
      }
      setPostTierData({
        _id: eventId,
        tiers: eventData.tiers,
      });
    }
  }, [eventData, eventId]);

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closeSponsorModal();

    setActiveAddSponsorForm(null);
    setActiveEditSponsorForm(null);
  };

  const handleSubmitTiers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postTierData.tiers.length === 0) {
      const confirmDelete = window.confirm(
        "You have removed all tiers. Are you sure you want to submit with no tiers?"
      );
      if (!confirmDelete) {
        return;
      }
    }

    dispatch(updateTiers(postTierData));
    onSponsorUpdate(postTierData.tiers);
    handleCloseModal();
    setError("");
  };

  const handleTierNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTiers = [...postTierData.tiers].map((tier, i) =>
      i === index ? { ...tier, name: e.target.value } : tier
    );
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

    if (!postTierData.tiers) {
      setError("Tiers not initialized. Please try again.");
      return;
    }

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

    setActiveAddSponsorForm(null);
    setActiveEditSponsorForm(null);
  };

  const deleteLastTier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTiers = postTierData.tiers.slice(0, -1);

    setPostTierData({ ...postTierData, tiers: newTiers });

    if (activeAddSponsorForm === postTierData.tiers.length - 1) {
      setActiveAddSponsorForm(null);
    }
    if (
      activeEditSponsorForm &&
      activeEditSponsorForm.tierIndex === postTierData.tiers.length - 1
    ) {
      setActiveEditSponsorForm(null);
    }
  };

  const clearEventTiers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostTierData({ ...postTierData, tiers: [] });
  };

  const toggleAddSponsorForm = (index: number) => {
    setActiveAddSponsorForm((prev) => (prev === index ? null : index));
  };

  const addSponsor = (index: number, sponsor: Sponsor) => {
    if (!postTierData.tiers || postTierData.tiers.length <= index) {
      setError("Unable to add sponsor. Please try again.");
      return;
    }

    setPostTierData((prevData) => {
      const newTiers = prevData.tiers.map((tier, i) =>
        i === index ? { ...tier, sponsors: [...tier.sponsors, sponsor] } : tier
      );
      return { ...prevData, tiers: newTiers };
    });

    setActiveAddSponsorForm(null);
    setActiveEditSponsorForm(null);
  };

  const deleteSponsor = (tierIndex: number, sponsorIndex: number) => {
    setPostTierData((prevData) => {
      const newTiers = prevData.tiers.map((tier, i) => {
        if (i === tierIndex) {
          const newSponsors = tier.sponsors.filter(
            (_, j) => j !== sponsorIndex
          );
          return { ...tier, sponsors: newSponsors };
        }
        return tier;
      });
      return { ...prevData, tiers: newTiers };
    });

    // If the deleted sponsor was the active edit sponsor, reset the active edit form
    if (
      activeEditSponsorForm &&
      activeEditSponsorForm.tierIndex === tierIndex &&
      activeEditSponsorForm.sponsorIndex === sponsorIndex
    ) {
      setActiveEditSponsorForm(null);
    } else if (
      activeEditSponsorForm &&
      activeEditSponsorForm.tierIndex === tierIndex &&
      activeEditSponsorForm.sponsorIndex > sponsorIndex
    ) {
      // Adjust the sponsor index after deletion
      setActiveEditSponsorForm((prev) =>
        prev ? { ...prev, sponsorIndex: prev.sponsorIndex - 1 } : null
      );
    }
  };

  const toggleEditSponsorForm = (tierIndex: number, sponsorIndex: number) => {
    setActiveEditSponsorForm((prev) =>
      prev && prev.tierIndex === tierIndex && prev.sponsorIndex === sponsorIndex
        ? null
        : { tierIndex, sponsorIndex }
    );
  };

  const updateSponsorData = (
    tierIndex: number,
    sponsorIndex: number,
    updatedSponsor: Sponsor,
    newTierIndex: number,
    newPositionIndex: number
  ) => {
    setPostTierData((prevData) => {
      // Make a deep copy of the tiers array
      const newTiers = prevData.tiers.map((tier) => ({
        ...tier,
        sponsors: [...tier.sponsors],
      }));

      // Remove sponsor from the original tier
      const [movedSponsor] = newTiers[tierIndex].sponsors.splice(
        sponsorIndex,
        1
      );

      // Clone the moved sponsor to avoid mutating the original object
      const modifiedSponsor: Sponsor = {
        ...movedSponsor,
        name: updatedSponsor.name,
        image: {
          imageUrl: updatedSponsor.image.imageUrl,
          height: updatedSponsor.image.height,
          width: updatedSponsor.image.width,
          borderRadius: updatedSponsor.image.borderRadius,
        },
        url: updatedSponsor.url,
      };

      // If the sponsor is moving to a different tier, update the new tier's sponsors
      if (newTierIndex !== tierIndex) {
        newTiers[newTierIndex].sponsors.splice(
          newPositionIndex,
          0,
          modifiedSponsor
        );
      } else {
        // If staying within the same tier, insert the sponsor at the new position
        newTiers[tierIndex].sponsors.splice(
          newPositionIndex,
          0,
          modifiedSponsor
        );
      }

      return { ...prevData, tiers: newTiers };
    });
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

  console.log(activeAddSponsorForm, activeEditSponsorForm);

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
                      <li className="mx-auto" key={index}>
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
                                className="limeButtIcon"
                              >
                                <IoIosCheckmarkCircle />
                              </button>
                            </>
                          )}
                          {index === postTierData.tiers.length - 1 && (
                            <button
                              type="button"
                              onClick={deleteLastTier}
                              className="limeButtIcon"
                            >
                              <FaTrashCan />
                            </button>
                          )}
                        </div>
                        <ul className="d-flex flex-column align-items-center justify-content-center list-unstyled">
                          {tier.sponsors.length > 0 && (
                            <div className="d-flex flex-row">
                              {tier.sponsors.map((sponsor, sponsorIndex) => (
                                <li key={sponsorIndex}>
                                  <div>{sponsor.name}</div>
                                  {sponsor.image && (
                                    <div
                                      className="imagePreview mx-auto"
                                      style={{
                                        width: `${sponsor.image.width}px`,
                                        height: `${sponsor.image.height}px`,
                                        backgroundImage: `url(${sponsor.image.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        borderRadius: `${sponsor.image.borderRadius}%`,
                                      }}
                                    ></div>
                                  )}
                                  {activeEditSponsorForm?.tierIndex === index &&
                                  activeEditSponsorForm?.sponsorIndex ===
                                    sponsorIndex ? (
                                    <EditSponsorForm
                                      sponsorIndex={sponsorIndex}
                                      tierIndex={index}
                                      sponsor={sponsor}
                                      updateSponsor={updateSponsorData}
                                      toggleEditSponsorForm={toggleEditSponsorForm.bind(
                                        null,
                                        index,
                                        sponsorIndex
                                      )}
                                      tiers={postTierData.tiers}
                                    />
                                  ) : (
                                    <div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleEditSponsorForm(
                                            index,
                                            sponsorIndex
                                          )
                                        }
                                        className="limeButtIcon"
                                      >
                                        <FaPencil />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteSponsor(index, sponsorIndex)
                                        }
                                        className="limeButtIcon"
                                      >
                                        <FaTrashCan />
                                      </button>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </div>
                          )}
                          {activeAddSponsorForm !== index && (
                            <button
                              className="btn-admin mx-auto"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleAddSponsorForm(index);
                              }}
                            >
                              Add Sponsor
                            </button>
                          )}
                          <div>
                            {activeAddSponsorForm === index && (
                              <AddSponsorForm
                                index={index}
                                addSponsor={addSponsor}
                                toggleAddSponsorForm={toggleAddSponsorForm}
                              />
                            )}
                          </div>
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
                    <button
                      className="btn-admin"
                      type="button"
                      onClick={postDefaultTiers}
                    >
                      Yes
                    </button>
                    <button
                      className="btn-admin"
                      type="button"
                      onClick={postDefaultTier}
                    >
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
