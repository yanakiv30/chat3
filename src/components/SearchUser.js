import { useContext } from "react";

function SearchUser({ ChatContext }) {
  const { searchQuery, setSearchQuery } = useContext(ChatContext);

  return (
    <input
      style={{ width: "fit-content" }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search in users or groups"
    />
  );
}

export default SearchUser;
