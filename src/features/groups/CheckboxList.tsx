import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "./groupSlice";

import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const API_URL = "http://localhost:3001";

function CheckboxList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { users, loggedInUser } = useAppSelector((store) => store.user);
  let { groups } = useAppSelector((store) => store.group);
  //  console.log(groups,users, loggedInUser);
  const [checkedItems, setCheckedItems] = useState({});
  const [groupName, setGroupName] = useState("");

  let names = [];
  users.map((user) => names.push(user.username));
  names = names.filter((name) => name !== loggedInUser.username);
  function handleCheckboxChange(name) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
  }
  let trueItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key] === true
  );

  function handleSetGroups() {
    const isDuplicate = groups?.some((obj) => obj.name === groupName);

    if (!isDuplicate) {
      const newGroup = {
        id: uuid(),
        name: groupName,
        members: [...trueItems, loggedInUser.username],
        admin: loggedInUser.username,
      };

      fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroup),
      })
        .then((response) => response.json())
        .then((data) => dispatch(addGroup(data)))
        .catch((error) => console.error("Error posting message:", error));
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
