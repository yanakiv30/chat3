import { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import CheckboxList from "./CheckboxList";
import Avatar from "./Avatar";

function UserList({ ChatContext }) {
  const { loggedInUser, searchQuery, users, setLoggedInUser } =
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
        <p>🗣️ChatSpa</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br></br>
      <div className="icon-and-search">
        {/* <h2 style={{ fontSize: "35px" }}>{loggedInUser.username}!</h2> */}
        <Avatar name={loggedInUser.username}/>
        <SearchUser ChatContext={ChatContext} />
      </div>
<br></br>
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
