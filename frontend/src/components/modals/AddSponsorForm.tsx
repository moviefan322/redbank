import React, { useState } from "react";
import UpdateEventTiersReq from "@/types/UpdateEventTiersReq";

interface AddSponsorFormProps {
  index: number;
  setPostTierData: React.Dispatch<React.SetStateAction<UpdateEventTiersReq>>;
}

const AddSponsorForm = ({ index, setPostTierData }: AddSponsorFormProps) => {
  const [sponsorName, setSponsorName] = useState("");

  const handleAddSponsor = () => {
    setPostTierData((prevData) => {
      const newTiers = [...prevData.tiers];
      newTiers[index].sponsors.push({
        name: sponsorName,
        image: "",
        url: "",
      });
      return { ...prevData, tiers: newTiers };
    });
  };

  return (
    <div>
      <input
        type="text"
        value={sponsorName}
        onChange={(e) => setSponsorName(e.target.value)}
        placeholder="Sponsor Name"
      />
      <button onClick={handleAddSponsor}>Add Sponsor</button>
    </div>
  );
};

export default AddSponsorForm;
