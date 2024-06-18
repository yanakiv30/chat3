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
  const { localTeams } = useAppSelector((store) => store.group);
  const { loggedInUser } = useAppSelector((store) => store.user);
  // const groupMemebers = groups.find((x) => x.id === groupInListId)?.members;
  const idSettings = +params.groupId!;
  const teamToSet = localTeams.find((team) => team.id === idSettings)!;
  let membersArr: any = [];
  teamToSet?.members.map((member) => membersArr.push(member.username));



  
  async function removeMe(teamId: number, userId: number) {
   // dispatch(setIsLoading(true));
    const { error } = await supabase
      .from("teams_members")
      .delete()
      .eq("team_id", teamId)
      .eq("user_id", userId);
    // dispatch(setIsLoading(false));
  }

  return (
    <div className="settings">
      <div style={{ backgroundColor: "beige", borderRadius: "7px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          Team: {teamToSet?.name}
          <button onClick={() => navigate("/")}>X</button>
        </div>
        <p> members: {membersArr.join(", ")}</p>
      </div>

      <br></br>
      <div className="wrapper">
        <button onClick={() => removeMe(idSettings, loggedInUser!.id)}>
          Remove me from the group
        </button>
      </div>
    </div>
  );
}
