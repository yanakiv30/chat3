import { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";

function UserList({ ChatContext }) {
  const { searchedUser, loggedInUser } = useContext(ChatContext);

  return (
    <div className="user-list-container">
      <SearchUser ChatContext={ChatContext} />
      
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
    </div>
  );
}
export default UserList;
