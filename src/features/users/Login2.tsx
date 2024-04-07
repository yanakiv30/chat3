import { useDispatch } from "react-redux";

import { setLoggedInUser } from "./userSlice";
import { useAppSelector } from "../../store";

export default function Login2() {
  const { users } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  function handleLogin(username: string, password: string) {
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
            const formData = new FormData(e.target as HTMLFormElement);
            // console.log(formData);
            const username = formData.get("username");
            const password = formData.get("password");
            if (typeof username === "string" && typeof password === "string")
              handleLogin(username, password);
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
      <div className="to-sign">
      <p>If you don't have an account 
        , please :  <button>Register</button> </p>
      </div>
    </div>
    
  );
}
