import { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import GroupList from "./GroupList";

function UserList({ ChatContext }) {
  const { searchedUser, loggedInUser, handleLogout } = useContext(ChatContext);

  return (
    <div className="user-list-container">
      <div className="button-link">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br></br>

      <h2 style={{ fontSize: "35px" }}>Welcome, {loggedInUser.username}!</h2>
      <p>Chat with:</p>
      <ul>
        {searchedUser
          .filter((user) => user.id !== loggedInUser.id)
          .map((user) => (
            <li key={user.id}>
              {/* <input type="checkbox" /> */}

              <NavLink to={`/messages/${user.id}`}>{user.username}</NavLink>
            </li>
          ))}
      </ul>
      <br></br>
      <SearchUser ChatContext={ChatContext} />
      <br></br>
      <br></br>
      <br></br>
      <GroupList ChatContext={ChatContext} />
      <br></br>
    </div>
  );
}
export default UserList;
