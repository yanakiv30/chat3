import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setLoggedInUser, addUser } from "./userSlice";
import { useAppSelector } from "../../store";
const API_URL = "http://localhost:3001";

export default function Login2() {
  const { users } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

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
      <div className="login">
        <h2>Welcome to chatSPA</h2>      
        <br></br>
        <br></br>
        <br></br>
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
    </div>
  );
}
