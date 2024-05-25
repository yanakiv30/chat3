import { Team } from "../features/groups/groupSlice";
import { User } from "../features/users/userSlice";
import { useAppSelector } from "../store";
import supabase from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("username,id,avatar,status"); //
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
  return data;
}


export async function getTeams(loggedInUserId: number) {
  const teamsIds = await getTeamsIds();
  const { data: teamsData, error } = await supabase
    .from("teams")
    .select("*")
    .in("id", teamsIds);
  if (error) {
    console.error(error);
    throw new Error("Teams could not be loaded");
  }
  console.log("teams :", teamsData);
  const membersInTeams = await loadMembersInTeams();
  await loadMessagesInTeams();
  const users = await getUsers();
  const teamsWithMembers = teamsData.map((team) => ({
    ...team,
    members: membersInTeams
      .filter((tm) => tm.team_id === team.id)
      .map((tm) => users.find((user) => user.id === tm.user_id)!),
  }));
  return teamsWithMembers;

  async function loadMessagesInTeams() {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .in("team_id", teamsIds)
      .order("created_at", { ascending: true });
    for (const message of data!) {
      const teamContainingMessage = teamsData!.find(
        (team) => team.id === message.team_id
      )!;
      if (!teamContainingMessage) console.log(" !teamContainingMessage");
    }

    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
  }

  async function loadMembersInTeams() {
    const { data, error } = await supabase.from("teams_members").select();
    // .in("team_id", teamsIds)
    //.eq("team_id", teamId)
    //.order("created_at", { ascending: true });
    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
    console.log("data from loadMembers ", data);
    return data;
    //data.map((row) => console.log("member :", row.user_id));
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

export async function getMessages() {
  const { data, error } = await supabase.from("messages0").select("*");
  if (error) {
    console.log(error);
    throw new Error("Messages could not be loaded");
  }
  return data;
}

// export async function insertUsers() {
//   const { data, error } = await supabase
//     .from("users0")
//     .insert([{ id: "id1", username: "mariya", password: "m6" }])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Users could not be loaded");
//   }

//   return data;
// }
