import { useState } from "react";

import { useDispatch } from "react-redux";
import { addGroup } from "../features/groups/groupSlice";

import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";



function CheckboxList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { users, loggedInUser } = useAppSelector((store) => store.user);
 //console.log(users);
  let { groups } = useAppSelector((store) => store.group); 
  const [groupName, setGroupName] = useState("");

  //let names: string[] = [];
  //users.map((user) => names.push(user.username));
  const usersWithoutLoggedIn = users.filter((user) => user.id !== loggedInUser?.id);

  type CheckedItems = {
    [key: string]: boolean;
  };
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  function handleCheckboxChange(id: string) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  }
  // let trueItems = Object.keys(checkedItems).filter(
  //   (key: string) => checkedItems[key] === true
  // );

  async function handleSetGroups() {
    const isDuplicate = groups?.some((obj) => obj.name === groupName);

    if (!isDuplicate && loggedInUser) {
      const newGroup = {        
        name: groupName,        
      };

    dispatch(setIsLoading(true));      
      try {
        const { data, error } = await supabase 
          .from('teams')
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
