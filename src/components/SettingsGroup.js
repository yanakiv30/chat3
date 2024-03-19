import { useContext } from "react"

export default function SettingsGroup({ChatContext}) {
    const {groups,idSettings}= useContext(ChatContext);   
    const groupToSet=groups.filter(group=> group.id===idSettings)[0].name;    
    return (
        <div className="settings" >
            <p>Settings {groupToSet}</p>           
           <div className="wrapper">
           <button>Add User</button>
           <button>Delete User</button>
            <button>Delete Group</button>           
           </div>
        </div>
    )
}
