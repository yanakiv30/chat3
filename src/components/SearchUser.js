import { useContext } from "react";

function SearchUser(ChatContext) {
  const { searchQuery, setSearchQuery } = useContext(ChatContext);
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search user..."
    />
  );
}

export default SearchUser;
