import { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import CheckboxList from "./CheckboxList";

function UserList({ ChatContext }) {
  const { loggedInUser, searchQuery, users, setLoggedInUser} =
    useContext(ChatContext);
  const searchedUser =
    searchQuery.length > 0
      ? users.filter(
          (user) => user && user.username && user.username.includes(searchQuery)
        )
      : users;

  function handleLogout() {
    setLoggedInUser(null);
  }

  return (
    <div className="user-list-container">
      <div className="button-link">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br></br>

      <h2 style={{ fontSize: "35px" }}>
        Welcome, to Chat {loggedInUser.username}!
      </h2>
      
          <SearchUser ChatContext={ChatContext} />
          <ul>
            {searchedUser
              .filter((user) => user.id !== loggedInUser.id)
              .map((user) => (
                <li key={user.id}>
                  <NavLink to={`/messages/${user.id}`}>{user.username}</NavLink>
                </li>
              ))}
          </ul>
     
      <CheckboxList ChatContext={ChatContext} />
    </div>
  );
}
export default UserList;
