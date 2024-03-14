import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser";
import CheckboxList from "./CheckboxList";

function UserList({ ChatContext }) {
  const { searchedUser, loggedInUser, handleLogout, single, setSingle } =
    useContext(ChatContext);
  
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
      <br></br>

      <h2 style={{ fontSize: "35px" }}>Welcome, {loggedInUser.username}!</h2>
      {single ? (
        <>
          <SearchUser ChatContext={ChatContext} />
          <br></br>
          <p>Start Single chat with:</p>
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
          <br></br>
          <br></br>
          <p>Or</p>

          <button style={{ width: "fit-content" }} onClick={handleGroup}>
            Switch to GroupChat
          </button>
        </>
      ) : (
        <>
          <CheckboxList ChatContext={ChatContext} />
          <br></br>
          <br></br>
          <p>Or</p>
          <button style={{ width: "fit-content" }} onClick={handleSingle}>
            Switch to SingleChat:
          </button>
        </>
      )}
    </div>
  );
}
export default UserList;
