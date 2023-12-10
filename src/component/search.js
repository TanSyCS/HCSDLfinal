import React from "react";

const SearchBox = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search Here..."
    onChange={(e) => onSearch(e.target.value)}
    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
  />
);

export default SearchBox;
