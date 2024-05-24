import { Team } from "../features/groups/groupSlice";
import supabase from "./supabase";

export async function getTeams(loggedInUserId: number) {
  const teamsIds = await getTeamsIds();

  const { data:teamsData, error } = await supabase
    .from("teams")
    .select("*")
    .in("id", teamsIds);
  if (error) {
    console.error(error);
    throw new Error("Teams could not be loaded");
  }
  console.log("teams :", teamsData);
  await loadMembersInTeams();
  await loadMessagesInTeams();

  return teamsData;

  async function loadMessagesInTeams() {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .in("team_id", teamsIds)
      .order("created_at", { ascending: true });
      for (const message of data!) {
        const teamContainingMessage= teamsData!.find(team=> team.id===message.team_id)! ;
        if(!teamContainingMessage.messages)
      }

    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
  }

  async function loadMembersInTeams() {
    const { data, error } = await supabase
      .from("teams_members")
      .select()
      .in("team_id", teamsIds)
      .order("created_at", { ascending: true });
    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
  }

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
