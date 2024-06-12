import { NavLink } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { setTeamWithNewMessage } from "./groupSlice";

export default function GroupList() {
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams, teamWithNewMessage } = useAppSelector(
    (store) => store.group
  );

  //console.log("localTeams", localTeams);

  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams.filter((team) => team.name !== "");

  // searchedTeams.map(team=>console.log("team.members.at(-1).id= ",team.members.at(-1)!.id))

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
                  "You have new message"{" "}
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
