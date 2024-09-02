import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { uploadImage, selectUploading, selectImageUrl, selectError, resetUploadState } from "@/features/upload/uploadSlice";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import styles from "./SponsorImageUploader.module.css";

interface SponsorImageUploaderProps {
  setImage: (imageUrl: string) => void;
}

const SponsorImageUploader = ({ setImage }: SponsorImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const {uploading, success} = useAppSelector(selectUploading);
  const imageUrl = useAppSelector(selectImageUrl);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
      dispatch(resetUploadState());
    }
  }, [imageUrl, dispatch, setImage]);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

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
    <div className="d-flex flex-column align-items-start">
      <div className="d-flex flex-row align-items-center">
        {file && (
          <code className={`${styles.filename}`} style={imageUrl ? { display: "none" } : {}}>
            {file.name}
          </code>
        )}
        <input
          id="file"
          type="file"
          onChange={handleSelectFile}
          multiple={false}
          style={{ display: "none" }} // Hide the default file input
        />
        {!file && !success ? (
          <button
            type="button"
            onClick={() => document.getElementById("file")!.click()}
            className={`${styles.chooseFile} btn-admin`}
            style={imageUrl ? { display: "none" } : {}}
          >
            Select Image
          </button>
        ) : (
          <button type="button" className="btn-admin-red" onClick={handleCancel} style={imageUrl ? { display: "none" } : {}}>
            X
          </button>
        )}
      </div>

      {imageUrl && (
        <div className="d-flex align-items-center">
          <FaCheckCircle className="me-3" size={30} /> Image Uploaded
        </div>
      )}

      {error && (
        <div className="d-flex align-items-center">
          <FaExclamationTriangle className={styles.error} size={20} /> Upload Failed
        </div>
      )}

      {file && !imageUrl && (
        <div className="d-flex flex-column align-items-start">
          <button type="button" onClick={handleUpload} className="btn-admin mt-2">
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {uploading && <p>Uploading...</p>}
        </div>
      )}
    </div>
  );
};

export default SponsorImageUploader;
