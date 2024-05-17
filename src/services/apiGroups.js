import supabase from "./supabase";

export async function getTeams() {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) {
    console.error(error);
    throw new Error("Teams could not be loaded");
  }
  console.log("teams :", data);
  return data;
}

export async function getTeamsMembers() {
  const { data, error } = await supabase.from("teams_members").select("*");
  if (error) {
    console.error(error);
    throw new Error("teams_members could not be loaded");
  }
  console.log("teams_members:", data);
  return data;
}

export async function getGroupMessages() {
  const { data, error } = await supabase.from("groupMessages0").select("*");

  if (error) {
    console.log(error);
    throw new Error("Group Messages could not be loaded");
  }
  return data;
}
