import { useNavigate, useParams } from "react-router-dom";
import { setGroups } from "../features/groups/groupSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";
import { Audio } from 'react-loader-spinner';
const API_URL = "http://localhost:3001";

export default function SettingsGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups } = useAppSelector((store) => store.group);
  const params = useParams();
  const idSettings = params.groupId;
  const groupToSet = groups.filter((group) => group.id === idSettings)[0]?.name;
  function addUser() {
    alert("Missing code for adding users");
  }
  function deleteUser(member: string) {
    alert("Missing code for deleting ");
  } 

  async function deleteGroup(groupId: string) {
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("groups")
        .delete()
        .eq("id", groupId);
      if (error) {
        console.error(error);
        throw new Error("Group could not be deleted");
      }     
    } catch (error) {
      console.error("Error deleting group:", error);
    } finally {
      dispatch(setIsLoading(false));
    }

    // fetch(`${API_URL}/groups/${groupId}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then(() => {
    //     dispatch(setGroups(groups.filter((group) => group.id !== groupId)));
    //   })
    //   .catch((error) => console.error("Error deleting group:", error));
  }

  return (
    <div className="settings">

      <p>
        Settings {groupToSet}
        <button onClick={() => navigate("/userOptions")}>X</button>
      </p>
      <br></br>
      <div className="wrapper">
        <button onClick={addUser}>Add User</button>
        <ul>
          {groups
            .filter((group) => group.id === idSettings)[0]
            ?.members.slice(0, -1)
            .map((member) => (
              <li key={member}>
                <div>
                  <br></br>
                  <button onClick={() => deleteUser(member)}>
                    Delete {member}
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <button onClick={() => deleteGroup(idSettings!)}>Delete Group</button>
      </div>
    </div>
  );
}
