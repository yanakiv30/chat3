import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import CheckboxList from "./CheckboxList";

function UserList({ ChatContext }) {
  const {
    isGroup,
    searchedUser,
    loggedInUser,
    handleLogout,
    single,
    setSingle,
  } = useContext(ChatContext);

  function handleSingle() {
    setSingle(true);
  }
  function handleGroup() {
    setSingle(false);
  }

  return (
    <div className="user-list-container">
      <div className="button-link">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2 style={{ fontSize: "35px" }}>Welcome, {loggedInUser.username}!</h2>
      {single?
      <>
        <SearchUser ChatContext={ChatContext} />
        <button style={{ width: "fit-content" }} onClick={handleSingle}>
          Switch to SingleChat:
        </button>
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
      

      <button style={{ width: "fit-content" }} onClick={handleGroup}>
        Switch to GroupChat
      </button>
      </>:
      <>
      <button style={{ width: "fit-content" }} onClick={handleSingle}>
          Switch to SingleChat:
        </button>
      <CheckboxList ChatContext={ChatContext} />
      
       </>
      
      }
    
      
    </div>
  );
}
export default UserList;
