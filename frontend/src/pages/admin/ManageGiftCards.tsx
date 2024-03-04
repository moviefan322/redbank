import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/giftCards/giftCardSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllGiftCards,
  deleteGiftCard,
  updateGiftCard,
} from "@/features/giftCards/giftCardActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import SorryDave from "@/components/SorryDave";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
import PostNewGiftCard from "@/components/modals/PostNewGiftCard";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostGiftCardReq from "@/types/PostGiftCardReq";
import UpdateGiftCardReq from "@/types/UpdateGiftCardReq";
import GiftCard from "@/types/GiftCard";
import styles from "./ManageGiftCards.module.css";

const ManageGiftCards = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [updateGiftCardData, setUpdateGiftCardData] =
    useState<UpdateGiftCardReq>({
      _id: "",
      name: "",
    });

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { giftCards, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.giftCards,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllGiftCards());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postGiftCardData, setPostGiftCardData] = useState<PostGiftCardReq>({
    name: "",
  });

  // Modals
  const openPostModal = () => {
    setPostGiftCardData({
      name: "",
    });
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
    setPostGiftCardData({
      name: "",
    });
  };

  // Logic

  useEffect(() => {
    dispatch(getAllGiftCards());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateGiftCardData({
      _id: "",
      name: "",
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    const currentGiftCard = giftCards[index];
    setUpdateGiftCardData({
      _id: currentGiftCard._id,
      name: currentGiftCard.name,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();

    dispatch(updateGiftCard(updateGiftCardData));
    setEditModeIndex(null);
    setSubmitError("");
  };

  const handleDelete = () => {
    dispatch(deleteGiftCard(currentItemId));
    setAreYouSureModalOpen(false);
  };

  if (!isLoggedIn) {
    return <SorryDave />;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin">
      {loading && <Loading />}
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-center pb-5 w-100">
          <Link className="admin-link" href="/admin">
            <button className="mt-5 d-flex flex-row align-items-center btn-admin">
              <FaCircleArrowLeft size={20} className="me-2" /> Back to Admin
              Portal
            </button>
          </Link>
        </div>
        <h1 className={`${styles.header} mb-5 p-3 mx-4`}>
          GiftCard Management Desk
        </h1>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly w-100 mb-5">
          <button
            className="mt-4 mt-md-0 btn-success btn"
            onClick={openPostModal}
          >
            Add New Gift Card
          </button>
        </div>

        <PostNewGiftCard
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postGiftCardData={postGiftCardData}
          setPostGiftCardData={setPostGiftCardData}
        />

        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current GiftCards</h2>
          <div className="d-flex flex-column align-items-center">
            {giftCards.map((item: GiftCard, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-3 w-100"
              >
                <div className="d-flex flex-column align-items-center">
                  <div
                    className={`${styles.giftCardItem} d-flex flex-column flex-md-row`}
                  >
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-100`}>
                        {submitError && submitError}
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          {" "}
                          <p>Name:</p>
                          <input
                            placeholder={item.name}
                            value={updateGiftCardData.name}
                            onChange={(e) =>
                              setUpdateGiftCardData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-5 col-12 align-self-center">
                        <div className="d-flex flex-row justify-content-between">
                          {" "}
                          <p className="col-3 text-end">Name:</p>
                          <p className="text-white col-9 ms-3">{item.name}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 d-flex flex-column align-items-center flex-md-row justify-content-center w-100">
                    {editModeIndex === index ? (
                      <>
                        {" "}
                        <button
                          className="btn btn-success ms-0 ms-md-5 mt-4 mt-md-0"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-danger ms-0 ms-md-5 mt-4 mt-md-0"
                          onClick={handleRevert}
                        >
                          Revert
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <button
                          className="btn btn-warning ms-0 ms-md-5 mt-4 mt-md-0"
                          onClick={() => handleEditModeButton(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-0 ms-md-5 mt-4 mt-md-0"
                          onClick={() => {
                            setAreYouSureModalOpen(true);
                            setCurrentItemId(item._id);
                          }}
                        >
                          Delete
                        </button>
                        <Modal
                          isOpen={areYouSureModalOpen}
                          onClose={() => setAreYouSureModalOpen(false)}
                        >
                          <div className="d-flex flex-column text-center bg-dark p-5">
                            <h3>Are you sure you want to delete this item?</h3>
                            <div className="d-flex flex-row justify-content-around mt-2">
                              {" "}
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete()}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-success"
                                onClick={() => setAreYouSureModalOpen(false)}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center pb-5 w-100">
          <Link className="admin-link" href="/admin">
            <button className="mb-5 d-flex flex-row align-items-center btn-admin">
              <FaCircleArrowLeft size={20} className="me-2" /> Back to Admin
              Portal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageGiftCards;
