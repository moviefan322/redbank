import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/boardMembers/boardMemberSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllBoardMembers,
  deleteBoardMember,
  updateBoardMember,
} from "@/features/boardMembers/boardMemberActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
// import PostNewBoardMember from "@/components/modals/PostNewBoardMember";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostBoardMemberReq from "@/types/PostBoardMemberReq";
import UpdateBoardMemberReq from "@/types/UpdateBoardMemberReq";
import BoardMember from "@/types/BoardMember";
import SorryDave from "@/components/SorryDave";
import styles from "./ManageBoardMembers.module.css";

const ManageBoardMembers = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [updateBoardMemberData, setUpdateBoardMemberData] =
    useState<UpdateBoardMemberReq>({
      _id: "",
      name: "",
      department: "",
      position: "",
      officerOrDirector: "",
      executiveCommitteeMember: false,
    });

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { boardMembers, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.boardMembers,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllBoardMembers());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postBoardMemberData, setPostBoardMemberData] =
    useState<PostBoardMemberReq>({
      name: "",
      department: "",
      position: "",
      officerOrDirector: "",
      executiveCommitteeMember: false,
    });

  // Modals
  const openPostModal = () => {
    setPostBoardMemberData({
      name: "",
      department: "",
      position: "",
      officerOrDirector: "",
      executiveCommitteeMember: false,
    });
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
    setPostBoardMemberData({
      name: "",
      department: "",
      position: "",
      officerOrDirector: "",
      executiveCommitteeMember: false,
    });
  };

  // Logic

  useEffect(() => {
    dispatch(getAllBoardMembers());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateBoardMemberData({
      _id: "",
      name: "",
      department: "",
      position: "",
      officerOrDirector: "",
      executiveCommitteeMember: false,
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    const currentBoardMember = boardMembers[index];
    setUpdateBoardMemberData({
      _id: currentBoardMember._id,
      name: currentBoardMember.name,
      department: currentBoardMember.department,
      position: currentBoardMember.position,
      officerOrDirector: currentBoardMember.officerOrDirector,
      executiveCommitteeMember: currentBoardMember.executiveCommitteeMember,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();

    dispatch(updateBoardMember(updateBoardMemberData));
    setEditModeIndex(null);
    setSubmitError("");
  };

  const handleDelete = () => {
    dispatch(deleteBoardMember(currentItemId));
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
        <h1 className={`${styles.header} my-5 p-3 text-center mx-3`}>
          BoardMember Management Desk
        </h1>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly w-100 mb-5">
          <button
            className="mt-4 mt-md-0 btn-success btn"
            onClick={openPostModal}
          >
            Add New Board Member
          </button>
        </div>

        {/* <PostNewBoardMember
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postBoardMemberData={postBoardMemberData}
          setPostBoardMemberData={setPostBoardMemberData}
        /> */}

        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current BoardMembers</h2>
          <div className="d-flex flex-column align-items-center">
            {boardMembers.map((item: BoardMember, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-3 w-100"
              >
                <div className="d-flex flex-column align-items-center">
                  {}
                  <div
                    className={`${styles.boardMemberItem} d-flex flex-column flex-md-row`}
                  >
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-75`}>
                        {submitError && submitError}
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Name:</p>
                          <input
                            placeholder={item.name}
                            value={updateBoardMemberData.name}
                            onChange={(e) =>
                              setUpdateBoardMemberData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Department:</p>
                          <input
                            placeholder="department"
                            value={updateBoardMemberData.department}
                            onChange={(e) =>
                              setUpdateBoardMemberData((prev) => ({
                                ...prev,
                                department: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Position:</p>
                          <input
                            placeholder="position"
                            value={updateBoardMemberData.position}
                            onChange={(e) =>
                              setUpdateBoardMemberData((prev) => ({
                                ...prev,
                                position: e.target.value,
                              }))
                            }
                          ></input>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          <p>Officer/Director:</p>
                          <div className="d-flex flex-column flex-md-row my-1">
                            <div className="d-flex flex-row form-check form-check-inline">
                              <input
                                className="justify-self-center me-2"
                                type="radio"
                                name="officerOrDirector"
                                id="officer"
                                value="Officer"
                                checked={
                                  updateBoardMemberData.officerOrDirector ===
                                  "Officer"
                                }
                                onChange={(e) =>
                                  setUpdateBoardMemberData((prev) => ({
                                    ...prev,
                                    officerOrDirector: e.target.value,
                                  }))
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="officer"
                              >
                                Officer
                              </label>
                            </div>
                            <div className="d-flex flex-row form-check form-check-inline">
                              <input
                                className="justify-self-center me-2"
                                type="radio"
                                name="officerOrDirector"
                                id="director"
                                value="Director"
                                checked={
                                  updateBoardMemberData.officerOrDirector ===
                                  "Director"
                                }
                                onChange={(e) =>
                                  setUpdateBoardMemberData((prev) => ({
                                    ...prev,
                                    officerOrDirector: e.target.value,
                                  }))
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="director"
                              >
                                Director
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          <p>Exec Committee:</p>
                          <div className="d-flex flex-column flex-md-row my-1">
                            <div className="d-flex flex-row form-check form-check-inline">
                              <input
                                className="justify-self-center me-2"
                                type="radio"
                                name="executiveCommitteeMember"
                                id="executiveCommitteeYes"
                                value="true"
                                checked={
                                  updateBoardMemberData.executiveCommitteeMember ===
                                  true
                                }
                                onChange={() =>
                                  setUpdateBoardMemberData((prev) => ({
                                    ...prev,
                                    executiveCommitteeMember: true,
                                  }))
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="executiveCommitteeYes"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="d-flex flex-row form-check form-check-inline">
                              <input
                                className="justify-self-center me-2"
                                type="radio"
                                name="executiveCommitteeMember"
                                id="executiveCommitteeNo"
                                value="false"
                                checked={
                                  updateBoardMemberData.executiveCommitteeMember ===
                                  false
                                }
                                onChange={() =>
                                  setUpdateBoardMemberData((prev) => ({
                                    ...prev,
                                    executiveCommitteeMember: false,
                                  }))
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="executiveCommitteeNo"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-5 w-75 align-self-center">
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Name:</p>
                          <p className="text-white ms-5">{item.name}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Department:</p>
                          <p className="text-white ms-5">{item.department}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Position:</p>
                          <p className="text-white ms-5">{item.position}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Officer/Director:</p>
                          <p className="text-white ms-5">{item.officerOrDirector}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                          {" "}
                          <p>Executive Committee Member:</p>
                          <p className="text-white ms-5">{item.executiveCommitteeMember ? 'Yes' : 'No'}</p>
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
                          className="btn btn-warning mt-4 mt-md-0"
                          onClick={() => handleEditModeButton(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-md-5 mt-4 mt-md-0"
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

export default ManageBoardMembers;
