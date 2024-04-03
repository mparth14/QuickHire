import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import { CONFIG } from "../../../config";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = debounce((value) => {
    console.log(value);
    if (!value) {
      setResults([]);
      return;
    }
    fetch(`${CONFIG.BASE_PATH}services/search?value=${value}`)
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.map((service) => ({
          id: service._id,
          title: service.title,
        }));
        setResults(filteredResults);
      });
  }, 300);

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
