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
import { getMessages, getUsers } from "./services/apiUsers";
import { getGroupMessages, getGroups } from "./services/apiGroups";
import Spinner from "./utils/Spinner";
const API_URL = "http://localhost:3001";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  let { isRegister, isLoading } = useAppSelector((store) => store.user);

  useEffect(() => {
    getUsers()
      .then((data) => dispatch(setUsers(data)))
      .catch((error) => console.error("Error fetching users:", error));
    // fetch(`${API_URL}/users`)
    //   .then((response) => response.json())
    //   .then((data) => dispatch(setUsers(data))) //
    //   .catch((error) => console.error("Error fetching users:", error));
    getGroups()
      .then((data) => dispatch(setGroups(data)))
      .catch((error) => console.error("Error fetching groups", error));
    // fetch(`${API_URL}/groups`)
    //   .then((response) => response.json())
    //   .then((data) => dispatch(setGroups(data))) //
    //   .catch((error) => console.error("Error fetching users:", error));
    getGroupMessages()
      .then((data) => dispatch(setGroupMessages(data)))
      .catch((error) => console.error("Error fetching Group Messages", error));
    // fetch(`${API_URL}/groupMessages`)
    //   .then((response) => response.json())
    //   .then((data) => dispatch(setGroupMessages(data)))
    //   .catch((error) => console.error("Error fetching users:", error));
    getMessages()
      .then((data) => dispatch(setMessages(data)))
      .catch((error) => console.error("Error fetching messages :", error));
    // fetch(`${API_URL}/messages`)
    //   .then((response) => response.json())
    //   .then((data) => dispatch(setMessages(data)))
    //   .catch((error) => console.error("Error fetching messages:", error));
  }, [dispatch, isRegister, isLoading]);

  return (
    <Router>
      <div className="app-container">       
        {isLoading && <Spinner/>}
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
