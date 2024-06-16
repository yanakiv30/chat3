import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { setIsDeleteTeam } from "./groupSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FlashingDot from "../../utils/FlashingDots";

export default function GroupList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams, teamWithNewMessage, isDeleteTeam } = useAppSelector(
    (store) => store.group
  );
  const [flashedTeamsIdsLog, setFlashedTeamsIdsLog] = useState(
    {} as { [key: number]: number }
  );

  //const [isDelete, setIsDelete]= useState(false);
  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams.filter((team) => team.name !== "");

  // console.log(
  //   "Object.values(flashedTeamsIdsLog)",
  //   Object.values(flashedTeamsIdsLog)
  // );

  const updateFlashedTeamsIdsLog = (teamId: number, senderId: number) => {
    //console.log("isDeleteTeam = ", isDeleteTeam);
   // !isDeleteTeam &&
      setFlashedTeamsIdsLog((prev) => ({ ...prev, [teamId]: senderId }));
  };

  searchedTeams.map((team) => {
    const isNewMessage = team.id === teamWithNewMessage.team_id;
    //const isTeamId = !flashedTeamsIds.find((id) => +id === team.id);
    const isTeamId = !Object.keys(flashedTeamsIdsLog).find(
      (id) => +id === team.id
    );
    // console.log(
    //   "Object.keys(flashedTeamsIdsLog)",
    //   Object.keys(flashedTeamsIdsLog)
    // );
   // console.log(" isTeamId ", isTeamId);
    teamWithNewMessage.sender_id !== loggedInUser!.id &&
      isTeamId &&
      isNewMessage &&
      updateFlashedTeamsIdsLog(team.id, teamWithNewMessage.sender_id);
    console.log("flashedTeamsIdsLog", flashedTeamsIdsLog);
    return null;
  });

  function deleteTeamFromIdsLog(teamId: number) {
    
    //console.log("//////////////////deleteTeamFromIdsLog is working");
    const newFlashedTeamsIdsLog = { ...flashedTeamsIdsLog };
    delete newFlashedTeamsIdsLog[teamId];
    setFlashedTeamsIdsLog(newFlashedTeamsIdsLog);
    //dispatch(setIsDeleteTeam(true));
    navigate(`/groups/${teamId}`);
  }

  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          <li key={team.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              {Object.keys(flashedTeamsIdsLog).includes("" + team.id) &&
         // !Object.values(flashedTeamsIdsLog).includes(teamWithNewMessage.sender_id)  && 
          <FlashingDot />}

              <Avatar name={team.name} />
              <button onClick={() => deleteTeamFromIdsLog(team.id)}>
                {team.name}
              </button>
              {/* <NavLink to={`/groups/${team.id}`}>{`${team.name} `}</NavLink> */}
              {team.members.at(-1)!.id === loggedInUser!.id && (
                <NavLink to={`/settingsGroup/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>
                </NavLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
