import { useContext } from "react";

function SearchInMessage({ ChatContext }) {
  const { searchMessage, setSearchMessage } = useContext(ChatContext);

  return (
    <input
      style={{ width: "40%", borderRadius: "7px" }}
      value={searchMessage}
      onChange={(e) => setSearchMessage(e.target.value)}
      placeholder="🔍 Search in messages ..."
    />
  );
}

export default SearchInMessage;
