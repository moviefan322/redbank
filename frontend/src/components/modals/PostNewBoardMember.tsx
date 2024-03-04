import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { postBoardMember } from "@/features/boardMembers/boardMemberActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import PostBoardMemberReq from "@/types/PostBoardMemberReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewBoardMemberProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postBoardMemberData: PostBoardMemberReq;
  setPostBoardMemberData: (data: PostBoardMemberReq) => void;
}

const PostNewBoardMember = ({
  postModalOpen,
  closePostModal,
  postBoardMemberData,
  setPostBoardMemberData,
}: PostNewBoardMemberProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setError("");
    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postBoardMember(postBoardMemberData));
    handleCloseModal();
    setError("");
  };

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New BoardMember</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`${styles.info} ms-5 w-75`}>
              <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                {" "}
                <p>Name:</p>
                <input
                  placeholder="name"
                  value={postBoardMemberData.name}
                  onChange={(e) =>
                    setPostBoardMemberData({
                      ...postBoardMemberData,
                      name: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                {" "}
                <p>Department:</p>
                <input
                  placeholder="department"
                  value={postBoardMemberData.department}
                  onChange={(e) =>
                    setPostBoardMemberData({
                      ...postBoardMemberData,
                      department: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="d-flex flex-column flex-md-row my-1 justify-content-between">
                {" "}
                <p>Position:</p>
                <input
                  placeholder="position"
                  value={postBoardMemberData.position}
                  onChange={(e) =>
                    setPostBoardMemberData({
                      ...postBoardMemberData,
                      position: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="d-flex flex-column flex-md-row my-1 align-items-center">
                <p className='w-100'>Officer/Director:</p>
                <div className="d-flex flex-column my-1 align-items-center">
                  <div className="d-flex flex-row form-check form-check-inline">
                    <input
                      className="justify-self-center me-2"
                      type="radio"
                      name="officerOrDirector"
                      id="officer"
                      value="Officer"
                      checked={
                        postBoardMemberData.officerOrDirector === "Officer"
                      }
                      onChange={(e) =>
                        setPostBoardMemberData({
                          ...postBoardMemberData,
                          officerOrDirector: e.target.value,
                        })
                      }
                    />
                    <label className="form-check-label w-100" htmlFor="officer">
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
                        postBoardMemberData.officerOrDirector === "Director"
                      }
                      onChange={(e) =>
                        setPostBoardMemberData({
                          ...postBoardMemberData,
                          officerOrDirector: e.target.value,
                        })
                      }
                    />
                    <label className="form-check-label w-100" htmlFor="director">
                      Director
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row my-1 justify-content-between align-items-center">
                <p className='w-100'>Exec Committee:</p>
                <div className="d-flex flex-column my-1">
                  <div className="d-flex flex-row form-check form-check-inline">
                    <input
                      className="justify-self-center me-2"
                      type="radio"
                      name="executiveCommitteeMember"
                      id="executiveCommitteeYes"
                      value="true"
                      checked={
                        postBoardMemberData.executiveCommitteeMember === true
                      }
                      onChange={() =>
                        setPostBoardMemberData({
                          ...postBoardMemberData,
                          executiveCommitteeMember: true,
                        })
                      }
                    />
                    <label
                      className="form-check-label w-100"
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
                        postBoardMemberData.executiveCommitteeMember === false
                      }
                      onChange={() =>
                        setPostBoardMemberData({
                          ...postBoardMemberData,
                          executiveCommitteeMember: false,
                        })
                      }
                    />
                    <label
                      className="form-check-label w-100"
                      htmlFor="executiveCommitteeNo"
                    >
                      No
                    </label>
                  </div>
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

export default PostNewBoardMember;
