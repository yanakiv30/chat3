import supabase from "./supabase";

export async function getTeams(loggedInUserId: number) {
  const teamsIds = await getTeamsIds();
  
  const { data, error } = await supabase.from("teams")
  .select("*")
 .in('id',teamsIds);
  if (error) {
    console.error(error);
    throw new Error("Teams could not be loaded");
  }
  console.log("teams :", data);
  return data;

  async function getTeamsIds() {
    const { data, error } = await supabase
      .from("teams_members")
      .select("team_id")
      .eq("user_id", loggedInUserId);
    if (error) {
      console.error(error);
      throw new Error("teams_members could not be loaded");
    }
    const teamsIds = data.map((x) => x.team_id);
    console.log("teamsIds :", teamsIds);
    return teamsIds;
  }
}

export async function getGroupMessages() {
  const { data, error } = await supabase.from("groupMessages0").select("*");

  if (error) {
    console.log(error);
    throw new Error("Group Messages could not be loaded");
  }
  return data;
}
