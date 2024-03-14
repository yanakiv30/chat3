import React, { useContext, useState } from "react";

function CheckboxList({ ChatContext}) {  
  const { users, loggedInUser } = useContext(ChatContext); 
  let { trueItems,groupName,setGroupName } = useContext(ChatContext);
  const [checkedItems, setCheckedItems] = useState({});
  // const [groupName, setGroupName] = useState("");
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



  return (
    <div>
      <p>This is a group chat with :</p>
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
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter Name of the group"
      />
       
      {console.log(groupName)}
    </div>
  );
}

export default CheckboxList;
