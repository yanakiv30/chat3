import { NavLink } from "react-router-dom";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";

export default function GroupList() {
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { groups } = useAppSelector((store) => store.group);
  const searchedGroups =
    searchQuery.length > 0
      ? groups.filter(
          (group) => group && group.name && group.name.includes(searchQuery)
        )
      : groups;

  return (
    <div>
      {/* {searchedGroups.length > 0 ? "Groups" : ""} */}
      <ul>
        {searchedGroups
          .filter((group) => group.members.includes(loggedInUser!.username))
          .map((group) => (
            <li key={group.name}>
              <div style={{ display: "flex", gap: "5px" }}>
                <Avatar name={group.name} />
                <NavLink to={`/groups/${group.id}`}>{`${group.name} `}</NavLink>
                {group.admin === loggedInUser!.username ? (
                  <NavLink to={`/settingsGroup/${group.id}`}>Settings</NavLink>
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
