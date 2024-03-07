import { Link } from "react-router-dom";

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
              
                <Link to={`/messages/${user.id}`}><button onClick={()=>{}}>{user.username}</button></Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  export default UserList;