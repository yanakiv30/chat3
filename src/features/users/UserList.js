
import { Link, NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";

import Avatar from "./Avatar";

import GroupList from "../groups/GroupList";
import { useSelector } from "react-redux";

function UserList() {
  
  const { searchQuery,users, loggedInUser  } = useSelector(store=>store.user);
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
          <p>{loggedInUser.username}<Link to={"/userOptions"}>▼</Link></p>
        </div>

        <SearchUser />
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
      <GroupList />
    </div>
  );
}
export default UserList;
