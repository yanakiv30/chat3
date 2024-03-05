// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3001';

function UserList({ users }) {
  return (
    <div className="user-list-container">
      <h3>User List</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/messages/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfile({ userId,userName, messages }) {
  const userMessages = messages.filter(message => message.userId === userId);

  return (
    <div className="user-profile-container">
      <h3> Chat with {userName}</h3>
      <ul>
        {userMessages.map(message => (
          <li key={message.id}>
            <strong>{message.username}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  function handleSignUp(newUsername, newPassword) {
    const newUser = {
      id: users.length + 1,
      username: newUsername,
      password: newPassword,
    };

    axios.post(`${API_URL}/users`, newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error creating user:', error));
  }

  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    axios.get(`${API_URL}/messages`)
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObject = {
        id: messages.length + 1,
        userId: loggedInUser.id,
        username: loggedInUser.username,
        content: newMessage
      };

      axios.post(`${API_URL}/messages`, newMessageObject)
        .then(response => setMessages([...messages, response.data]))
        .catch(error => console.error('Error posting message:', error));

      setNewMessage('');
    }
  };
  console.log('users = ',users);
  console.log('loggedInUser = ',loggedInUser);

  return (
    <Router>
      <div className="app-container">
        {loggedInUser ? (
          <div className="main-container">
            <div className="left-container">
              <UserList users={users} />
            </div>
            <div className="right-container">
              <h2>Welcome, {loggedInUser.username}!</h2>
              <button onClick={handleLogout}>Logout</button>
              <div>
                <h3>Messages</h3>
                <ul>
                  {messages.map(message => (
                    <li key={message.id}>
                      <strong>{message.username}:</strong> {message.content}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
            <Routes>
              <Route path="/messages/:userId" element={<UserProfile userId={loggedInUser.id} userName = {loggedInUser.username} messages={messages} />} />
            </Routes>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleLogin(formData.get('username'), formData.get('password'));
            }}>
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
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSignUp(formData.get('newUsername'), formData.get('newPassword'));
            }}>
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
