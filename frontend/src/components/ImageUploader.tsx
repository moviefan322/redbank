import React, { useState } from "react";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../hooks/reduxHooks";
import {
  uploadImage,
  selectUploading,
  selectImageUrl,
  selectError,
} from "../features/upload/uploadSlice";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./ImageUploader.module.css";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const uploading = useSelector(selectUploading);
  const imageUrl = useSelector(selectImageUrl);
  const error = useSelector(selectError);

  const handleSelectFile = (e: any) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // Dispatch the Redux action here with the formData
      dispatch(uploadImage(formData as any)); // Cast to any if your formData type does not match exactly; better to define a proper type
    }
  };

  return (
    <div className="d-flex flex-row align-items-center py-2">
      {file && <code>{file.name}</code>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
        style={{ display: "none" }} // Inline style for hiding
      />
      {!file ? (
        <button
          onClick={() => document.getElementById("file")!.click()}
          className="btn-admin mx-5"
          style={imageUrl ? { display: "none" } : {}}
        >
          Choose File
        </button>
      ) : (
        <button className="btn-admin-red mx-5" onClick={() => setFile(null)}>
          Cancel
        </button>
      )}

      {imageUrl && (
        <>
          {" "}
          <FaCheckCircle className="me-3" size={20} /> Image Uploaded
          Successfully
        </>
      )}

      {error && <FaExclamationTriangle className={styles.error} size={20} />}
      {file && !imageUrl && (
        <button onClick={handleUpload} className="btn-admin">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
