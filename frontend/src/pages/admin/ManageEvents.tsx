import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/events/eventSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllEvents,
  deleteEvent,
  updateEvent,
} from "@/features/events/eventActions";
import { shallowEqual } from "react-redux";
import Modal from "@/components/modals/Modal";
import Loading from "@/components/loading";
import Link from "next/link";
import useUserDetails from "@/hooks/userCredentials";
import PostNewEvent from "@/components/modals/PostNewEvent";
import Upcoming from "@/components/Upcoming";
import { FaCircleArrowLeft } from "react-icons/fa6";
import PostEventReq from "@/types/PostEventReq";
import UpdateEventReq from "@/types/UpdateEventReq";
import Event from "@/types/Event";
import styles from "./ManageEvents.module.css";

const ManageEvents = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [previewModeIndex, setPreviewModeIndex] = useState<number>(0);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [isSinglePreviewOpen, setSinglePreviewOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [updateEventData, setUpdateEventData] = useState<UpdateEventReq>({
    _id: "",
    title: "",
    link: "",
    description: "",
    descriptionShort: "",
    date: "",
    startTime: "",
    endTime: "",
    allDay: false,
    urlPhoto: "",
  });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Redux

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useUserDetails();

  const { events, loading, error, updateSuccess } = useAppSelector(
    (state: any) => state.events,
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllEvents());
      dispatch(resetSuccess());
    }
  }, [updateSuccess]);

  const [postEventData, setPostEventData] = useState<PostEventReq>({
    title: "",
    link: "",
    description: "",
    descriptionShort: "",
    date: "",
    startTime: "",
    endTime: "",
    allDay: false,
    urlPhoto: "",
  });

  // Modals

  const openPreviewModal = () => setPreviewModalOpen(true);
  const closePreviewModal = () => setPreviewModalOpen(false);
  const openPostModal = () => {
    setPostEventData({
      title: "",
      link: "",
      description: "",
      descriptionShort: "",
      date: "",
      startTime: "",
      endTime: "",
      allDay: false,
      urlPhoto: "",
    });
    setPostModalOpen(true);
  };
  const closePostModal = () => {
    setPostModalOpen(false);
    setPostEventData({
      title: "",
      link: "",
      description: "",
      descriptionShort: "",
      date: "",
      startTime: "",
      endTime: "",
      allDay: false,
      urlPhoto: "",
    });
  };
  const closeSinglePreviewModal = () => setSinglePreviewOpen(false);
  const openSinglePreviewModal = () => setSinglePreviewOpen(true);

  // Logic

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleRevert = () => {
    setEditModeIndex(null);
    setUpdateEventData({
      _id: "",
      title: "",
      link: "",
      description: "",
      descriptionShort: "",
      date: "",
      startTime: "",
      endTime: "",
      allDay: false,
      urlPhoto: "",
    });
  };

  const handleEditModeButton = (index: number) => {
    setEditModeIndex(index);
    setUpdateEventData({
      _id: events[index]._id,
      title: events[index].title,
      link: events[index].link,
      urlPhoto: events[index].urlPhoto,
      description: events[index].description,
      descriptionShort: events[index].descriptionShort,
      date: events[index].date,
      startTime: events[index].startTime,
      endTime: events[index].endTime,
      allDay: events[index].allDay,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    dispatch(
      updateEvent({
        ...updateEventData,
      })
    );
    setEditModeIndex(null);
  };

  const handleDelete = () => {
    dispatch(deleteEvent(currentItemId));
    setAreYouSureModalOpen(false);
  };

  const handleOpenPreview = (index: number) => {
    setPreviewModeIndex(index);
    openSinglePreviewModal();
  };

  if (!isLoggedIn) {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="mx-3 text-center">
          You are not logged in, Admin.... if that is your real name
        </h1>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  console.log(currentItemId);

  return (
    <>
      {loading && <Loading />}
      <div className="d-flex flex-column align-items-center">
        <Modal isOpen={isPreviewModalOpen} onClose={closePreviewModal}>
          <Upcoming />
        </Modal>
        <h1 className={`${styles.header} my-5 p-3`}>Event Management Desk</h1>
        <div className="d-flex flex-row justify-content-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View Events
          </button>
          <button className="btn-success btn" onClick={openPostModal}>
            Add New Item
          </button>
        </div>

        <PostNewEvent
          postModalOpen={postModalOpen}
          closePostModal={closePostModal}
          postEventData={postEventData}
          setPostEventData={setPostEventData}
        />
        <div className="d-flex flex-column align-items-center pb-5">
          <h2 className="py-3">Current Event</h2>
          <div className="d-flex flex-column align-items-center">
            {events.map((item: Event, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3"
              >
                <div className={`${styles.eventItem} d-flex flex-row`}>
                  <div
                    className="w-50"
                    style={{
                      height: "200px",
                      width: "200px",
                      background: `#151515 url("${item.urlPhoto}") no-repeat center center / cover`,
                      backgroundAttachment: "scroll",
                    }}
                  ></div>
                  {editModeIndex === index ? (
                    <div className={`${styles.info} ms-5 w-75`}>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Title:</p>
                        <input
                          placeholder={item.title}
                          value={updateEventData.title}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Date:</p>
                        <input
                          placeholder={item.date}
                          value={updateEventData.date}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>All Day Event:</p>
                        <input
                          type="checkbox"
                          checked={updateEventData.allDay}
                          onChange={(e) =>
                            setUpdateEventData({
                              ...updateEventData,
                              allDay: e.target.checked,
                            })
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Start Time:</p>
                        <input
                          placeholder={item.startTime}
                          value={updateEventData.startTime}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              startTime: e.target.value,
                            }))
                          }
                          disabled={updateEventData.allDay}
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>End Time:</p>
                        <input
                          placeholder={item.endTime}
                          value={updateEventData.endTime}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              endTime: e.target.value,
                            }))
                          }
                          disabled={updateEventData.allDay}
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>URL endpoint:</p>
                        <input
                          placeholder={item.link}
                          value={updateEventData.link}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              link: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Short Description:</p>
                        <input
                          placeholder={item.descriptionShort}
                          value={updateEventData.descriptionShort}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              descriptionShort: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Full Description:</p>
                        <input
                          placeholder={item.description}
                          value={updateEventData.description}
                          onChange={(e) =>
                            setUpdateEventData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        ></input>
                      </div>
                      <div className="float-end">
                        <button className="btn-admin">Upload New Photo</button>
                      </div>
                    </div>
                  ) : (
                    <div className="ms-5 w-75">
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Title:</p>
                        <p>{item.title}</p>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Date:</p>
                        <p>{`${
                          months[new Date(item.date).getMonth()]
                        } ${new Date(item.date).getDay()}`}</p>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>All Day Event:</p>
                        <p>{item.allDay ? "True" : "False"}</p>
                      </div>
                      {!item.allDay && (
                        <>
                          <div className="d-flex flex-row justify-content-between">
                            {" "}
                            <p>Start Time:</p>
                            <p>{item.startTime}</p>
                          </div>
                          <div className="d-flex flex-row justify-content-between">
                            {" "}
                            <p>End Time:</p>
                            <p>{item.endTime}</p>
                          </div>
                        </>
                      )}
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>URL endpoint:</p>
                        <p>{item.link}</p>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Short Description:</p>
                        <p>{item.descriptionShort}</p>
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        {" "}
                        <p>Full Description:</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 d-flex flex-row justify-content-end w-100">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpenPreview(index)}
                  >
                    Preview
                  </button>
                  <Modal
                    isOpen={isSinglePreviewOpen}
                    onClose={closeSinglePreviewModal}
                  >
                    <h1>Event Preview</h1>
                  </Modal>
                  {editModeIndex === index ? (
                    <>
                      {" "}
                      <button
                        className="btn btn-success ms-5"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger ms-5"
                        onClick={handleRevert}
                      >
                        Revert
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        className="btn btn-warning ms-5"
                        onClick={() => handleEditModeButton(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-5"
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
            ))}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end pb-5 w-100">
          <Link className="admin-link" href="/admin">
            <button className="mb-5 d-flex flex-row align-items-center btn-admin">
              <FaCircleArrowLeft size={20} className="me-2" /> Back to Admin
              Portal
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManageEvents;
