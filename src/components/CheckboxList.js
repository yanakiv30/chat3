import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const API_URL = "http://localhost:3001";

function CheckboxList({ ChatContext }) {
  const { users, loggedInUser } = useContext(ChatContext);
  let { groups, setGroups } = useContext(ChatContext);
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
        .then((data) => setGroups([...groups, data]))
        .catch((error) => console.error("Error posting message:", error));
    } else {
      alert("Duplicate name");
    }
  }

  return (
    <div className="wrapper">
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
      <br></br>

      <div className="set">
        <p>Set new Group</p>
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
