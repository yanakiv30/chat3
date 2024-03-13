import React, { useState, useEffect, createContext } from "react";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import GroupChat from "./Pages/GroupChat";

const API_URL = "http://localhost:3001";
let isUserActive = false;

const ChatContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [isGroup, setIsGroup] = useState(false);

  const searchedUser =
    searchQuery.length > 0
      ? users.filter(
          (user) => user && user.username && user.username.includes(searchQuery)
        )
      : users;

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

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    fetch(`${API_URL}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleLogin = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setLoggedInUser(user); //user is a object
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <ChatContext.Provider
      value={{
        users: users,
        loggedInUser: loggedInUser,
        isUserActive: isUserActive,
        setMessages: setMessages,
        messages: messages,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        searchedUser,
        searchMessage,
        setSearchMessage,
        isGroup,
        setIsGroup
      }}
    >
      <Router>
        <div className="app-container">
          {loggedInUser ? (
            <div className="main-container">
              <div className="left-container">
                <UserList ChatContext={ChatContext} />
                <div className="button-link">
                  <h2>Welcome, {loggedInUser.username}!</h2>
                  <button onClick={handleLogout}>Logout</button>
                  <NavLink to={`/messages/group`}>GroupChat</NavLink>
                </div>
              </div>
              <Routes>
                <Route
                  path="/messages/:userId"
                  element={<UserProfile ChatContext={ChatContext} />}
                />
                <Route path="/messages/group" element={<GroupChat />} />
              </Routes>
            </div>
          ) : (
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
          )}
        </div>
      </Router>
    </ChatContext.Provider>
  );
}

export default App;
