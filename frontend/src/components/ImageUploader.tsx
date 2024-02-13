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
}

const ImageUploader = <T extends {}>({
  data,
  setData,
}: ImageUploaderProps<T>) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const uploading = useSelector(selectUploading);
  const imageUrl = useSelector(selectImageUrl);
  const error = useSelector(selectError);

  useEffect(() => {
    if (imageUrl) {
      setData({ ...data, urlPhoto: imageUrl });
    }
  }, [imageUrl]);

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
    <div className="d-flex flex-row align-items-center py-2">
      {file && (
        <code style={imageUrl ? { display: "none" } : {}}>{file.name}</code>
      )}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
        style={{ display: "none" }} // Inline style for hiding
      />
      {!file ? (
        <button
          type="button"
          onClick={() => document.getElementById("file")!.click()}
          className={`${styles.chooseFile} btn-admin mx-5`}
          style={imageUrl ? { display: "none" } : {}}
        >
          Choose File
        </button>
      ) : (
        <button
          type="button"
          className="btn-admin-red mx-5"
          onClick={handleCancel}
          style={imageUrl ? { display: "none" } : {}}
        >
          Cancel
        </button>
      )}

      {imageUrl && (
        <>
          {" "}
          <FaCheckCircle className="me-3" size={50} /> Image Uploaded
          Successfully
        </>
      )}

      {error && <FaExclamationTriangle className={styles.error} size={20} />}
      {file && !imageUrl && (
        <button type="button" onClick={handleUpload} className="btn-admin">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
