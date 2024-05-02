import supabase from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}

export async function insertUsers() {
  const { data, error } = await supabase
    .from("users")
    .insert([{ id: "id1", username: "mariya", password: "m6" }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}
