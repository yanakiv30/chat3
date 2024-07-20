import { useCallback, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUsers } from "../store/userSlice";
import {
  setIsDeleteTeam,
  setTeamWithNewMessage,
  setTeams,
} from "../store/groupSlice";
import { useAppSelector } from "../store/store";
import ChatMembersList from "./pages/ChatMembersList";
//import LoginOrSignUp from "./pages/LoginOrSignUp";
import AllRoutes from "./AllRoutes";
import { getTeams, getUsers } from "./services/apiGroups";
import Spinner from "./Components/Spinner";
import supabase from "./services/supabase";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
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
    const findTeamNameById = (id: number, senderId: number) => {
      const team = localTeams.find((team) => team.id === id);
      if (!team) return "Unknown/Empty team";
      if (team.name === "")
        return team.members.find((member) => member.id !== loggedInUser?.id)
          ?.username;
      return team.name;
    };

    function findReceivers(id: number, senderId: number) {
      const team = localTeams.find((team) => team.id === id);
      const receivers = team?.members.filter(
        (member) => member.id !== senderId
      );
      console.log("receivers = ", receivers);
      return receivers;
    }

    const messageSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (
            findReceivers(payload.new.team_id, payload.new.sender_id)?.map(
              (receiver) => {
                receiver.id === loggedInUser?.id &&
                  toast.success(
                    `New message from "${findTeamNameById(
                      payload.new.team_id,
                      payload.new.sender_id
                    )}"`
                  );
                return null;
              }
            )
          )
            dispatch(setIsDeleteTeam(false));
          dispatch(setTeamWithNewMessage(payload.new));
          loadStateFromBackend();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          loadStateFromBackend();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          loadStateFromBackend();
        }
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
  }, [loadStateFromBackend, localTeams, loggedInUser, dispatch]);

  return (
    <Router>
      <div className="app-container" style={{ position: "relative" }}>
        {isLoading && <Spinner />}

        {loggedInUser ? (
          <div className="main-container">
            <ChatMembersList />
            <AllRoutes />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}
export default App;
