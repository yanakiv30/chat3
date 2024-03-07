import { Link } from "react-router-dom";

function UserList({ users, loggedInUser }) {
    return (
      <div className="user-list-container">
        <ul>
          {users
            .filter((user) => user.id !== loggedInUser.id)
            .map((user) => (
              <li key={user.id}>
                <input type="checkbox" />
                {/* checkbox without any action */}
                <Link to={`/messages/${user.id}`}>{user.username}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  export default UserList;