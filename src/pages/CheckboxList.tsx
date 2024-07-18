import { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";

import { setIsLoading } from "../users/userSlice";
import { createTeamWithMembers } from "../services/createTeam";
import supabase from "../services/supabase";

function CheckboxList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { users, loggedInUser } = useAppSelector((store) => store.user);
  const [groupName, setGroupName] = useState("");
  const usersWithoutLoggedIn = users.filter(
    (user) => user.id !== loggedInUser?.id
  );

  type CheckedItems = {
    [key: string]: boolean;
  };
  const [checkedItems, setCheckedItems] = useState({} as CheckedItems);

  async function handleSetGroups() {
    dispatch(setIsLoading(true));

    try {
      await createTeamWithMembers(groupName, checkedIds);
      navigate("/");
    } catch (error) {
      console.error("Error creating new group:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function handleCheckboxChange(id: number) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  }
  const checkedIds = [
    +loggedInUser!.id,
    ...Object.keys(checkedItems)
      .filter((key: string) => checkedItems[key] === true)
      .map((key) => +key),
  ];

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
          <button onClick={() => navigate("/")}>X</button>
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
                id={user.id + ""}
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
