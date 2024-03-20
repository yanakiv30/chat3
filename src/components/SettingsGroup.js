import { useContext } from "react"

export default function SettingsGroup({ChatContext}) {
    const {groups,idSettings}= useContext(ChatContext);   
    const groupToSet=groups.filter(group=> group.id===idSettings)[0].name;    
  
    function addUser() {};

   function deleteUser() {};

   function deleteGroup() {};
   
   
    return (
        <div className="settings" >
            <p>Settings {groupToSet}</p>           
           <div className="wrapper">
           <button onClick={addUser}>Add User</button>
           <button onClick={deleteUser}>Delete User</button>
            <button onClick={deleteGroup}>Delete Group</button>           
           </div>
        </div>
    )
}
