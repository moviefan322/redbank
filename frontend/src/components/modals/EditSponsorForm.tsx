import React, { useState } from "react";
import SponsorImageUploader from "@/components/SponsorImageUploader";
import Sponsor from "@/types/Sponsor";

interface EditSponsorFormProps {
  tierIndex: number;
  sponsorIndex: number;
  sponsor: Sponsor;
  updateSponsor: (
    tierIndex: number,
    sponsorIndex: number,
    updatedSponsor: Sponsor,
    newTierIndex: number,
    newPositionIndex: number
  ) => void;
  toggleEditSponsorForm: (tierIndex: number, sponsorIndex: number) => void;
  tiers: Array<{
    name: string;
    sponsors: Sponsor[];
  }>;
}

interface ValidationResponse {
  isValid: boolean;
  errors: string[];
}

const EditSponsorForm = ({
  tierIndex,
  sponsorIndex,
  sponsor,
  updateSponsor,
  toggleEditSponsorForm,
  tiers,
}: EditSponsorFormProps) => {
  const [sponsorName, setSponsorName] = useState(sponsor.name);
  const [image, setImage] = useState(sponsor.image.imageUrl);
  const [url, setUrl] = useState(sponsor.url || "");
  const [height, setHeight] = useState(sponsor.image.height);
  const [width, setWidth] = useState(sponsor.image.width);
  const [borderRadius, setBorderRadius] = useState(sponsor.image.borderRadius);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [newTierIndex, setNewTierIndex] = useState(tierIndex);
  const [newPositionIndex, setNewPositionIndex] = useState(sponsorIndex);

  const handleUpdateSponsor = () => {
    const validationResponse = validateSponsorData({
      name: sponsorName,
      image: { imageUrl: image, height, width, borderRadius },
      url,
    });

    if (!validationResponse.isValid) {
      setValidationErrors(validationResponse.errors);
      return;
    }

    updateSponsor(
      tierIndex,
      sponsorIndex,
      {
        name: sponsorName,
        image: { imageUrl: image, height, width, borderRadius },
        url,
      },
      newTierIndex,
      newPositionIndex
    );

    toggleEditSponsorForm(tierIndex, sponsorIndex);
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

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return (
    <div className="d-flex flex-column">
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
      <div className="d-flex flex-column align-items-center">
        <label>Move to Tier:</label>
        <select
          value={newTierIndex}
          onChange={(e) => setNewTierIndex(parseInt(e.target.value))}
        >
          {tiers.map((tier, index) => (
            <option key={index} value={index}>
              {tier.name}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex flex-column align-items-center">
        <label>Position in Tier:</label>
        <select
          value={newPositionIndex}
          onChange={(e) => setNewPositionIndex(parseInt(e.target.value))}
        >
          {Array(
            newTierIndex === tierIndex
              ? tiers[newTierIndex].sponsors.length
              : tiers[newTierIndex].sponsors.length + 1
          )
            .fill(null)
            .map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
        </select>
      </div>
      <div>
        {image ? (
          <div className="borderLime">
            <h4>Image Editor</h4>
            <div
              className="imagePreview mx-auto"
              style={{
                width: `${Math.max(50, Math.min(width, 350))}px`,
                height: `${Math.max(50, Math.min(height, 350))}px`,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: `${Math.max(0, Math.min(borderRadius, 100))}%`,
              }}
            ></div>
            <div className="d-flex flex-column mx-auto">
              <div>
                <label>Height: </label>
                <br />
                <input
                  type="number"
                  value={height}
                  onChange={(e) =>
                    setHeight(
                      Math.max(50, Math.min(parseInt(e.target.value), 350))
                    )
                  }
                  placeholder="Height"
                />
              </div>
              <div>
                <label>Width: </label>
                <br />
                <input
                  type="number"
                  value={width}
                  onChange={(e) =>
                    setWidth(
                      Math.max(50, Math.min(parseInt(e.target.value), 350))
                    )
                  }
                  placeholder="Width"
                />
              </div>
              <div>
                <label>Border Radius: </label>
                <br />
                <input
                  type="number"
                  value={borderRadius}
                  onChange={(e) =>
                    setBorderRadius(
                      Math.max(0, Math.min(parseInt(e.target.value), 100))
                    )
                  }
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
          <SponsorImageUploader setImage={setImage} />
        )}
      </div>
      <div className="d-flex flex-row w-100 justify-content-around">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUpdateSponsor();
          }}
          className="btn-admin"
        >
          Update
        </button>
        <button
          onClick={() => toggleEditSponsorForm(tierIndex, sponsorIndex)}
          className="btn-admin-red"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditSponsorForm;
