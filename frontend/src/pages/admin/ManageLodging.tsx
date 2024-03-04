import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/lodging/lodgingSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllLodging,
  deleteLodging,
  updateLodging,
} from "@/features/lodging/lodgingActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import SorryDave from "@/components/SorryDave";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
// import PostNewLodging from "@/components/modals/PostNewLodging";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostLodgingReq from "@/types/PostLodgingReq";
import UpdateLodgingReq from "@/types/UpdateLodgingReq";
import Lodging from "@/types/Lodging";
import styles from "./ManageLodging.module.css";

const ManageLodging = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [updateLodgingData, setUpdateLodgingData] = useState<UpdateLodgingReq>({
    _id: "",
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
  });

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { lodging, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.lodging,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllLodging());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postLodgingData, setPostLodgingData] = useState<PostLodgingReq>({
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    description: "",
    city: "",
  });

  // Modals
  const openPostModal = () => {
    setPostLodgingData({
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
      description: "",
      city: "",
    });
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
    setPostLodgingData({
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
      description: "",
      city: "",
    });
  };

  // Logic

  useEffect(() => {
    dispatch(getAllLodging());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateLodgingData({
      _id: "",
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
      description: "",
      city: "",
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    const currentLodging = lodging[index];
    setUpdateLodgingData({
      _id: currentLodging._id,
      name: currentLodging.name,
      address: currentLodging.address,
      phoneNumber: currentLodging.phoneNumber,
      website: currentLodging.website,
      description: currentLodging.description,
      city: currentLodging.city,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();

    dispatch(updateLodging(updateLodgingData));
    setEditModeIndex(null);
    setSubmitError("");
  };

  const handleDelete = () => {
    dispatch(deleteLodging(currentItemId));
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
        <h1 className={`${styles.header} mb-5 p-3`}>Lodging Management Desk</h1>
        <div className="d-flex flex-column align-items-center justify-content-evenly w-100 mb-5">
          <button
            className="mt-4 mt-md-0 btn-success btn"
            onClick={openPostModal}
          >
            Add New Lodging
          </button>
        </div>

        {/* <PostNewLodging
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postLodgingData={postLodgingData}
          setPostLodgingData={setPostLodgingData}
        /> */}

        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current Lodging</h2>
          <div className="d-flex flex-column align-items-center">
            {lodging.map((item: Lodging, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-0 mx-md-3"
              >
                <div className="d-flex flex-column align-items-center">
                  <div
                    className={`${styles.lodgingItem} d-flex flex-column flex-md-row`}
                  >
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-100`}>
                        {submitError && submitError}
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>Name:</p>
                          <input
                            placeholder={item.name}
                            value={updateLodgingData.name}
                            onChange={(e) =>
                              setUpdateLodgingData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>Address:</p>
                          <input
                            placeholder={item.address}
                            value={updateLodgingData.address}
                            onChange={(e) =>
                              setUpdateLodgingData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>Phone #:</p>
                          <input
                            placeholder={item.phoneNumber}
                            value={updateLodgingData.phoneNumber}
                            onChange={(e) =>
                              setUpdateLodgingData((prev) => ({
                                ...prev,
                                phoneNumber: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>Website:</p>
                          <input
                            placeholder={item.website}
                            value={updateLodgingData.website}
                            onChange={(e) =>
                              setUpdateLodgingData((prev) => ({
                                ...prev,
                                website: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>City:</p>
                          <input
                            placeholder={item.city}
                            value={updateLodgingData.city}
                            onChange={(e) =>
                              setUpdateLodgingData((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>Description:</p>
                          <input
                            placeholder={item.description}
                            value={updateLodgingData.description}
                            onChange={(e) =>
                              setUpdateLodgingData((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-5 w-100 align-self-center">
                        <div className="d-flex flex-column flex-md-row justify-content-between col-12 col-md-6 mx-auto">
                          {" "}
                          <p>Name:</p>
                          <p className="text-white ms-5 ms-md-0">{item.name}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between col-12 col-md-6 mx-auto">
                          {" "}
                          <p>Address:</p>
                          <p className="text-white ms-5 ms-md-0">
                            {item.address}
                          </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between col-12 col-md-6 mx-auto">
                          {" "}
                          <p>Phone #:</p>
                          <p className="text-white ms-5 ms-md-0">
                            {item.phoneNumber}
                          </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between col-12 col-md-6 mx-auto">
                          {" "}
                          <p>Website:</p>
                          <p className="text-white ms-5 ms-md-0">
                            {item.website}
                          </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between col-12 col-md-6 mx-auto">
                          {" "}
                          <p>City:</p>
                          <p className="text-white ms-5 ms-md-0">{item.city}</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between col-12 col-md-6 mx-auto">
                          {" "}
                          <p>Description:</p>
                          <p className="text-white ms-5 ms-md-0">
                            {item.description}
                          </p>
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

export default ManageLodging;
