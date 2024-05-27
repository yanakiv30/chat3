import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { useDispatch } from "react-redux";
import { setUsers } from "./features/users/userSlice";
import { setTeams } from "./features/groups/groupSlice";
import { useAppSelector } from "./store";
import ChatMembersList from "./pages/ChatMembersList";
import LoginOrSignUp from "./pages/LoginOrSignUp";
import AllRoutes from "./AllRoutes";
import { getTeams, getUsers } from "./services/apiGroups";
import Spinner from "./utils/Spinner";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  let { isRegister, isLoading } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!loggedInUser) return;
    getUsers()
      .then((data) => dispatch(setUsers(data)))
      .catch((error) => console.error("Error fetching users:", error));

    getTeams(+loggedInUser.id)
      .then((data) => dispatch(setTeams(data)))
      .catch((error) => console.error("Error fetching teams", error));

    
  }, [dispatch, isRegister, isLoading, loggedInUser]);

  return (
    <Router>
      <div className="app-container" style={{ position: "relative" }}>
        {isLoading && <Spinner />}

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
