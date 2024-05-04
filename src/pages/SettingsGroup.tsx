import { useNavigate, useParams } from "react-router-dom";
import { setGroups } from "../features/groups/groupSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";

const API_URL = "http://localhost:3001";

export default function SettingsGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups } = useAppSelector((store) => store.group);
  const params = useParams();
  const idSettings = params.groupId;
  const groupToSet = groups.filter((group) => group.id === idSettings)[0]?.name;

async function changeGroupName(groupId: string) {

  dispatch(setIsLoading(true));
  try {
    const { error } = await supabase
      .from("groups")
      .update({ name: 'nem-update' })
      .eq("id", groupId)
      .select();
    if (error) {
      console.error(error);
      throw new Error("Group could not be deleted");
    }     
  } catch (error) {
    console.error("Error deleting group:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
}

  async function addUser( ) {
    alert("Missing code for adding users");

//     const { data, error } = await supabase
//     .from('groups')
//     .update({ other_column: 'otherValue' })
//     .eq('some_column', 'someValue')
//     .select()
  

// const { data, error } = await supabase
//   .from('users')
//   .update({
//     address: {
//       street: 'Melrose Place',
//       postcode: 90210
//     }
//   })
//   .eq('address->postcode', 90210)
//   .select()


//     dispatch(setIsLoading(true));
//     try {
//       const { error } = await supabase
//         .from("groups")
//         .delete()
//         .eq("id", groupId);
//       if (error) {
//         console.error(error);
//         throw new Error("User could not be added");
//       }     
//     } catch (error) {
//       console.error("Error adding user:", error);
//     } finally {
//       dispatch(setIsLoading(false));
//     }

  }

  async function deleteUser( groupId: string ,member:string) {
   console.log(member)
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
        <button onClick={()=>addUser}>Add User</button>
        <button onClick={()=>changeGroupName(idSettings!)}>Change Group Name</button>
        <ul>
          {groups
            .filter((group) => group.id === idSettings)[0]
            ?.members.slice(0, -1)
            .map((member) => (
              <li key={member}>
                <div>
                  <br></br>
                  <button onClick={() => deleteUser(idSettings!,member)}>
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
