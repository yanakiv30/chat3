import React, { useState, useEffect, createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useParams,
} from "react-router-dom";
import "./App.css";
// import UserList from "./components/UserList";
// import UserProfile from "./components/UserProfile";
import GroupChat from "./Pages/GroupChat";

const API_URL = "http://localhost:3001";
let isUserActive = false;

const ChatContext = createContext();

function UserList() {
  const { users, loggedInUser } = useContext(ChatContext);

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

              <NavLink to={`/messages/${user.id}`}>{user.username}</NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
// export default UserList;

function UserProfile() {
  const { setMessages, loggedInUser, messages, users } =
    useContext(ChatContext);

  const [newMessage, setNewMessage] = useState("");
  const params = useParams();
  const userInListId = params.userId;
  const userName = users.find((x) => x.id === userInListId).username;

  function leftMessage(message) {
    return (
      message.receiverId === loggedInUser.id &&
      message.senderId === userInListId
    );
  }
  function rightMessage(message) {
    return (
      message.receiverId === userInListId &&
      message.senderId === loggedInUser.id
    );
  }

  const largeMessages = messages.filter(
    (message) => leftMessage(message) || rightMessage(message)
  );
  const userMessages = largeMessages.slice(
    Math.max(largeMessages.length - 10, 0)
  ); //messages<10
  //

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
      <div className="search-bar">🔍 Search</div>
      <div className="chat-with">
        <h3> Chat with {userName}</h3>
      </div>
      <div className="user-profile-container">
        <ul className="messages-container">
          {userMessages.map((message) => (
            <li
              className={`message ${
                leftMessage(message) ? "message-left" : "message-right"
              }`}
              key={message.id}
            >
              <strong>{message.senderUsername}:</strong> {message.content}
            </li>
          ))}
        </ul>

        <div className="message-send">
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
  // const [role, setRole] = useState("user");

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
  //setMessages, loggedInUser, messages, users,
  return (
    <ChatContext.Provider
      value={{
        users: users,
        loggedInUser: loggedInUser,
        isUserActive: isUserActive,
        setMessages: setMessages,
        messages: messages,
      }}
    >
      <Router>
        <div className="app-container">
          {loggedInUser ? (
            <div className="main-container">
              <div className="left-container">
                <UserList />
                <div className="button-link">
                  <h2>Welcome, {loggedInUser.username}!</h2>
                  <button onClick={handleLogout}>Logout</button>
                  <NavLink to={`/messages/group`}>GroupChat</NavLink>
                </div>
              </div>

              <Routes>
                <Route path="/messages/:userId" element={<UserProfile />} />

                <Route path="/messages/group" element={<GroupChat />} />
              </Routes>
            </div>
          ) : (
            <div className="login">
              {/* <h2>Login</h2> */}
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

                {/* <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </label> */}

                <button type="submit">Login</button>
              </form>

              {/* <h2>Sign Up</h2> */}
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
