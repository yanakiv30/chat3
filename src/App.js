import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:3001";

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

function UserProfile({ setMessages, loggedInUser, messages, users }) {
  const [newMessage, setNewMessage] = useState("");

  const params = useParams();
  const userInListId = params.userId;
  const userName = users.find((x) => x.id === userInListId).username;

  const userMessagesLeft = messages.filter(
    (message) =>
      message.receiverId === loggedInUser.id &&
      message.senderId === userInListId
  );
  const userMessagesRight = messages.filter(
    (message) =>
      message.receiverId === userInListId &&
      message.senderId === loggedInUser.id
  );

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObject = {
        id: uuid(),
        senderId: loggedInUser.id,
        receiverId: userInListId,
        senderUsername: loggedInUser.username,
        content: newMessage,
      };

      fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessageObject),
      })
        .then((response) => response.json())
        .then((data) => setMessages([...messages, data]))
        .catch((error) => console.error("Error posting message:", error));

      setNewMessage("");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="search-bar">
       🔍  Search
      </div>
      <div className="chat-with">
      <h3> Chat with {userName}</h3>
      </div>
      <div className="user-profile-container">
        

        <div className="flex-ul">
          <ul>
            {userMessagesLeft.map((message) => (
              <div className="send-to">
                <li key={message.id}>
                  <strong>{message.senderUsername}:</strong> {message.content}
                </li>
              </div>
            ))}
          </ul>

          <ul>
            {userMessagesRight.map((message) => (
              <div className="send-to">
                <li key={message.id}>
                  <strong>{message.senderUsername}:</strong> {message.content}
                </li>
              </div>
            ))}
          </ul>
        </div>

        <div className="send">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

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
    <Router>
      <div className="app-container">
        {loggedInUser ? (
          <div className="main-container">
            <div className="left-container">
              <UserList users={users} loggedInUser={loggedInUser} />
              <h2>Welcome, {loggedInUser.username}!</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>

            <Routes>
              <Route
                path="/messages/:userId"
                element={
                  <UserProfile
                    setMessages={setMessages}
                    loggedInUser={loggedInUser}
                    users={users}
                    messages={messages}
                  />
                }
              />
            </Routes>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
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

            <h2>Sign Up</h2>
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
  );
}

export default App;
