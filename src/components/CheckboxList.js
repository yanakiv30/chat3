import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
const API_URL = "http://localhost:3001";

function CheckboxList({ ChatContext}) {  
  const { users, loggedInUser } = useContext(ChatContext); 
  let { trueItems,groupName,setGroupName,groups,setGroups} = useContext(ChatContext);
  const [checkedItems, setCheckedItems] = useState({});
  
  
  let names = [];
  users.map((user) => names.push(user.username));
  names = names.filter((name) => name !== loggedInUser.username); 
  function handleCheckboxChange(name) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
  }
  trueItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key] === true
  );

  const newGroup = {
    id: uuid(),
    name: groupName,
    members: []
  };

  function handleSetGroups() {
    setGroups([...groups,groupName]);

    const newGroup = {
      id: uuid(),
      name: groupName,
      members: []
    };

    fetch(`${API_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroup),
    })
      .then((response) => response.json())
      .then((data) => setGroups([...groups,groupName]))
      .catch((error) => console.error("Error posting message:", error));

    // setNewMessage("");
  }

  return (
    <div>
      <p>Start group chatting with existing groups :</p>
      <ul>
        {
          groups.map((group)=>(
            <li key={group}>
              <button>{group?group:""}</button>
            </li>
          ))
        }
      </ul>
      <br></br>
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
      <br></br>
      <p>GroupChat members :</p>

      <p style={{ color: "red" }}>{trueItems.join(", ")} </p>
      

      <br></br>
      <p>Create Group</p>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter Name of the group"
      />
       <button onClick={handleSetGroups}>Create</button>
      {console.log("groupname= ",groupName,"groups = ",groups)}
    </div>
  );
}

export default CheckboxList;
