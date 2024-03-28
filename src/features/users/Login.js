
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {setUsers,setLoggedInUser  } from '../users/userSlice';
const API_URL = "http://localhost:3001";

export default function Login() {
 
  const { users } = useSelector(store=>store.user);
  const dispatch = useDispatch();
  function handleSignUp(newUsername, newPassword) {
    const newUser = {
      id: uuid(),
      username: newUsername,
      password: newPassword,
    };

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => dispatch(setUsers( data)))
      .catch((error) => console.error("Error creating user:", error));
  }

  function handleLogin(username, password) {
    console.log(users[0]);
    const user = users[0].find(
      (u) => u.username === username && u.password === password
    );
    console.log(user)
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
            console.log(formData);
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
        <br></br><br></br><br></br>
       
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSignUp(
              formData.get("newUsername"),
              formData.get("newPassword")
            );
          }}
        >
          <label>
            New Username:
            <input type="text" name="newUsername" required />
          </label>
          <label>
            New Password:
            <input type="password" name="newPassword" required />
          </label>
          <button type="submit">Sign Up</button>
        </form> */}
      </div>
    </div>
  );
}
