import { useContext } from "react";
import { useParams } from "react-router-dom";
const API_URL = "http://localhost:3001";



export default function SettingsGroup({ ChatContext }) {
  const { groups, setGroups, idSettings,setIdSettings } = useContext(ChatContext);
  const groupToSet = groups.filter((group) => group.id === idSettings)[0]?.name;
  const params = useParams();
  // const userInListId = params.userId;
  setIdSettings(params.groupId);
  console.log("params= ",params);

console.log(idSettings)
  function addUser() {}

  function deleteUser(idSettings) {
    console.log(groups.filter(group=>group.id===idSettings)[0].members)
  }

  function deleteGroup(groupId) {
//    console.log(groupId)
    fetch(`${API_URL}/groups/${groupId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setGroups(groups.filter((group) => group.id !== groupId));
      })
      .catch((error) => console.error("Error deleting group:", error));
      setIdSettings();
  }

  return (
    <div className="settings">
      <p>Settings {groupToSet}</p>
      {/* <div className="wrapper">
        <button onClick={addUser}>Add User</button>
        <button onClick={()=>deleteUser(idSettings)}>Delete User</button>        
        <button onClick={()=>deleteGroup(idSettings)}>Delete Group</button>
      </div> */}

      <div className="wrapper">
        <button onClick={addUser}>Add User</button>
        <button onClick={()=>deleteUser(idSettings)}>Delete User</button>        
        <button onClick={()=>deleteGroup(idSettings)}>Delete Group</button>
      </div>
    </div>
  );
}
