import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-yellow-100 px-4 py-2 rounded-full text-sm  w-28 sm:w-64  transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-600 sm:focus:w-80 focus:ring-opacity-50 placeholder:text-stone-400"
        type="text"
        value={query}
        placeholder="Search order #"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
