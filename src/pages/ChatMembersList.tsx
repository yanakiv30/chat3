import Avatar from "../features/users/Avatar";
import GroupList from "../features/groups/GroupList";
import { useAppSelector } from "../store";
import LogoLogout from "../features/users/LogoLogout";
import IconAndSearch from "../features/users/IconAndSearch";
import { NavLink } from "react-router-dom";

function ChatMembersList() {
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
export default ChatMembersList;
