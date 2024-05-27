import supabase from "../services/supabase";
export async function createTeamWithMembers(
    teamName: string,
    usersIds: number[]
  ) {
    const newTeam = await createTeam({ name: teamName });
    const teamToMembers = await connectTeamWithUsers(newTeam.id, usersIds);
  }
  
  async function createTeam(newTeam: { name: string }) {
    const { data, error } = await supabase.from("teams").insert(newTeam).select();
    if (error) {
      console.error(error);
      throw new Error("New group could not be loaded");
    }
    return data[0];
  }
  
  async function connectTeamWithUsers(teamId: number, usersIds: number[]) {
    const rows = usersIds.map((userId) => {
      return { team_id: teamId, user_id: userId };
    });
    const { data, error } = await supabase
      .from("teams_members")
      .insert(rows)
      .select();
    if (error) {
      console.error(error);
      throw new Error("Failed to connect users to team");
    }
    return data;
  }
  