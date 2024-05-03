import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function Spinner() {
  return (
    <div className="spinner">
      <FontAwesomeIcon icon={faSpinner} spin size="1x" />
    </div>
  );
}
export default Spinner;
