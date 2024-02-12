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
    <div className="App">
      <label htmlFor="file" className="btn-grey">
        select file
      </label>
      {file && <center>{file?.name}</center>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      <code>
        {imageUrl && (
          <p className="output-item">
            <span>Image URL:</span>
            <span>{imageUrl}</span>
          </p>
        )}
      </code>
      {error && <p>Error: {error}</p>}
      {file && (
        <button onClick={handleUpload} className="btn-green">
          {uploading ? "Uploading..." : "Upload to Cloudinary"}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
