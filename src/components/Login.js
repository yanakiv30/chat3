import { v4 as uuid } from "uuid";
const API_URL = "http://localhost:3001";

export default function Login() {
   
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
          .then((data) => setUsers([...users, data]))
          .catch((error) => console.error("Error creating user:", error));
      } 

      function handleLogin (username, password) {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          setLoggedInUser(user); //user is a object
        } else {
          alert("Invalid credentials");
        }
      };

    return (
        <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleLogin(
              formData.get("username"),
              formData.get("password")
            );
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

        <form
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
        </form>
      </div>
    )
}
