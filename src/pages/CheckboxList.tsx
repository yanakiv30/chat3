import { useState } from "react";

import { useDispatch } from "react-redux";
import { addGroup } from "../features/groups/groupSlice";

import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";

const API_URL = "http://localhost:3001";

function CheckboxList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { users, loggedInUser } = useAppSelector((store) => store.user);
  let { groups } = useAppSelector((store) => store.group); 
  const [groupName, setGroupName] = useState("");

  let names: string[] = [];
  users.map((user) => names.push(user.username));
  names = names.filter((name) => name !== loggedInUser?.username);
  type CheckedItems = {
    [key: string]: boolean;
  };
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  function handleCheckboxChange(name: string) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
  }
  let trueItems = Object.keys(checkedItems).filter(
    (key: string) => checkedItems[key] === true
  );

  async function handleSetGroups() {
    const isDuplicate = groups?.some((obj) => obj.name === groupName);

    if (!isDuplicate && loggedInUser) {
      const newGroup = {
        id: uuid(),
        name: groupName,
        members: [...trueItems, loggedInUser.username],
        admin: loggedInUser.username,
      };

    dispatch(setIsLoading(true));      
      try {
        const { data, error } = await supabase 
          .from('groups0')
          .insert(newGroup)
          .select();
        if (error) {
          console.error(error);
          throw new Error("New group could not be loaded");
        }
        dispatch(addGroup(data));
      } catch (error) {
        console.error("Error creating new group:", error);
      } finally {
        dispatch(setIsLoading(false));
      }   
      // fetch(`${API_URL}/groups`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newGroup),
      // })
      //   .then((response) => response.json())
      //   .then((data) => dispatch(addGroup(data)))
      //   .catch((error) => console.error("Error posting message:", error));
    } else {
      alert("Duplicate name");
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
          {names.map((name) => (
            <li key={name}>
              <input
                type="checkbox"
                id={name}
                checked={checkedItems[name] || false}
                onChange={() => handleCheckboxChange(name)}
              />
              <label htmlFor={name}>{name}</label>
            </li>
          ))}
        </ul>
        <button onClick={handleSetGroups}>Create</button>
      </div>
    </div>
  );
}

export default CheckboxList;
