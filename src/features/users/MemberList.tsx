import Avatar from "./Avatar";
import GroupList from "../groups/GroupList";
import { useAppSelector } from "../../store";
import LogoLogout from "./LogoLogout";
import IconAndSearch from "./IconAndSearch";
import { NavLink } from "react-router-dom";

function MemberList() {
  const { searchQuery, users, loggedInUser } = useAppSelector(
    (store) => store.user
  );
  const searchedUser =
    searchQuery.length > 0
      ? users.filter(
          (user) => user && user.username && user.username.includes(searchQuery)
        )
      : users;

  return (
    <div className="user-list-container">
      <LogoLogout />
      <br></br>
      <IconAndSearch />
      <br></br>
      <ul>
        {loggedInUser &&
          searchedUser
            .filter((user) => user.id !== loggedInUser.id)
            .map((user) => (
              <li key={user.id}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Avatar name={user.username} />
                  <NavLink to={`/messages/${user.id}`}>{user.username}</NavLink>
                </div>
              </li>
            ))}
      </ul>
      <GroupList />
    </div>
  );
}
export default MemberList;
