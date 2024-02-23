import React, { useState, useEffect } from "react";
import { resetSuccess } from "@/features/events/eventSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllEvents,
  deleteEvent,
  updateEvent,
} from "@/features/events/eventActions";
import { shallowEqual } from "react-redux";
import DOMPurify from "dompurify";
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
  const [isDescriptionValid, setDescriptionValid] = useState(false);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [submitError, setSubmitError] = useState<string>("");
  const [updateEventData, setUpdateEventData] = useState<UpdateEventReq>({
    _id: "",
    title: "",
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
    const currentEvent = events[index];
    setUpdateEventData({
      _id: currentEvent._id,
      title: currentEvent.title,
      urlPhoto: currentEvent.urlPhoto,
      description: currentEvent.description,
      descriptionShort: currentEvent.descriptionShort,
      date: currentEvent.date,
      startTime: currentEvent.startTime,
      endTime: currentEvent.endTime,
      allDay: currentEvent.allDay,
    });

    // Validate existing descriptions when entering edit mode
    const isDescriptionShortValid =
      currentEvent.descriptionShort.trim().length > 0;
    const isDescriptionValid = currentEvent.description.trim().length > 0;

    // Assume both descriptions need to be valid to enable the Save button
    setDescriptionValid(isDescriptionShortValid && isDescriptionValid);

    setMonth(new Date(currentEvent.date).getMonth() + 1);
    setDay(new Date(currentEvent.date).getDate());
    setYear(new Date(currentEvent.date).getFullYear());
    if (currentEvent.startTime) {
      setStartHour(currentEvent.startTime.split(":")[0]);
      setStartMinute(currentEvent.startTime.split(":")[1]);
    } else {
      setStartHour("");
      setStartMinute("");
    }
    if (currentEvent.endTime) {
      setEndHour(currentEvent.endTime.split(":")[0]);
      setEndMinute(currentEvent.endTime.split(":")[1]);
    } else {
      setEndHour("");
      setEndMinute("");
    }
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();

    // Adjust the month index to 0-based for JavaScript Date compatibility
    const adjustedMonth = month;

    // Construct a date string using the adjusted month
    const formattedDate = `${year}-${adjustedMonth
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}T00:00:00`;

    // Convert the string to a Date object and format it to ISO string
    const updatedDateISO = new Date(formattedDate).toISOString();

    // Update the event data with the new date
    const updatedUpdateEventData: UpdateEventReq = {
      ...updateEventData,
      date: updatedDateISO,
    };

    if (!updateEventData.allDay) {
      const formattedStartTime = `${startHour.padStart(
        2,
        "0"
      )}:${startMinute.padStart(2, "0")}`;
      updatedUpdateEventData.startTime = formattedStartTime;

      if (endHour && endMinute) {
        const formattedEndTime = `${endHour.padStart(
          2,
          "0"
        )}:${endMinute.padStart(2, "0")}`;
        updatedUpdateEventData.endTime = formattedEndTime;

        if (+startHour > +endHour) {
          return setSubmitError("End time must be later than start time.");
        }
      } else {
        updatedUpdateEventData.endTime = "";
      }
    } else {
      updatedUpdateEventData.startTime = "";
      updatedUpdateEventData.endTime = "";
    }

    dispatch(
      updateEvent({
        ...updatedUpdateEventData,
      })
    );
    setEditModeIndex(null);
    setSubmitError("");
  };

  const handleDelete = () => {
    dispatch(deleteEvent(currentItemId));
    setAreYouSureModalOpen(false);
  };

  const handleOpenPreview = (index: number) => {
    setPreviewModeIndex(index);
    openSinglePreviewModal();
  };

  const handleDescriptionChange = (e: any, type: any) => {
    const value = e.target.value;
    setUpdateEventData((prev) => ({ ...prev, [type]: value }));

    if (type === "descriptionShort" || type === "description") {
      setDescriptionValid(value.trim().length > 0);
    }
  };

  const sanitizeData = (data: string) => {
    const sanitizedData = () => ({
      __html: DOMPurify.sanitize(data),
    });
    return <div dangerouslySetInnerHTML={sanitizedData()} />;
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

  console.log(updateEventData);
  console.log(year, month, day, startHour, startMinute, endHour, endMinute);

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
          <h2 className="py-3">Current Events</h2>
          <div className="d-flex flex-column align-items-center">
            {events.map((item: Event, index: number) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-3 my-5 mx-3 w-100"
              >
                <div className="d-flex flex-column align-items-center">
                  <div className={`${styles.eventItem} d-flex flex-row`}>
                    <div
                      className="w-100 align-self-center"
                      style={{
                        height: "300px",
                        width: "300px",
                        background: `#151515 url("${item.urlPhoto}") no-repeat center center / cover`,
                        backgroundAttachment: "scroll",
                      }}
                    ></div>
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-75`}>
                        {submitError && submitError}
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
                        <div
                          className={`d-flex flex-row justify-content-between ${styles.timeSelect}`}
                        >
                          <p>Date:</p>
                          <select
                            value={month}
                            onChange={(e) => setMonth(+e.target.value)}
                          >
                            <option value="">Month</option>
                            {[...Array(12)].map((_, index) => (
                              <option key={index} value={index + 1}>
                                {new Date(0, index).toLocaleString("default", {
                                  month: "short",
                                })}
                              </option>
                            ))}
                          </select>
                          <select
                            value={day}
                            onChange={(e) => setDay(+e.target.value)}
                          >
                            <option value="">Day</option>
                            {[...Array(31)].map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                          <select
                            value={year}
                            onChange={(e) => setYear(+e.target.value)}
                          >
                            <option value="">Year</option>
                            {[...Array(10)].map((_, index) => {
                              const year = new Date().getFullYear() + index;
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
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
                        <div
                          className={`d-flex flex-row justify-content-between ${styles.timeSelect}`}
                        >
                          <p>Start Time:</p>
                          <select
                            value={startHour}
                            onChange={(e) => setStartHour(e.target.value)}
                            disabled={updateEventData.allDay}
                          >
                            <option value="">Hour</option>
                            {[...Array(24)].map((_, index) => (
                              <option key={index} value={index}>
                                {index.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                          <select
                            value={startMinute}
                            onChange={(e) => setStartMinute(e.target.value)}
                            disabled={updateEventData.allDay}
                          >
                            <option value="">Minute</option>
                            {["00", "15", "30", "45"].map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          className={`d-flex flex-row justify-content-between ${styles.timeSelect}`}
                        >
                          <p>End Time:</p>
                          <select
                            value={endHour}
                            onChange={(e) => setEndHour(e.target.value)}
                            disabled={updateEventData.allDay}
                          >
                            <option value="">Hour</option>
                            {[...Array(24)].map((_, index) => (
                              <option key={index} value={index}>
                                {index.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                          <select
                            value={endMinute}
                            onChange={(e) => setEndMinute(e.target.value)}
                            disabled={updateEventData.allDay}
                          >
                            <option value="">Minute</option>
                            {["00", "15", "30", "45"].map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="float-end">
                          <button className="btn-admin">
                            Upload New Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-5 w-75 align-self-center">
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
                          } ${new Date(item.date).getDate()}, ${new Date(
                            item.date
                          ).getFullYear()}`}</p>
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
                      </div>
                    )}
                  </div>
                  {editModeIndex !== index ? (
                    <div className="w-75 my-3">
                      <div>Short Description: {item.descriptionShort}</div>
                      <div className="my-3">
                        {" "}
                        Full Description: {sanitizeData(item.description)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-75 my-3">
                      <div className="d-flex flex-column justify-content-between">
                        {" "}
                        <p>Short Description:</p>
                        <textarea
                          placeholder={item.descriptionShort}
                          value={updateEventData.descriptionShort}
                          onChange={(e) =>
                            handleDescriptionChange(e, "descriptionShort")
                          }
                        ></textarea>
                      </div>
                      <div className="d-flex flex-column justify-content-between mt-3">
                        {" "}
                        <p>Full Description:</p>
                        <textarea
                          placeholder={item.description}
                          value={updateEventData.description}
                          onChange={(e) =>
                            handleDescriptionChange(e, "description")
                          }
                        ></textarea>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 d-flex flex-row justify-content-center w-100">
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
                          disabled={!isDescriptionValid}
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
