import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: any) => {
    event.preventDefault();

    router.push(`/searchResults?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form className="d-none d-xl-inline" onSubmit={handleSearch}>
      <button className="noStyleButt" type="submit">
        <FaMagnifyingGlass className="m-3" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchComponent;
