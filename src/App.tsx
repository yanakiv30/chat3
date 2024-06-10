import { useCallback, useEffect } from "react";
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
import supabase from "./services/supabase";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  let { isLoading } = useAppSelector((store) => store.user);
  const loadStateFromBackend = useCallback(() => {
    if (!loggedInUser) return;

    getUsers()
      .then((data) => dispatch(setUsers(data)))
      .catch((error) => console.error("Error fetching users:", error));

    getTeams(+loggedInUser.id)
      .then((data) => dispatch(setTeams(data)))
      .catch((error) => console.error("Error fetching teams", error));
  }, [dispatch, loggedInUser]);

  useEffect(loadStateFromBackend, [loadStateFromBackend]);

  useEffect(() => {
    const messageSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        loadStateFromBackend
      )
      .subscribe();

    const userSubscription = supabase
      .channel("users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "users" },
        loadStateFromBackend
      )
      .subscribe();

    const teamsSubscription = supabase
      .channel("teams")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "teams" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "teams" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "teams" },
        loadStateFromBackend
      )
      .subscribe();

    const teamsMembersSubscription = supabase
      .channel("teams_members")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "teams_members" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "teams_members" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "teams_members" },
        loadStateFromBackend
      )
      .subscribe();
  }, [loadStateFromBackend]);

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
