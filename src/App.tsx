import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import UserList from "./features/users/UserList";
import UserProfile from "./features/users/UserProfile";
import Login2 from "./features/users/Login2";
import SignUp from "./features/users/SignUp";
import GroupProfile from "./features/groups/GroupProfile";
import SettingsGroup from "./features/groups/SettingsGroup";
import CheckboxList from "./features/groups/CheckboxList";
import UserOptions from "./features/users/UserOptions";
import { useDispatch } from "react-redux";
import { setUsers, setMessages } from "./features/users/userSlice";

import { setGroupMessages, setGroups } from "./features/groups/groupSlice";
import { useAppSelector } from "./store";

const API_URL = "http://localhost:3001";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);

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

  return (
    <Router>
      <div className="app-container">
        {/* {console.log("loggedInUser = ",loggedInUser)} */}

        <div className="main-container">
          <Routes>
            <Route path="/login2" element={<Login2 />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/userOptions" element={<UserOptions />} />
            <Route path="/messages/:userId" element={<UserProfile />} />
            <Route path="/groups/:groupId" element={<GroupProfile />} />
            <Route path="/groups/createGroups" element={<CheckboxList />} />
            <Route path="/settingsGroup/:groupId" element={<SettingsGroup />} />
          </Routes>
          {!loggedInUser ? (
            <Navigate to="/login2" />
          ) : (
            <Navigate to="/userlist" />
          )}
        </div>

        {/* {!loggedInUser&&<Navigate to="/login" />} */}
      </div>
    </Router>
  );
}
export default App;
