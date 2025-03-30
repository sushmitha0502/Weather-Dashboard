import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city"
        className="px-4 py-2 border rounded shadow"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
