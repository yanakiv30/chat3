import { NavLink } from "react-router-dom";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";

export default function GroupList() {
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const {teams } = useAppSelector((store) => store.group);
 
  const searchedTeams =
    searchQuery.length > 0
      ? teams.filter(
          (team) => team && team.name && team.name.includes(searchQuery) 
        )
      : teams;
  
  return (
    <div>     
      <ul>
        {          
          searchedTeams
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
