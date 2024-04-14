import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import UserProfile from "./features/users/UserProfile";
import GroupProfile from "./features/groups/GroupProfile";
import SettingsGroup from "./features/groups/SettingsGroup";
import CheckboxList from "./features/groups/CheckboxList";
import UserOptions from "./features/users/UserOptions";
import { useDispatch } from "react-redux";
import { setUsers, setMessages } from "./features/users/userSlice";
import { setGroupMessages, setGroups } from "./features/groups/groupSlice";
import { useAppSelector } from "./store";
import MemberList from "./features/users/MemberList";
import LoginOrSignUp from "./features/users/LoginOrSignUp";
const API_URL = "http://localhost:3001";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser, users } = useAppSelector((store) => store.user);

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => dispatch(setUsers(data))) //
      .catch((error) => console.error("Error fetching users:", error));
    fetch(`${API_URL}/groups`)
      .then((response) => response.json())
      .then((data) => dispatch(setGroups(data))) //
      .catch((error) => console.error("Error fetching users:", error));
    fetch(`${API_URL}/groupMessages`)
      .then((response) => response.json())
      .then((data) => dispatch(setGroupMessages(data)))
      .catch((error) => console.error("Error fetching users:", error));
    fetch(`${API_URL}/messages`)
      .then((response) => response.json())
      .then((data) => dispatch(setMessages(data)))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [dispatch]);

  function initialView(
    users: Array<{ id: string }>,
    loggedInUser: { id: string }
  ) {
    const finded = users.find((user) => user.id !== loggedInUser.id);
    if (finded) return finded.id;
    else return loggedInUser.id;
  }

  return (
    <Router>
      <div className="app-container">
        {loggedInUser ? (
          <div className="main-container">
            <MemberList />
            <Routes>
              <Route
                index
                element={
                  <Navigate
                    replace
                    to={`/messages/${initialView(users, loggedInUser)}`}
                  />
                }
              />
              <Route path="/userOptions" element={<UserOptions />} />
              <Route path="/messages/:userId" element={<UserProfile />} />
              <Route path="/groups/:groupId" element={<GroupProfile />} />
              <Route path="/groups/createGroups" element={<CheckboxList />} />
              <Route
                path="/settingsGroup/:groupId"
                element={<SettingsGroup />}
              />
            </Routes>
          </div>
        ) : (
          <LoginOrSignUp />
        )}
      </div>
    </Router>
  );
}
export default App;
