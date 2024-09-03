import React, { useState } from "react";
import SponsorImageUploader from "@/components/SponsorImageUploader";
import Sponsor from "@/types/Sponsor";

interface AddSponsorFormProps {
  index: number;
  addSponsor: (index: number, sponsor: Sponsor) => void;
  toggleAddSponsorForm: (index: number) => void;
}

interface ValidationResponse {
  isValid: boolean;
  errors: string[];
}

const AddSponsorForm = ({
  index,
  addSponsor,
  toggleAddSponsorForm,
}: AddSponsorFormProps) => {
  const [sponsorName, setSponsorName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [height, setHeight] = useState(75);
  const [width, setWidth] = useState(75);
  const [borderRadius, setBorderRadius] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleAddSponsor = () => {
    const sponsorData: Sponsor = {
      name: sponsorName,
      image: { imageUrl: image, height, width, borderRadius },
      url,
    };

    const validationResponse = validateSponsorData(sponsorData);

    if (!validationResponse.isValid) {
      setValidationErrors(validationResponse.errors);
      return;
    }

    // Close the add sponsor form before updating the state
    toggleAddSponsorForm(index);

    // Add the sponsor
    addSponsor(index, sponsorData);

    // Reset form fields
    setSponsorName("");
    setImage("");
    setUrl("");
    setHeight(75); // Reset to default values
    setWidth(75); // Reset to default values
    setBorderRadius(0); // Reset to default values
    setValidationErrors([]);
  };

  const validateSponsorData = (sponsor: Sponsor): ValidationResponse => {
    const errors: string[] = [];

    if (!sponsor.name) {
      errors.push("Sponsor name is required.");
    }

    if (!sponsor.image.imageUrl) {
      errors.push("Image URL is required.");
    }

    if (sponsor.image.height < 50 || sponsor.image.height > 350) {
      errors.push("Height must be between 50 and 350.");
    }

    if (sponsor.image.width < 50 || sponsor.image.width > 350) {
      errors.push("Width must be between 50 and 350.");
    }

    if (sponsor.image.borderRadius < 0 || sponsor.image.borderRadius > 100) {
      errors.push("Border radius must be between 0 and 100.");
    }

    if (sponsor.url && !sponsor.url.startsWith("http")) {
      errors.push("URL must start with 'http'.");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return (
    <div className="d-flex flex-column borderLime">
      {validationErrors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="d-flex flex-column align-items-center">
        <label>Name: </label>
        <input
          type="text"
          value={sponsorName}
          onChange={(e) => setSponsorName(e.target.value)}
          placeholder="Sponsor Name"
        />
      </div>
      <div className="d-flex flex-column align-items-center">
        <label>Url Endpoint: </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Url Endpoint"
        />
      </div>
      <div>
        {image ? (
          <div className="borderLime">
            <h4>Image Editor</h4>
            <div
              className="imagePreview mx-auto"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: `${borderRadius}%`,
                transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
              }}
            ></div>
            <div className="d-flex flex-column mx-auto">
              <div>
                <label>Height: </label>
                <input
                  type="range"
                  min="50"
                  max="350"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  placeholder="Height"
                />
              </div>
              <div>
                <label>Width: </label>
                <input
                  type="range"
                  min="50"
                  max="350"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  placeholder="Width"
                />
              </div>
              <div>
                <label>Border Radius: </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                  placeholder="Border Radius"
                />
              </div>
              <div>
                <button
                  className="btn-admin-red"
                  onClick={() => setImage("")}
                  style={{ width: "100px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <SponsorImageUploader setImage={setImage} />
          </div>
        )}
      </div>
      <div className="d-flex flex-row w-100 justify-content-around">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddSponsor();
          }}
          className="btn-admin"
        >
          Save
        </button>
        <button
          onClick={() => toggleAddSponsorForm(index)}
          className="btn-admin-red"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSponsorForm;
