import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/businesses/businessSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllBusinesses,
  deleteBusiness,
  updateBusiness,
} from "@/features/businesses/businessActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import SorryDave from "@/components/SorryDave";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
// import PostNewBusiness from "@/components/modals/PostNewBusiness";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostBusinessReq from "@/types/PostBusinessReq";
import UpdateBusinessReq from "@/types/UpdateBusinessReq";
import Business from "@/types/Business";
import styles from "./ManageBusinesses.module.css";

const ManageBusinesses = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [updateBusinessData, setUpdateBusinessData] =
    useState<UpdateBusinessReq>({
      _id: "",
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
    });

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { businesses, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.businesses,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllBusinesses());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postBusinessData, setPostBusinessData] = useState<PostBusinessReq>({
    name: "",
  });

  // Modals
  const openPostModal = () => {
    setPostBusinessData({
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
    });
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
    setPostBusinessData({
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
    });
  };

  // Logic

  useEffect(() => {
    dispatch(getAllBusinesses());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateBusinessData({
      _id: "",
      name: "",
      address: "",
      phoneNumber: "",
      website: "",
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    const currentBusiness = businesses[index];
    setUpdateBusinessData({
      _id: currentBusiness._id,
      name: currentBusiness.name,
      address: currentBusiness.address,
      phoneNumber: currentBusiness.phoneNumber,
      website: currentBusiness.website,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();

    dispatch(updateBusiness(updateBusinessData));
    setEditModeIndex(null);
    setSubmitError("");
  };

  const handleDelete = () => {
    dispatch(deleteBusiness(currentItemId));
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
        <h1 className={`${styles.header} my-5 p-3`}>
          Business Management Desk
        </h1>
        <div className="d-flex flex-column align-items-center justify-content-evenly w-100 mb-5">
          <button
            className="mt-4 mt-md-0 btn-success btn"
            onClick={openPostModal}
          >
            Add New Gift Card
          </button>
        </div>

        {/* <PostNewBusiness
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postBusinessData={postBusinessData}
          setPostBusinessData={setPostBusinessData}
        /> */}

        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current Businesses</h2>
          <div className="d-flex flex-column align-items-center">
            {businesses.map((item: Business, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-0 mx-md-3"
              >
                <div className="d-flex flex-column align-items-center">
                  <div
                    className={`${styles.businessItem} d-flex flex-column flex-md-row`}
                  >
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-100`}>
                        {submitError && submitError}
                        <div className="d-flex flex-column flex-md-row py-2 justify-content-between w-50 mx-auto">
                          {" "}
                          <p>Name:</p>
                          <input
                            placeholder={item.name}
                            value={updateBusinessData.name}
                            onChange={(e) =>
                              setUpdateBusinessData((prev) => ({
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
                            value={updateBusinessData.address}
                            onChange={(e) =>
                              setUpdateBusinessData((prev) => ({
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
                            value={updateBusinessData.phoneNumber}
                            onChange={(e) =>
                              setUpdateBusinessData((prev) => ({
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
                            value={updateBusinessData.website}
                            onChange={(e) =>
                              setUpdateBusinessData((prev) => ({
                                ...prev,
                                website: e.target.value,
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

export default ManageBusinesses;
