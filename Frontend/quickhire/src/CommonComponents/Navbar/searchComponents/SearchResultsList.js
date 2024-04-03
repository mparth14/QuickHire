import React, { useState, useEffect, useRef } from 'react';
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  const [isVisible, setIsVisible] = useState(true);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true); // Set visibility to true when new results are received
  }, [results]);

  return (
    <div ref={searchResultsRef} style={{ display: isVisible ? 'block' : 'none' }} className="results-list">
      {results.map(({ title, id }) => {
        return <SearchResult result={title} id={id} key={id} />;
      })}
    </div>
  );
};
