import React, { useState } from "react";
import { useRouter } from "next/router";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: any) => {
    event.preventDefault();

    router.push(`/searchResults?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
