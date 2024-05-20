import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../features/groups/groupSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";

function CheckboxList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { users, loggedInUser } = useAppSelector((store) => store.user); 
  let { groups } = useAppSelector((store) => store.group);
  const [groupName, setGroupName] = useState("");  
  const usersWithoutLoggedIn = users.filter(
    (user) => user.id !== loggedInUser?.id
  );

  type CheckedItems = {
    [key: string]: boolean;
  };
  const [checkedItems, setCheckedItems] = useState({} as CheckedItems);

  async function createTeam(newTeam: { name: string }) {
    const { data, error } = await supabase
      .from("teams")
      .insert(newTeam)
      .select();
    if (error) {
      console.error(error);
      throw new Error("New group could not be loaded");
    }
    return data[0];
  }

  async function connectTeamWithUsers(teamId: number, usersIds: number[]) {
    const rows = usersIds.map((userId) => {
      return { team_id: teamId, user_id: userId };
    });
    const { data, error } = await supabase
      .from("teams_members")
      .insert(rows)
      .select();
    if (error) {
      console.error(error);
      throw new Error("Failed to connect users to team");
    }
    return data;
  }

  function handleCheckboxChange(id: string) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  }
  const checkedIds =[...Object.keys(checkedItems)
    .filter((key: string) => checkedItems[key] === true)
    .map((key) => +key), +loggedInUser!.id];



  async function handleSetGroups() {
    // const isDuplicate = groups?.some((obj) => obj.name === groupName);
    // if (isDuplicate || !loggedInUser) {
    //   alert("Duplicate name");
    //   return;
    // }

    dispatch(setIsLoading(true));

    try {
      const newTeam = await createTeam({ name: groupName });
      const teamToMembers = await connectTeamWithUsers(newTeam.id, checkedIds);
    } catch (error) {
      console.error("Error creating new group:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div
      style={{ backgroundColor: " rgb(234, 229, 225)", height: "fit-content" }}
      className="wrapper"
    >
      <div
        className="set"
        style={{ border: "1px solid #ccc", borderRadius: "7px" }}
      >
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Create Group </span>
          <button onClick={() => navigate("/userOptions")}>X</button>
        </p>
        <input
          style={{ width: "fit-content" }}
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter unique name "
        />
        <p>Choose members :</p>
        <ul>
          {usersWithoutLoggedIn.map((user) => (
            <li key={user.id}>
              <input
                type="checkbox"
                id={user.id}
                checked={checkedItems[user.id] || false}
                onChange={() => handleCheckboxChange(user.id)}
              />
              <label>{user.username}</label>
            </li>
          ))}
        </ul>
        <button onClick={handleSetGroups}>Create</button>
      </div>
    </div>
  );
}

export default CheckboxList;
