import { NavLink } from "react-router-dom";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";

export default function GroupList() {
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { groups,teams, teamsMembers } = useAppSelector((store) => store.group);
  
  console.log("teamsMembers :",teamsMembers);
  console.log("loggedInUser.id :",loggedInUser!.id)
  
  let visibleRow= teamsMembers.filter(row=>row.user_id===+loggedInUser!.id);
  console.log("visibleRow :",visibleRow);
  const searchedTeams =
    searchQuery.length > 0
      ? teams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : teams;
  const visibleIds= visibleRow.map(row=> row.team_id)  
  return (
    <div>     
      <ul>
        {          
          searchedTeams.filter(team=> visibleIds.includes(team.id))
          .map((team) => (
            <li key={team.id}>
              <div style={{ display: "flex", gap: "5px" }}>
                <Avatar name={team.name} />
                <NavLink to={`/groups/${team.id}`}>{`${team.name} `}</NavLink>
                {/* {group.admin === loggedInUser!.username ? (
                  <NavLink to={`/settingsGroup/${group.id}`}>Settings</NavLink>
                ) : (
                  ""
                )} */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
