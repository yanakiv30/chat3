import { NavLink } from "react-router-dom";

function UserList({ users, loggedInUser }) {
  
    return (
      <div className="user-list-container">
        <h3>Chat with:</h3>
        <br></br>
        <ul>
          {users
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