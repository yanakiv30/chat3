import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { Flash, setArrFlashIdBool } from "./groupSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FlashingDot from "../../utils/FlashingDots";

export default function GroupList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams, teamWithNewMessage, arrFlashIdBool } = useAppSelector(
    (store) => store.group
  );

  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams.filter((team) => team.name !== "");

  let [flashedTeamsIds, setFlashedTeamsIds] = useState([] as number[]);
  const updateFlashedTeams = (id: number) => {
    setFlashedTeamsIds((prevIds) => [...prevIds, id]);
  };

  searchedTeams.map((team) => {
    const isNewMessage = team.id === teamWithNewMessage.team_id;
    const isTeamId = !flashedTeamsIds.find((id) => +id === team.id);
    console.log(" isTeamId ", isTeamId);
    isTeamId && isNewMessage && updateFlashedTeams(team.id);
    console.log("flashedTeamsIds", flashedTeamsIds);
    return null;
  });

 function  flashAndTeam(teamId:number){  
  //flashedTeamsIds = flashedTeamsIds.filter(id=> id!==teamId)
  navigate(`/groups/${teamId}`);
 }

  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          <li key={team.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              {teamWithNewMessage.sender_id !== loggedInUser?.id &&
                flashedTeamsIds.includes(team.id) && <FlashingDot />}
              <Avatar name={team.name} />
              <button onClick={()=>flashAndTeam(team.id)}>{team.name}</button>
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
