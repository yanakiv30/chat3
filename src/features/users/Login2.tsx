import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { setLoggedInUser, addUser } from "../users/userSlice";

const API_URL = "http://localhost:3001";

export default function Login2() {
  const { users } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  

  function handleLogin(username, password) {
    // console.log("users", users);
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    // console.log("user= ", user);
    if (user) {
      dispatch(setLoggedInUser(user)); //user is a object
    } else {
      alert("Invalid credentials");
    }
  }
  // console.log(users,setUsers,setLoggedInUser)
  return (
    <div className="background-login">
      <div className="login">
        <h2>Welcome to chatSPA</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            // console.log(formData);
            handleLogin(formData.get("username"), formData.get("password"));
          }}
        >
          <label>
            Username:
            <input type="text" name="username" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>

          <button type="submit">Login</button>
        </form>
        <br></br>
        <br></br>
        <br></br>

       
      </div>
    </div>
  );
}
