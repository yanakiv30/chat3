import { NavLink } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { Flash, setArrFlashIdBool } from "./groupSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function GroupList() {
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

  const [flashedTeamsIds, setFlashedTeamsIds] = useState([] as number[]);
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

  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          <li key={team.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar name={team.name} />
              <NavLink to={`/groups/${team.id}`}>{`${team.name} `}</NavLink>
              {team.members.at(-1)!.id === loggedInUser!.id ? (
                <NavLink to={`/settingsGroup/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>{" "}
                </NavLink>
              ) : (
                ""
              )}

              {team.id === teamWithNewMessage.team_id &&
              teamWithNewMessage.sender_id !== loggedInUser?.id ? (
                <span style={{ color: "green", fontSize: "13px" }}>
                  "You have a new message"{" "}
                </span>
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
