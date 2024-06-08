import { NavLink } from "react-router-dom";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";

export default function GroupList() {
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
  //console.log("localTeams", localTeams);

  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams.filter(team=> team.name!=='');

      searchedTeams.map(team=>console.log("team.members.at(-1).id= ",team.members.at(-1)!.id))
  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          
          <li key={team.id}>            
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar name={team.name} />
              <NavLink to={`/groups/${team.id}`}>{`${team.name} `}</NavLink>        
              {team.members.at(-1)!.id ===loggedInUser!.id ? 
                  <NavLink to={`/settingsGroup/${team.id}`}>Settings</NavLink> : ""}
               
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
