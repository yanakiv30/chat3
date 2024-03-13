import React, { useContext, useState } from 'react';

function CheckboxList ({ChatContext}){
  // State to keep track of checked checkboxes
  const{users,loggedInUser} = useContext(ChatContext);
  const [checkedItems, setCheckedItems] = useState({});  

  let names =[];
  users.map(user=> names.push(user.username));
  names=names.filter(name=> name!==loggedInUser.username);

  // Handle checkbox changes
  function handleCheckboxChange (name){
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
  };
console.log(checkedItems);
  return (
    <div>
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
      {/* You can add more components or logic here based on checkbox state */}
    </div>
  );
};

export default CheckboxList;
