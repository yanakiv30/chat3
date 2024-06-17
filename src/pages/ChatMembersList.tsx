import Avatar from "../features/users/Avatar";
import GroupList from "../features/groups/GroupList";
import { useAppSelector } from "../store";
import LogoLogout from "../features/users/LogoLogout";
import IconAndSearch from "../features/users/IconAndSearch";
import { useNavigate } from "react-router-dom";
import { createTeamWithMembers } from "../services/createTeam";
import { useDispatch } from "react-redux";
import { getTeams } from "../services/apiGroups";
import { setTeams } from "../features/groups/groupSlice";

function ChatMembersList() {
  const { searchQuery, users, loggedInUser } = useAppSelector(
    (store) => store.user
  );
  const { localTeams } = useAppSelector((store) => store.group);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedUsers =
    searchQuery.length > 0
      ? users.filter(
          (user) => user && user.username && user.username.includes(searchQuery)
        )
      : users;

  async function handleUserClicked(userId: number) {
    const doubleViewGroup = localTeams.find(
      (team) =>
        team.name === "" && team.members.some((user) => user.id === userId)
    );
    if (doubleViewGroup) navigate(`/messages/${doubleViewGroup.id}`);
    else {
      
      const doubleViewGroupId = await createTeamWithMembers("", [
        loggedInUser!.id,
        userId,
      ]);
      getTeams(+loggedInUser!.id)
        .then((data) => {
          dispatch(setTeams(data));
          navigate(`/messages/${doubleViewGroupId}`);
        })
        .catch((error) => console.error("Error fetching teams", error));      
    }
  }

  return (
    <div className="user-list-container">
      <LogoLogout />
      <br></br>
      <IconAndSearch />
      <br></br>
      <ul>
        {loggedInUser &&
          searchedUsers
            .filter((user) => user.id !== loggedInUser.id)
            .map((user) => (
              <li key={user.id}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Avatar name={user.username} />
                  <button onClick={() => handleUserClicked(user.id)}>
                    {user.username}
                  </button>
                </div>
              </li>
            ))}
      </ul>
      <GroupList />

      <img
        style={{ maxWidth: "70%" }}
        src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"     
        alt="some cabin"
      />
    </div>
  );
}
export default ChatMembersList;
