import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function GroupList({ChatContext}) {
    const {groups, loggedInUser}=useContext(ChatContext);
    return (
        <div>
             {groups.length > 0 ? "Groups" : ""}
      <ul>
        {groups
          .filter((group) => group.members.includes(loggedInUser.username))
          .map((group) => (
            <li key={group.name}>
              <NavLink to={`/groups/${group.id}`}>{`${group.name} `}</NavLink>
              {group.admin === loggedInUser.username ? (
                <NavLink to={`/settingsGroup/${group.id}`}>Settings</NavLink>
              ) : (
                ""
              )}
            </li>
          ))}
      </ul>
        </div>
    )
}
