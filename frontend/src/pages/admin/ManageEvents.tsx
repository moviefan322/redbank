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
import SorryDave from "@/components/SorryDave";
import EventDetail from "../events/[eventId]";
import ImageUploader from "@/components/ImageUploader";
import PDFUploader from "@/components/PDFUploader";
import ManageSponsors from "@/components/modals/ManageSponsors";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import PostEventReq from "@/types/PostEventReq";
import UpdateEventReq from "@/types/UpdateEventReq";
import Event from "@/types/Event";
import Tier from "@/types/Tier";
import styles from "./ManageEvents.module.css";

const ManageEvents = () => {
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [previewModeIndex, setPreviewModeIndex] = useState<number>(0);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [isSinglePreviewOpen, setSinglePreviewOpen] = useState(false);
  const [isSponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [isDescriptionValid, setDescriptionValid] = useState(false);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [endDay, setEndDay] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [rainDateDay, setRainDateDay] = useState(0);
  const [rainDateMonth, setRainDateMonth] = useState(0);
  const [rainDateYear, setRainDateYear] = useState(0);
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [multiDay, setMultiDay] = useState(false);
  const [rainDate, setRainDate] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [updateEventData, setUpdateEventData] = useState<UpdateEventReq>({
    _id: "",
    title: "",
    description: "",
    descriptionShort: "",
    date: "",
    rainDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    allDay: false,
    urlPhoto: "",
    urlPDF: "",
    tiers: [],
    pdfButtonText: "View PDF",
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
    rainDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    allDay: false,
    urlPhoto: "",
    urlPDF: "",
    pdfButtonText: "View PDF",
  });

  // Modals

  const openPreviewModal = () => setPreviewModalOpen(true);
  const closePreviewModal = () => setPreviewModalOpen(false);
  const openSponsorModal = () => setSponsorModalOpen(true);
  const closeSponsorModal = () => setSponsorModalOpen(false);
  const openPostModal = () => {
    setPostEventData({
      title: "",
      description: "",
      descriptionShort: "",
      date: "",
      endDate: "",
      rainDate: "",
      startTime: "",
      endTime: "",
      allDay: false,
      urlPhoto: "",
      urlPDF: "",
      pdfButtonText: "View PDF",
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
      endDate: "",
      rainDate: "",
      startTime: "",
      endTime: "",
      allDay: false,
      urlPhoto: "",
      urlPDF: "",
      pdfButtonText: "View PDF",
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
      endDate: "",
      rainDate: "",
      startTime: "",
      endTime: "",
      allDay: false,
      urlPhoto: "",
      urlPDF: "",
      tiers: [],
      pdfButtonText: "View PDF",
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
      endDate: currentEvent.endDate,
      rainDate: currentEvent.rainDate,
      startTime: currentEvent.startTime,
      endTime: currentEvent.endTime,
      allDay: currentEvent.allDay,
      tiers: currentEvent.tiers,
      urlPDF: currentEvent.urlPDF,
      pdfButtonText: currentEvent.pdfButtonText,
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

    if (currentEvent.endDate) {
      setMultiDay(true);
      setEndMonth(new Date(currentEvent.endDate).getMonth() + 1);
      setEndDay(new Date(currentEvent.endDate).getDate());
      setEndYear(new Date(currentEvent.endDate).getFullYear());
    } else {
      setMultiDay(false);
      setEndMonth(0);
      setEndDay(0);
      setEndYear(0);
    }

    if (currentEvent.rainDate) {
      setRainDate(true);
      setRainDateMonth(new Date(currentEvent.rainDate).getMonth() + 1);
      setRainDateDay(new Date(currentEvent.rainDate).getDate());
      setRainDateYear(new Date(currentEvent.rainDate).getFullYear());
    } else {
      setRainDate(false);
      setRainDateMonth(0);
      setRainDateDay(0);
      setRainDateYear(0);
    }

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

  const handleMultiDayChange = (isChecked: any) => {
    setMultiDay(isChecked);
    if (!isChecked) {
      setEndMonth(0);
      setEndDay(0);
      setEndYear(0);
      setUpdateEventData((prev) => ({
        ...prev,
        endDate: "",
      }));
    }
  };

  const handleRainDateChange = (isChecked: any) => {
    setRainDate(isChecked);
    if (!isChecked) {
      setRainDateMonth(0);
      setRainDateDay(0);
      setRainDateYear(0);
      setUpdateEventData((prev) => ({
        ...prev,
        rainDate: "",
      }));
    }
  };

  const validateDates = () => {
    if (multiDay) {
      if (!endMonth || !endDay || !endYear) {
        return "End date is required for multi-day events.";
      }
      const startDate = new Date(year, month - 1, day);
      const endDate = new Date(endYear, endMonth - 1, endDay);
      if (endDate <= startDate) {
        return "End date must be after the start date.";
      }
    }
    if (rainDate) {
      if (!rainDateMonth || !rainDateDay || !rainDateYear) {
        return "Rain date is required.";
      }
    }
    return "";
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const dateError = validateDates();
    if (dateError) {
      setSubmitError(dateError);
      return;
    }

    // Adjust the month index to 0-based for JavaScript Date compatibility
    const adjustedMonth = month;

    // Construct a date string using the adjusted month
    const formattedDate = `${year}-${adjustedMonth
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}T00:00:00`;

    let formattedEndDate = "";
    if (endMonth && endDay && endYear) {
      // Adjust the month index to 0-based for JavaScript Date compatibility
      const adjustedEndMonth = endMonth;

      // Construct a date string using the adjusted month
      formattedEndDate = `${endYear}-${adjustedEndMonth
        .toString()
        .padStart(2, "0")}-${endDay.toString().padStart(2, "0")}T00:00:00`;
    }

    // Convert the string to a Date object and format it to ISO string
    const updatedDateISO = new Date(formattedDate).toISOString();
    let updatedEndDateISO = "";
    if (formattedEndDate) {
      updatedEndDateISO = new Date(formattedEndDate).toISOString();
    }

    // Update the event data with the new date and ensure the tiers are included
    const updatedUpdateEventData: UpdateEventReq = {
      ...updateEventData,
      date: updatedDateISO,
      ...(formattedEndDate ? { endDate: updatedEndDateISO } : {}),
      tiers: updateEventData.tiers || [], // Ensure tiers are preserved
    };

    let formattedRainDate = "";
    if (rainDateMonth && rainDateDay && rainDateYear) {
      // Adjust the month index to 0-based for JavaScript Date compatibility
      const adjustedRainMonth = rainDateMonth;

      // Construct a date string using the adjusted month
      formattedRainDate = `${rainDateYear}-${adjustedRainMonth
        .toString()
        .padStart(2, "0")}-${rainDateDay.toString().padStart(2, "0")}T00:00:00`;
    }

    // Convert the string to a Date object and format it to ISO string
    const updatedRainDateISO = formattedRainDate
      ? new Date(formattedRainDate).toISOString()
      : "";

    // Update the event data with the new date
    if (rainDate) {
      updatedUpdateEventData.rainDate = updatedRainDateISO;
    } else {
      updatedUpdateEventData.rainDate = "";
    }

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

    dispatch(updateEvent(updatedUpdateEventData));
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

  const handleSponsorUpdate = (updatedTiers: Tier[]) => {
    setUpdateEventData((prev) => ({
      ...prev,
      tiers: updatedTiers,
    }));
  };

  const clearPDFurl = () => {
    setUpdateEventData((prev) => ({
      ...prev,
      urlPDF: "",
    }));
  };

  console.log(updateEventData, "updateEventData");

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
        <Modal
          isOpen={isPreviewModalOpen}
          onClose={closePreviewModal}
          customStyle={{ minWidth: "100%", color: "black" }}
        >
          <Upcoming />
        </Modal>
        <h1 className={`${styles.header} mb-5 p-3`}>Event Management Desk</h1>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly w-100 mb-5">
          <button className="btn-primary btn" onClick={openPreviewModal}>
            View Events
          </button>
          <button
            className="mt-4 mt-md-0 btn-success btn"
            onClick={openPostModal}
          >
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
                  {}
                  <div
                    className={`${styles.eventItem} d-flex flex-column flex-md-row`}
                  >
                    <div
                      className="me-0 me-md-5 mb-5 mb-md-0"
                      style={{
                        height: "300px",
                        width: "300px",
                        background: `#151515 url("${
                          editModeIndex !== index
                            ? item.urlPhoto
                            : updateEventData.urlPhoto
                        }") no-repeat center center / cover`,
                        backgroundAttachment: "scroll",
                      }}
                    ></div>
                    {editModeIndex === index ? (
                      <div className={`${styles.info} ms-5 w-75`}>
                        <p className="text-danger">
                          {submitError && submitError}
                        </p>
                        <div className="d-flex flex-column flex-md-row justify-content-between">
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
                          className={`d-flex flex-column flex-md-row justify-content-between ${styles.timeSelect}`}
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
                            {[...Array(3)].map((_, index) => {
                              const year = new Date().getFullYear() + index;
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-end">
                          <p className="flex-grow-2 w-100">Multi-Day Event:</p>
                          <input
                            type="checkbox"
                            checked={multiDay}
                            onChange={(e) =>
                              handleMultiDayChange(e.target.checked)
                            }
                          ></input>
                        </div>
                        {multiDay && (
                          <div
                            className={`d-flex flex-column flex-md-row justify-content-between ${styles.timeSelect}`}
                          >
                            <p>End Date:</p>
                            <select
                              value={endMonth}
                              onChange={(e) => setEndMonth(+e.target.value)}
                            >
                              <option value="">Month</option>
                              {[...Array(12)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {new Date(0, index).toLocaleString(
                                    "default",
                                    {
                                      month: "long",
                                    }
                                  )}
                                </option>
                              ))}
                            </select>
                            <select
                              value={endDay}
                              onChange={(e) => setEndDay(+e.target.value)}
                            >
                              <option value="">Day</option>
                              {[...Array(31)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                            <select
                              value={endYear}
                              onChange={(e) => setEndYear(+e.target.value)}
                            >
                              <option value="">Year</option>
                              {[...Array(3)].map((_, index) => {
                                const year = new Date().getFullYear() + index;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}
                        {updateEventData.endDate && (
                          <div
                            className={`d-flex flex-column flex-md-row justify-content-between ${styles.timeSelect}`}
                          >
                            <p>End Date:</p>
                            <select
                              value={endMonth}
                              onChange={(e) => setEndMonth(+e.target.value)}
                            >
                              <option value="">Month</option>
                              {[...Array(12)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {new Date(0, index).toLocaleString(
                                    "default",
                                    {
                                      month: "short",
                                    }
                                  )}
                                </option>
                              ))}
                            </select>
                            <select
                              value={endDay}
                              onChange={(e) => setEndDay(+e.target.value)}
                            >
                              <option value="">Day</option>
                              {[...Array(31)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                            <select
                              value={endYear}
                              onChange={(e) => setEndYear(+e.target.value)}
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
                        )}
                        <div className="d-flex flex-column flex-md-row justify-content-end">
                          <p className="flex-grow-2 w-100">Rain Date:</p>
                          <input
                            type="checkbox"
                            checked={rainDate}
                            onChange={(e) =>
                              handleRainDateChange(e.target.checked)
                            }
                          ></input>
                        </div>
                        {rainDate && (
                          <div
                            className={`d-flex flex-column flex-md-row justify-content-between ${styles.timeSelect}`}
                          >
                            <p>Select: </p>
                            <select
                              value={rainDateMonth}
                              onChange={(e) =>
                                setRainDateMonth(+e.target.value)
                              }
                            >
                              <option value="">Month</option>
                              {[...Array(12)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {new Date(0, index).toLocaleString(
                                    "default",
                                    {
                                      month: "long",
                                    }
                                  )}
                                </option>
                              ))}
                            </select>
                            <select
                              value={rainDateDay}
                              onChange={(e) => setRainDateDay(+e.target.value)}
                            >
                              <option value="">Day</option>
                              {[...Array(31)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                            <select
                              value={rainDateYear}
                              onChange={(e) => setRainDateYear(+e.target.value)}
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
                        )}
                        <div className="d-flex flex-column flex-md-row justify-content-between">
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
                          className={`d-flex flex-column flex-md-row justify-content-between ${styles.timeSelect}`}
                        >
                          <p>Start Time:</p>
                          <select
                            value={+startHour}
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
                          className={`d-flex flex-column flex-md-row justify-content-between ${styles.timeSelect}`}
                        >
                          <p>End Time:</p>
                          <select
                            value={+endHour}
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
                        {!isSponsorModalOpen && (
                          <div className="float-end">
                            <div className="justify-self-end w-100 flex-grow-2">
                              {updateEventData.urlPhoto === "" ||
                              updateEventData.urlPhoto === undefined ? (
                                <ImageUploader
                                  data={updateEventData}
                                  setData={(newData) =>
                                    setUpdateEventData((prev) => ({
                                      ...prev,
                                      ...newData,
                                    }))
                                  }
                                  buttonText="Upload New Image"
                                />
                              ) : (
                                <div className="d-flex flex-row align-items-center justify-content-end">
                                  <p className="my-0 mx-3">Image Upload:</p>
                                  <div className="d-flex justify-content-end align-items-center mx-3">
                                    <FaCheckCircle /> <div className="ms-2">Success!</div>
                                  </div>
                                  <button
                                    className="bg-danger text-white fw-bold border border-1 border-white"
                                    onClick={() =>
                                      setUpdateEventData((prev) => ({
                                        ...prev,
                                        urlPhoto: "",
                                      }))
                                    }
                                  >
                                    X
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* PDF Upload Section */}
                            <div className="justify-self-end w-100 flex-grow-2">
                              {updateEventData.urlPDF === "" ||
                              updateEventData.urlPDF === undefined ? (
                                <PDFUploader
                                  data={updateEventData}
                                  setData={(newData) =>
                                    setUpdateEventData((prev) => ({
                                      ...prev,
                                      ...newData,
                                    }))
                                  }
                                  buttonText="Upload PDF Document"
                                />
                              ) : (
                                <>
                                  <div className="d-flex flex-row align-items-center justify-content-end">
                                  <p className="my-0 mx-3">PDF Upload:</p>
                                  <div className="d-flex justify-content-end align-items-center mx-3">
                                    <FaCheckCircle /> <div className="ms-2">Success!</div>
                                  </div>
                                    <button
                                      className="bg-danger text-white fw-bold border border-1 border-white"
                                      onClick={() =>
                                        setUpdateEventData((prev) => ({
                                          ...prev,
                                          urlPDF: "",
                                        }))
                                      }
                                    >
                                      X
                                    </button>
                                  </div>
                                  <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
                                    <p className="flex-grow-2 w-100 mx-3">
                                      PDF Button Text:
                                    </p>
                                    <input
                                      type="text"
                                      value={
                                        updateEventData.pdfButtonText || ""
                                      }
                                      onChange={(e) =>
                                        setUpdateEventData((prev) => ({
                                          ...prev,
                                          pdfButtonText: e.target.value,
                                        }))
                                      }
                                    ></input>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="">
                          <div className="justify-self-end w-100 flex-grow-2">
                            <button
                              onClick={openSponsorModal}
                              className="btn-admin"
                            >
                              Manage Sponsors
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ms-5 w-75 align-self-center">
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Title:</p>
                          <p className="text-white">{item.title}</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>Date:</p>
                          <p className="text-white">{`${
                            months[new Date(item.date).getMonth()]
                          } ${new Date(item.date).getDate()}, ${new Date(
                            item.date
                          ).getFullYear()}`}</p>
                        </div>
                        {item.endDate && (
                          <div className="d-flex flex-column flex-md-row justify-content-between">
                            {" "}
                            <p>End Date:</p>
                            <p className="text-white">{`${
                              months[new Date(item.endDate!).getMonth()]
                            } ${new Date(item.endDate!).getDate()}, ${new Date(
                              item.endDate!
                            ).getFullYear()}`}</p>
                          </div>
                        )}
                        {item.rainDate && (
                          <div className="d-flex flex-column flex-md-row justify-content-between">
                            {" "}
                            <p>Rain Date:</p>
                            <p className="text-white">{`${
                              months[new Date(item.rainDate!).getMonth()]
                            } ${new Date(item.rainDate!).getDate()}, ${new Date(
                              item.rainDate!
                            ).getFullYear()}`}</p>
                          </div>
                        )}
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                          {" "}
                          <p>All Day Event:</p>
                          <p className="text-white">
                            {item.allDay ? "True" : "False"}
                          </p>
                        </div>
                        {!item.allDay && (
                          <>
                            <div className="d-flex flex-column flex-md-row justify-content-between">
                              {" "}
                              <p>Start Time:</p>
                              <p className="text-white">{item.startTime}</p>
                            </div>
                            <div className="d-flex flex-column flex-md-row justify-content-between">
                              {" "}
                              <p>End Time:</p>
                              <p className="text-white">{item.endTime}</p>
                            </div>
                          </>
                        )}
                        {item.tiers.length > 0 && (
                          <div className="d-flex flex-column flex-md-row justify-content-between">
                            <div>
                              <p>Sponsors:</p>
                            </div>
                            <div>
                              {item.tiers.map((tier: any, index: number) => (
                                <div className="d-flex flex-column" key={index}>
                                  {tier.sponsors.map(
                                    (sponsor: any, sponsorIndex: number) => (
                                      <p key={sponsorIndex}>-{sponsor.name}</p>
                                    )
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {editModeIndex !== index ? (
                    <div className="w-75 my-3">
                      <div>
                        Short Description: <br />{" "}
                        <span className="text-white">
                          {item.descriptionShort}
                        </span>
                      </div>
                      <div className="my-3">
                        {" "}
                        Full Description: <br />{" "}
                        <span className="text-white">
                          {sanitizeData(item.description)}
                        </span>
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

                  <div className="mt-4 d-flex flex-column align-items-center flex-md-row justify-content-center w-100">
                    <button
                      className="btn btn-secondary ms-0 ms-md-5"
                      onClick={() => handleOpenPreview(index)}
                    >
                      Preview
                    </button>
                    <Modal
                      isOpen={isSinglePreviewOpen}
                      onClose={closeSinglePreviewModal}
                      customStyle={{ color: "black" }}
                    >
                      {<EventDetail event={events[previewModeIndex]} />}
                    </Modal>
                    {editModeIndex === index ? (
                      <>
                        {" "}
                        <button
                          className="btn btn-success ms-0 ms-md-5 mt-4 mt-md-0"
                          onClick={handleUpdate}
                          disabled={!isDescriptionValid}
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
      <ManageSponsors
        isSponsorModalOpen={isSponsorModalOpen}
        closeSponsorModal={closeSponsorModal}
        eventId={updateEventData._id}
        onSponsorUpdate={handleSponsorUpdate}
      />
    </div>
  );
};

export default ManageEvents;
