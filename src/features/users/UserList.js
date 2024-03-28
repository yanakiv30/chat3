import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";

import Avatar from "./Avatar";

import GroupList from "../groups/GroupList";

function UserList({ ChatContext }) {
  const { loggedInUser, searchQuery, users } = useContext(ChatContext);
  const searchedUser =
    searchQuery.length > 0
      ? users.filter(
          (user) => user && user.username && user.username.includes(searchQuery)
        )
      : users;

  return (
    <div className="user-list-container">
      <div className="button-link">
        <p>🗣️ChatSpa</p>
      </div>
      <br></br>
      <div className="icon-and-search">
        <div style={{ display: "flex" }}>
          <Avatar name={loggedInUser.username} />
          <Link to={"/userOptions"}>▼</Link>
        </div>

        <SearchUser ChatContext={ChatContext} />
      </div>
      <br></br>
      <ul>
        {searchedUser
          .filter((user) => user.id !== loggedInUser.id)
          .map((user) => (
            <li key={user.id}>
              <div style={{ display: "flex", gap: "5px" }}>
                <Avatar name={user.username} />
                <NavLink to={`/messages/${user.id}`}>{user.username}</NavLink>
              </div>
            </li>
          ))}
      </ul>
      <GroupList ChatContext={ChatContext} />
    </div>
  );
}
export default UserList;
