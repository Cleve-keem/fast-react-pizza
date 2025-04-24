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
        className="bg-stone-50"
        type="text"
        value={query}
        placeholder="Search order #"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
