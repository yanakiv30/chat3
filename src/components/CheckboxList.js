import React, { useContext, useState } from 'react';

function CheckboxList ({ChatContext}){
  // State to keep track of checked checkboxes
  const{users,loggedInUser,setIsGroup} = useContext(ChatContext);
  let {trueItems} = useContext(ChatContext);
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
  trueItems=Object.keys(checkedItems).filter(key=> checkedItems[key]===true)
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
       <br></br>
      <p>You created group with members :</p>
      
      <p style={{color:"red"}}>{ trueItems.join(', ')}  </p>
      {trueItems.length>0? setIsGroup(true):setIsGroup(false)}
      {/* {console.log('trueItems= ',trueItems)} */}
    </div>
  );
};

export default CheckboxList;
