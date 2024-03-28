
import { useParams } from "react-router-dom";
import {setGroups  } from '../users/userSlice';
import { useDispatch, useSelector } from "react-redux";
const API_URL = "http://localhost:3001";


export default function SettingsGroup() {
  const dispatch = useDispatch();
  const { groups} = useSelector(store=>store.user);
  const params = useParams();
  const idSettings =params.groupId;
  const groupToSet = groups.filter((group) => group.id === idSettings)[0]?.name;

  // console.log("params= ", params);

  // console.log(idSettings);
  function addUser() {
  alert("Missing code for adding users")
  }

  function deleteUser(member) {
    // console.log(groups.filter((group) => group.id === idSettings)[0]
    // .members.find(x=> x===member));
    alert("Missing code for deleting users")
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
        dispatch(setGroups(groups.filter((group) => group.id !== groupId)));
      })
      .catch((error) => console.error("Error deleting group:", error));
    
  }

  return (
    <div className="settings">
      <p>Settings {groupToSet}</p>
      <br></br>
      <div className="wrapper">
        <button onClick={addUser}>Add User</button>
        <ul>
          <p> Delete User</p>
          {groups
            .filter((group) => group.id === idSettings)[0]
            ?.members.slice(0,-1).map((member) => (
              <li key={member}>
                <p>
                  {member}
                  <button onClick={()=>deleteUser(member)}>Delete</button>
                </p>
              </li>
            ))}
        </ul>

        {/* <button onClick={() => deleteUser(idSettings)}>Delete User</button> */}
        <button onClick={() => deleteGroup(idSettings)}>Delete Group</button>
      </div>
    </div>
  );
}
