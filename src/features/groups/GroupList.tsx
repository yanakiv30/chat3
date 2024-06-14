import { NavLink } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { setArrFlashIdBool } from "./groupSlice";
import { useDispatch } from "react-redux";

export default function GroupList() {
  const dispatch=useDispatch();
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams, teamWithNewMessage ,arrFlashIdBool} = useAppSelector(
    (store) => store.group
  );

  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams.filter((team) => team.name !== "");

  //const arrayWithFlashTeamId: { [key: string]: boolean }[] = [];

  searchedTeams.map((team) => {
    const id = team.id;
    const isNewMessage = team.id === teamWithNewMessage.team_id;
    const obj: { [key: string]: boolean } = {};
    obj[id] = isNewMessage;
    isNewMessage&&dispatch(setArrFlashIdBool(obj))
    return null;
  });
 
  //console.log("arrayWithFlashTeamId", arrayWithFlashTeamId);
  console.log("arrFlasId", arrFlashIdBool);

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
