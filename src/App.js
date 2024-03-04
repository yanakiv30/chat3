import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <div>
      {loggedInUser ? (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default App;
