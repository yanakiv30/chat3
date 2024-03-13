import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import CheckboxList from "./CheckboxList";

function UserList({ ChatContext }) {
  const { isGroup,searchedUser, loggedInUser } = useContext(ChatContext);
 
  return (
    <div className="user-list-container">
     { isGroup ? "":
      <>
      <SearchUser ChatContext={ChatContext} />
      <p>Chat with single user:</p>
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
      </> }
      <p>Chat in group with:</p>
       <CheckboxList ChatContext={ChatContext} />
    </div>
  );
}
export default UserList;
