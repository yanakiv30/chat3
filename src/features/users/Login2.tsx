import { useState } from "react";

import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setLoggedInUser, addUser } from "./userSlice";
import { useAppSelector } from "../../store";
const API_URL = "http://localhost:3001";

export default function Login2() {
  const { users } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isPressed, setIsPressed] = useState(false);
  console.log("isPress= ", isPressed);

  function handleLogin(username: string, password: string) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      dispatch(setLoggedInUser(user)); //user is a object
    } else {
      alert("Invalid credentials");
    }
  }

  async function handleSignUp(newUsername: string, newPassword: string) {
    if (users.some((user) => user.username === newUsername)) {
      alert("This username already exists!");
      return;
    }
    const newUser = {
      id: uuid(),
      username: newUsername,
      password: newPassword,
    };
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(addUser(data));
      dispatch(setLoggedInUser(data));
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div className="background-login">
      {!isPressed ? (
        <div className="login">
          <h2>Welcome to chatSPA</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);

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

          <p>
            If you don't have an account , please :
            <button onClick={() => setIsPressed(true)}>Register</button>
          </p>
        </div>
      ) : (
        <div className="login">
          <h2>Please Sign Up</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newUsername = formData.get("newUsername");
              const newPassword = formData.get("newPassword");
              if (
                typeof newUsername === "string" &&
                typeof newPassword === "string"
              )
                handleSignUp(newUsername, newPassword);
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
          </form>
        </div>
      )}
    </div>
  );
}
