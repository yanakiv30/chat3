import { useContext } from "react";

function SearchInMessage({ ChatContext }) {
  const { searchMessage, setSearchMessage } = useContext(ChatContext);

  return (
    <input
      value={searchMessage}
      onChange={((e) => setSearchMessage(e.target.value))}
      placeholder="Search in messages ..."
    />
  );
}

export default SearchInMessage;
