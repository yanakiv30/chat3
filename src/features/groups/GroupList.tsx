import { NavLink, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTeamById, setIsDeleteTeam } from "./groupSlice";
import supabase from "../../services/supabase";
import FlashingDot from "../../utils/FlashingDots";

export default function GroupList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams, teamWithNewMessage ,isDeleteTeam} = useAppSelector(
    (store) => store.group
  );

  const [flashedTeamsIdsLog, setFlashedTeamsIdsLog] = useState(
    {} as { [key: number]: number }
  );
 

  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams;

  

  const updateFlashedTeamsIdsLog = (teamId: number, senderId: number) => {
    setFlashedTeamsIdsLog((prev) => ({ ...prev, [teamId]: senderId }));
  };

  searchedTeams.map((team) => {
    const isNewMessage = team.id === teamWithNewMessage.team_id;

    const isTeamId = !Object.keys(flashedTeamsIdsLog).find(
      (id) => +id === team.id
    );

    console.log("isDeleteTeam: ",isDeleteTeam);
    teamWithNewMessage.sender_id !== loggedInUser!.id &&
      isTeamId &&
      isNewMessage &&!isDeleteTeam&&
      updateFlashedTeamsIdsLog(team.id, teamWithNewMessage.sender_id);  

    return null;
  });

  function deleteTeamFromIdsLog(teamId: number) {
    dispatch(setIsDeleteTeam(true));
    const newFlashedTeamsIdsLog = { ...flashedTeamsIdsLog };
    delete newFlashedTeamsIdsLog[teamId];    
    setFlashedTeamsIdsLog(newFlashedTeamsIdsLog);
    navigate(`/groups/${teamId}`);
  }

  const check1 = searchedTeams.map(
    (team) =>
      team.members.find((member) => +member.id !== loggedInUser?.id)?.username
  );
  

  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          <li key={team.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar
                name={
                  team.name === ""
                    ? team.members.find(
                        (member) => +member.id !== loggedInUser?.id
                      )!.username
                    : team.name
                }
              />
              <button onClick={() => deleteTeamFromIdsLog(team.id)}>
                {team.name === ""
                  ? team.members.find(
                      (member) => +member.id !== loggedInUser?.id
                    )?.username
                  : team.name}
              </button>
              {team.members.at(0)!.id === loggedInUser!.id ? (
                <NavLink to={`/settingsGroup/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>
                </NavLink>
              ) : (
                <NavLink to={`/settingsGroup2/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>
                </NavLink>
              )}
              {Object.keys(flashedTeamsIdsLog).includes("" + team.id) && (
                <FlashingDot />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
