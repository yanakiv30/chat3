import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserList from "./features/users/UserList";
import UserProfile from "./features/users/UserProfile";
import Login from "./features/users/Login";
import GroupProfile from "./features/groups/GroupProfile";
import SettingsGroup from "./features/groups/SettingsGroup";
import CheckboxList from "./features/groups/CheckboxList";
import UserOptions from "./features/users/UserOptions";

const API_URL = "http://localhost:3001";
const ChatContext = createContext();

function App() {
  
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
    fetch(`${API_URL}/groups`)
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching users:", error));
    fetch(`${API_URL}/groupMessages`)
      .then((response) => response.json())
      .then((data) => setGroupMessages(data))
      .catch((error) => console.error("Error fetching users:", error));
    fetch(`${API_URL}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        users: users,
        loggedInUser: loggedInUser,
        setLoggedInUser,
        setMessages,
        messages,
        searchQuery,
        setSearchQuery,
        searchMessage,
        setSearchMessage,
        groupMessages,
        setGroupMessages,
        groups,
        setGroups,
      }}
    >
      <Router>
        <div className="app-container">
          {loggedInUser ? (
            <div className="main-container">
              <UserList ChatContext={ChatContext} />
              <Routes>
                <Route
                  path="/userOptions"
                  element={<UserOptions ChatContext={ChatContext} />}
                />

                <Route
                  path="/messages/:userId"
                  element={<UserProfile ChatContext={ChatContext} />}
                />
                <Route
                  path="/groups/:groupId"
                  element={<GroupProfile ChatContext={ChatContext} />}
                />
                <Route
                  path="/groups/createGroups"
                  element={<CheckboxList ChatContext={ChatContext} />}
                />
                <Route
                  path="/settingsGroup/:groupId"
                  element={<SettingsGroup ChatContext={ChatContext} />}
                />
              </Routes>
            </div>
          ) : (
            <Login ChatContext={ChatContext} />
          )}
        </div>
      </Router>
    </ChatContext.Provider>
  );
}
export default App;
