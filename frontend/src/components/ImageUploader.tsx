/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../hooks/reduxHooks";
import {
  uploadImage,
  selectUploading,
  selectImageUrl,
  selectError,
  resetUploadState,
} from "../features/upload/uploadSlice";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps<T> {
  data: T;
  setData: (data: T) => void;
  buttonText?: string;
  imageParam?: string;
}

const ImageUploader = <T extends {}>({
  data,
  setData,
  buttonText = "Upload Image",
  imageParam = "urlPhoto",
}: ImageUploaderProps<T>) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const uploading = useSelector(selectUploading);
  const imageUrl = useSelector(selectImageUrl);
  const error = useSelector(selectError);

  useEffect(() => {
    if (imageUrl) {
      setData({ ...data, [imageParam ? imageParam : "urlPhoto"]: imageUrl });
    }
  }, [imageUrl]);

  useEffect(() => {
    // Reset upload state when an image URL is successfully obtained or when an error occurs
    if (imageUrl || error) {
      dispatch(resetUploadState());
    }
  }, [imageUrl, error, dispatch]);

  const handleSelectFile = (e: any) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadImage(formData as any));
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
            style={imageUrl ? { display: "none" } : {}}
          >
            {file.name}
          </code>
        )}
        <input
          id="file-image"
          type="file"
          onChange={handleSelectFile}
          multiple={false}
          style={{ display: "none" }} // Inline style for hiding
        />
        {!file ? (
          <button
            type="button"
            onClick={() => document.getElementById("file-image")!.click()}
            className={`${styles.chooseFile} btn-admin`}
            style={imageUrl ? { display: "none" } : {}}
          >
            {buttonText}
          </button>
        ) : (
          <button
            type="button"
            className="btn-admin-red"
            onClick={handleCancel}
            style={imageUrl ? { display: "none" } : {}}
          >
            X
          </button>
        )}
      </div>

      {imageUrl && (
        <>
          {" "}
          <FaCheckCircle className="me-3" size={30} /> Success
        </>
      )}

      {error && <FaExclamationTriangle className={styles.error} size={20} />}
      {file && !imageUrl && (
        <>
          <button type="button" onClick={handleUpload} className="btn-admin">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
