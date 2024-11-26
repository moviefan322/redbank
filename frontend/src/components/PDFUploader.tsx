/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../hooks/reduxHooks";
import {
  uploadPDF,
  selectUploading,
  selectPDFUrl,
  selectError,
  resetUploadState,
} from "../features/upload/pdfUploader";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./PDFUploader.module.css";

interface PDFUploaderProps<T> {
  data: T;
  setData: (data: T) => void;
  buttonText?: string;
  pdfParam?: string;
}

const PDFUploader = <T extends {}>({
  data,
  setData,
  buttonText = "Upload PDF",
  pdfParam = "urlPDF",
}: PDFUploaderProps<T>) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const uploading = useSelector(selectUploading);
  const pdfUrl = useSelector(selectPDFUrl);
  const error = useSelector(selectError);

  useEffect(() => {
    if (pdfUrl) {
      setData({ ...data, [pdfParam ? pdfParam : "urlPDF"]: pdfUrl });
    }
  }, [pdfUrl]);

  useEffect(() => {
    // Reset upload state when a PDF URL is successfully obtained or when an error occurs
    if (pdfUrl || error) {
      dispatch(resetUploadState());
    }
  }, [pdfUrl, error, dispatch]);

  const handleSelectFile = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadPDF(formData as any)); // Adjust action for PDF uploads
    }
  };

  const handleCancel = () => {
    setFile(null);
  };

  return (
    <div className="d-flex flex-column align-items-end m-0 p-0">
      <div className="d-flex flex-row align-items-center justify-content-end m-0 p-0">
        {file && (
          <code
            className={`${styles.filename}`}
            style={pdfUrl ? { display: "none" } : {}}
          >
            {file.name}
          </code>
        )}
        <input
          id="file-pdf"
          type="file"
          onChange={handleSelectFile}
          multiple={false}
          style={{ display: "none" }} // Inline style for hiding
        />
        {!file ? (
          <button
            type="button"
            onClick={() => document.getElementById("file-pdf")!.click()}
            className={`${styles.chooseFile} btn-admin`}
            style={pdfUrl ? { display: "none" } : {}}
          >
            {buttonText}
          </button>
        ) : (
          <button
            type="button"
            className="btn-admin-red"
            onClick={handleCancel}
            style={pdfUrl ? { display: "none" } : {}}
          >
            X
          </button>
        )}
      </div>

      {pdfUrl && (
        <>
          {" "}
          <FaCheckCircle className="me-3" size={30} /> Success
        </>
      )}

      {error && <FaExclamationTriangle className={styles.error} size={20} />}
      {file && !pdfUrl && (
        <>
          <button type="button" onClick={handleUpload} className="btn-admin">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
    </div>
  );
};

export default PDFUploader;
