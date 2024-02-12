import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/configureStore";
import { uploadImage } from "../features/upload/uploadSlice";
import { UploadImageForm } from "@/types/UploadImageForm";

const ImageUploader: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploading, error, imageUrl } = useAppSelector(
    (state: RootState) => state.imageUploader
  );

  const handleUpload = () => {
    if (selectedFile) {
      const uploadForm: UploadImageForm = { file: selectedFile };
      dispatch(uploadImage(uploadForm));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p>Error: {error}</p>}
      {imageUrl && <p>Image URL: {imageUrl}</p>}
    </div>
  );
};

export default ImageUploader;
