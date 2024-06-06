import supabase from "../services/supabase";
export async function createTeamWithMembers(
    teamName: string,
    membersIds: number[]
  ) {
    const newTeam = await createTeam({ name: teamName });
    await connectTeamWithUsers(newTeam.id, membersIds);
    return newTeam.id;
  }
  
  async function createTeam(newTeam: { name: string }) {
    const { data, error } = await supabase.from("teams").insert(newTeam).select();
    if (error) {
      console.error(error.message);
      throw new Error("New group could not be loaded");
    }
    return data[0];
  }
  
  async function connectTeamWithUsers(teamId: number, membersIds: number[]) {
    const rows = membersIds.map((userId) => {
      return { team_id: teamId, user_id: userId };
    });
    const { data, error } = await supabase
      .from("teams_members")
      .insert(rows);
    if (error) {
      console.error(error);
      throw new Error("Failed to connect users to team");
    }
  }