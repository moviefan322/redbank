import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { FaCheckCircle } from "react-icons/fa";
import { postEvent } from "@/features/events/eventActions";
import { resetUploadState } from "@/features/upload/uploadSlice";
import ImageUploader from "../ImageUploader";
import PDFUploader from "../PDFUploader";
import PostEventReq from "@/types/PostEventReq";
import styles from "./PostNewCarouselItem.module.css";

interface PostNewEventProps {
  postModalOpen: boolean;
  closePostModal: () => void;
  postEventData: PostEventReq;
  setPostEventData: (data: PostEventReq) => void;
}

const PostNewEvent = ({
  postModalOpen,
  closePostModal,
  postEventData,
  setPostEventData,
}: PostNewEventProps) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endYear, setEndYear] = useState("");
  const [rainDateMonth, setRainDateMonth] = useState("");
  const [rainDateDay, setRainDateDay] = useState("");
  const [rainDateYear, setRainDateYear] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [multiDay, setMultiDay] = useState(false);
  const [rainDate, setRainDate] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const validateData = () => {
    if (!postEventData.title.trim()) return "Title is required.";
    if (year === "" || month === "" || day === "") return "Date is required.";

    if (
      !postEventData.urlPhoto.trim() ||
      !postEventData.urlPhoto.startsWith("http")
    )
      return "Image is required";
    if (!postEventData.description.trim()) return "Description is required.";
    if (!postEventData.descriptionShort.trim())
      return "Short description is required.";
    return "";
  };

  const handleCloseModal = () => {
    setPostEventData({
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
    setMonth("");
    setDay("");
    setYear("");
    setEndMonth("");
    setEndDay("");
    setEndYear("");
    setRainDateMonth("");
    setRainDateDay("");
    setRainDateYear("");
    setStartHour("");
    setStartMinute("");
    setEndHour("");
    setEndMinute("");
    setMultiDay(false);
    setRainDate(false);

    setError("");

    dispatch(resetUploadState());
    closePostModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T00:00:00`;

    let formattedEndDate = "";
    if (multiDay && (endMonth === "" || endDay === "" || endYear === "")) {
      return setError("End date is required for multi-day events.");
    }

    if (multiDay) {
      formattedEndDate = `${endYear}-${endMonth.padStart(
        2,
        "0"
      )}-${endDay.padStart(2, "0")}T00:00:00`;
    }

    let formattedRainDate = "";
    if (
      rainDate &&
      (rainDateMonth === "" || rainDateDay === "" || rainDateYear === "")
    ) {
      return setError("Rain date is required.");
    }

    if (rainDate) {
      formattedRainDate = `${rainDateYear}-${rainDateMonth.padStart(
        2,
        "0"
      )}-${rainDateDay.padStart(2, "0")}T00:00:00`;
    }

    const updatedPostEventData: PostEventReq = {
      ...postEventData,
      date: new Date(formattedDate).toISOString(),
      ...(multiDay
        ? { endDate: new Date(formattedEndDate).toISOString() }
        : {}),
      ...(rainDate
        ? { rainDate: new Date(formattedRainDate).toISOString() }
        : {}),
    };

    if (!postEventData.allDay) {
      const formattedStartTime = `${startHour.padStart(
        2,
        "0"
      )}:${startMinute.padStart(2, "0")}`;
      updatedPostEventData.startTime = formattedStartTime;

      if (endHour && endMinute) {
        const formattedEndTime = `${endHour.padStart(
          2,
          "0"
        )}:${endMinute.padStart(2, "0")}`;
        updatedPostEventData.endTime = formattedEndTime;

        if (+startHour > +endHour) {
          return setError("End time must be later than start time.");
        }
      } else {
        updatedPostEventData.endTime = "";
      }
    } else {
      updatedPostEventData.startTime = "";
      updatedPostEventData.endTime = "";
    }

    if (multiDay) {
      if (new Date(formattedEndDate) < new Date(updatedPostEventData.date)) {
        return setError("End date must be after the start date.");
      }
    }

    dispatch(postEvent(updatedPostEventData));
    handleCloseModal();
    setError("");
  };

  console.log(postEventData);

  return (
    <Modal isOpen={postModalOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.modal} d-flex flex-column align-items-center`}
        >
          <h2 className="py-3">Add New Event</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-column align-items-center">
            <div className={`d-flex flex-column flex-md-row`}>
              <div
                className="w-100 align-self-center"
                style={{
                  height: "300px",
                  width: "300px",
                  background: `#151515 url("${postEventData.urlPhoto}") no-repeat center center / contain`,
                }}
              ></div>
              <div className={`ms-5 w-75`}>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {" "}
                  <p>title:</p>
                  <input
                    placeholder="Event Name"
                    value={postEventData.title}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        title: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <p>Date:</p>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="">Month</option>
                    {[...Array(12)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {new Date(0, index).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                  <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
                    {[...Array(31)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
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
                    onChange={(e) => setMultiDay(e.target.checked)}
                  ></input>
                </div>
                {multiDay && (
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <p>End Date:</p>
                    <select
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                    >
                      <option value="">Month</option>
                      {[...Array(12)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {new Date(0, index).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={endDay}
                      onChange={(e) => setEndDay(e.target.value)}
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
                      onChange={(e) => setEndYear(e.target.value)}
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
                <div className="d-flex flex-column flex-md-row justify-content-end">
                  <p className="flex-grow-2 w-100">Set Rain Date:</p>
                  <input
                    type="checkbox"
                    checked={rainDate}
                    onChange={(e) => setRainDate(e.target.checked)}
                  ></input>
                </div>
                {rainDate && (
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <p>Select: </p>
                    <select
                      value={rainDateMonth}
                      onChange={(e) => setRainDateMonth(e.target.value)}
                    >
                      <option value="">Month</option>
                      {[...Array(12)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {new Date(0, index).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={rainDateDay}
                      onChange={(e) => setRainDateDay(e.target.value)}
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
                      onChange={(e) => setRainDateYear(e.target.value)}
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
                  <p className="flex-grow-2 w-100">All Day Event:</p>
                  <input
                    type="checkbox"
                    checked={postEventData.allDay}
                    onChange={(e) =>
                      setPostEventData({
                        ...postEventData,
                        allDay: e.target.checked,
                      })
                    }
                  ></input>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <p>Start Time:</p>
                  <select
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    disabled={postEventData.allDay}
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
                    disabled={postEventData.allDay}
                  >
                    <option value="">Minute</option>
                    {["00", "15", "30", "45"].map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <p>End Time:</p>
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    disabled={postEventData.allDay}
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
                    disabled={postEventData.allDay}
                  >
                    <option value="">Minute</option>
                    {["00", "15", "30", "45"].map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center">
                  <p className="w-100 my-auto">Upload Image:</p>
                  <div className="justify-self-end w-100 m-0 p-0">
                    {postEventData.urlPhoto === "" ? (
                      <ImageUploader
                        data={postEventData}
                        setData={setPostEventData}
                      />
                    ) : (
                      <div className="m-0 p-0">
                        <div className="m-0 p-0 d-flex justify-content-end align-items-center">
                          <FaCheckCircle />{" "}
                          <p className="my-0 mx-3">Success!</p>
                          <button
                            className="bg-danger text-white fw-bold border border-1 border-white"
                            onClick={() =>
                              setPostEventData({
                                ...postEventData,
                                urlPhoto: "",
                              })
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <p className="w-100 my-auto">Upload PDF:</p>
                  <div className="justify-self-end w-100 m-0 p-0">
                    {postEventData.urlPDF === undefined ||
                    postEventData.urlPDF === "" ? (
                      <PDFUploader
                        data={postEventData}
                        setData={setPostEventData}
                      />
                    ) : (
                      <div className="m-0 p-0">
                        <div className="m-0 p-0 d-flex justify-content-end align-items-center">
                          <FaCheckCircle />
                          <p className="my-0 mx-3">Success!</p>
                          <button
                            className="bg-danger text-white fw-bold border border-1 border-white"
                            onClick={() =>
                              setPostEventData({
                                ...postEventData,
                                urlPDF: "",
                              })
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {postEventData.urlPDF && postEventData.urlPDF !== "" && (
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <p>PDF Text:</p>
                    <input
                      placeholder="View PDF"
                      value={postEventData.pdfButtonText}
                      onChange={(e) =>
                        setPostEventData({
                          ...postEventData,
                          title: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                )}
              </div>
            </div>
            <div className="w-75">
              <div className="d-flex flex-column justify-content-between">
                {" "}
                <p>Short Description:</p>
                <textarea
                  placeholder="Short description"
                  value={postEventData.descriptionShort}
                  onChange={(e) =>
                    setPostEventData({
                      ...postEventData,
                      descriptionShort: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="d-flex flex-column justify-content-between">
                {" "}
                <p>Full Description:</p>
                <textarea
                  placeholder="Full description"
                  value={postEventData.description}
                  onChange={(e) =>
                    setPostEventData({
                      ...postEventData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
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

export default PostNewEvent;
