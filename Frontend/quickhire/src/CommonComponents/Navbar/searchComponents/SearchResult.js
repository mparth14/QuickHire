import "./SearchResult.css";

export const SearchResult = ({ result,id }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result} with id - ${id}!`)}
    >
      {result}
    </div>
  );
};
