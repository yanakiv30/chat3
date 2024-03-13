import React, { useContext, useState } from 'react';

function CheckboxList ({ChatContext}){
  // State to keep track of checked checkboxes
  const{users,loggedInUser} = useContext(ChatContext);
  const [checkedItems, setCheckedItems] = useState({});  
let trueItems=[];
  let names =[];
  users.map(user=> names.push(user.username));
  names=names.filter(name=> name!==loggedInUser.username);

  // Handle checkbox changes
  function handleCheckboxChange (name){
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
    console.log("CheckedItems= ", checkedItems);
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
       {  trueItems= Object.keys(checkedItems).filter(key=> checkedItems[key]===true)} 
      {console.log('trueItems= ',trueItems)}
      <p></p>
    </div>
  );
};

export default CheckboxList;
