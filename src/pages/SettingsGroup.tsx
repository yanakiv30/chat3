import { useNavigate, useParams } from "react-router-dom";
import { setGroups } from "../features/groups/groupSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";
import { useState } from "react";
export default function SettingsGroup() {
  const params = useParams();
  const groupInListId = params.groupId;
  const [updateName, setUpdateName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups } = useAppSelector((store) => store.group);
  const groupMemebers = groups.find((x) => x.id === groupInListId)?.members; 
  const idSettings = params.groupId;
  const groupToSet = groups.filter((group) => group.id === idSettings)[0]?.name;

  async function changeGroupName(groupId: string) {
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("groups")
        .update({ name: `${updateName}` })
        .eq("id", groupId)
        .select();
      if (error) {
        console.error(error);
        throw new Error("Group could not be renamed");
      }
    } catch (error) {
      console.error("Error renaming group:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function addUser() {
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

  async function deleteUser(groupId: string, member: string) {
    console.log(member);
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

    
  }

  return (
    <div className="settings">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {groupToSet}
        <button onClick={() => navigate("/userOptions")}>X</button>
      </div>
      <p> members: {groupMemebers!.join(", ")}</p>
      <br></br>
      <div className="wrapper">
        <div>
          <input
            style={{ width: "50%" }}
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                changeGroupName(idSettings!);
              }
            }}
            placeholder="New group name .."
          />
          <button onClick={() => changeGroupName(idSettings!)}>
            Update name
          </button>
        </div>
        <button onClick={() => addUser}>Add new member </button>

        <ul>
          {groups
            .filter((group) => group.id === idSettings)[0]
            ?.members.slice(0, -1)
            .map((member) => (
              <li key={member}>
                <div>
                  <br></br>
                  <button onClick={() => deleteUser(idSettings!, member)}>
                    Delete member {member}
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <button onClick={() => deleteGroup(idSettings!)}>
          Delete the entire group
        </button>
      </div>
    </div>
  );
}
