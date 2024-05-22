import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import supabase from "../services/supabase";
import { setIsLoading } from "../features/users/userSlice";
import { useState } from "react";
export default function SettingsGroup() {
  const params = useParams();

  const [updateName, setUpdateName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teams } = useAppSelector((store) => store.group);
  // const groupMemebers = groups.find((x) => x.id === groupInListId)?.members;
  const idSettings = +params.groupId!;
  const teamToSet = teams.find((team) => team.id === idSettings)!;

  async function changeGroupName(groupId: number) {
    // dispatch(setIsLoading(true));
    // try {
    //   const { error } = await supabase
    //     .from("groups0")
    //     .update({ name: `${updateName}` })
    //     .eq("id", groupId)
    //     .select();
    //   if (error) {
    //     console.error(error);
    //     throw new Error("Group could not be renamed");
    //   }
    // } catch (error) {
    //   console.error("Error renaming group:", error);
    // } finally {
    //   dispatch(setIsLoading(false));
    // }
  }

  // async function addUser(groupId: string, addedUser: string) {
  //   dispatch(setIsLoading(true));
  //   // console.log(...groups.filter(group=>group.id===idSettings)[0].members,addedUser)

  //   try {
  //     const { error } = await supabase
  //       .from("groups0")
  //       .update({
  //         members: [
  //           ...groups.filter((group) => group.id === idSettings)[0].members,
  //           addedUser,
  //         ],
  //       })
  //       .eq("id", groupId)
  //       .select();
  //     if (error) {
  //       console.error(error);
  //       throw new Error("User could not be added");
  //     }
  //   } catch (error) {
  //     console.error("Error adding  group:", error);
  //   } finally {
  //     dispatch(setIsLoading(false));
  //   }
  // }
 

  async function deleteGroup(groupId: number) {
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("groups0")
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
      <div style={{ backgroundColor: "yellow", borderRadius: "7px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          Team: {teamToSet.name}
          <button onClick={() => navigate("/userOptions")}>X</button>
        </div>
        <p> members: {teamToSet.members?.join(", ")}</p>
      </div>

      <br></br>
      <div className="wrapper">
        <div>
          <input
            style={{ width: "60%" }}
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                changeGroupName(idSettings!);
              }
            }}
            placeholder="Change group name .."
          />
          <button onClick={() => changeGroupName(idSettings!)}>
            Update name
          </button>
        </div>

        <button onClick={() => deleteGroup(idSettings!)}>
          Delete the entire group
        </button>
      </div>
    </div>
  );
}
