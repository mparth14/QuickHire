import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result, id }) => {
  const history = useHistory();

  const handleOnClick = () => {
    history.push(`/services/${id}`);
  };

  return (
    <div className="search-result" onClick={handleOnClick}>
      {result}
    </div>
  );
};
