import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map(({title, id}) => {
        return <SearchResult result={title} id = {id} key={id} />;
      })}
    </div>
  );
};
