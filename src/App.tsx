import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { useDispatch } from "react-redux";
import { setUsers, setMessages } from "./features/users/userSlice";
import { setGroupMessages, setGroups } from "./features/groups/groupSlice";
import { useAppSelector } from "./store";
import ChatMembersList from "./pages/ChatMembersList";
import LoginOrSignUp from "./pages/LoginOrSignUp";
import AllRoutes from "./features/users/AllRoutes";
import {getUsers} from "./services/apiUsers"
const API_URL = "http://localhost:3001";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  let { isRegister } = useAppSelector((store) => store.user);

  useEffect(() => {
    getUsers().then((data) => {
      console.log("usefect19", data);
      dispatch(setUsers(data))}) //
    .catch((error) => console.error("Error fetching users:", error));

    // fetch(`${API_URL}/users`)
    //   .then((response) => response.json())
    //   .then((data) => dispatch(setUsers(data))) //
    //   .catch((error) => console.error("Error fetching users:", error));
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
  }, [dispatch,isRegister]);

  return (
    <Router>
      <div className="app-container">
        {loggedInUser ? (
          <div className="main-container">
            <ChatMembersList />
            <AllRoutes />
          </div>
        ) : (
          <LoginOrSignUp />
        )}
      </div>
    </Router>
  );
}
export default App;
