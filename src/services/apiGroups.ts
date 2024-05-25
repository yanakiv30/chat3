import { Message, Team } from "../features/groups/groupSlice";
import { User } from "../features/users/userSlice";
import { useAppSelector } from "../store";
import { getHourDayDate } from "../utils/messageUtils";
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
  const membersInTeams = await getMembersInTeams();
  const messagesInTeams = await getMessagesInTeams();
  const users = await getUsers();

  const teamsWithMembers = teamsData.map((team) => ({
    ...team,
    members: membersInTeams
      .filter((tm) => tm.team_id === team.id)
      .map((tm) => users.find((user) => user.id === tm.user_id)!),
    messages: messagesInTeams
      .filter((row) => row.team_id === team.id)
      .map((row) => {
      //  const sender= users.find((user) => user.id === row.sender_id)!;

       const message :Message ={'id':row.id!,'senderId':row.sender_id!,content:row.message!, 
        ...getHourDayDate(new Date(row.created_at!))
       };
       return message;
      }),
  }));

  return teamsWithMembers;

  async function getMessagesInTeams() {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .in("team_id", teamsIds)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
    return data;
  }

  async function getMembersInTeams() {
    const { data, error } = await supabase
      .from("teams_members")
      .select()
      .in("team_id", teamsIds);
    //.order("created_at", { ascending: true });
    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
    console.log("data from loadMembers ", data);
    return data;
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

// export async function getGroupMessages() {
//   const { data, error } = await supabase.from("messages").select("*");

//   if (error) {
//     console.log(error);
//     throw new Error("Group Messages could not be loaded");
//   }
//   return data;
// }

export async function getMessages() {
  const { data, error } = await supabase.from("messages").select("*");
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
