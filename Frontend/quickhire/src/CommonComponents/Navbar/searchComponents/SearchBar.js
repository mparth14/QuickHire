import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    console.log(value);
    if (!value) {
      setResults([]); 
      return; 
    }
    fetch(`http://localhost:4000/api/v1/services/search?title=${value}`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((service) => {
          return (
            service.title
          );
        });
        setResults(results);
      });
  };

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
