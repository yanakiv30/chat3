import supabase from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase.from("users0").select("*");
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}

export async function insertUsers() {
  const { data, error } = await supabase
    .from("users0")
    .insert([{ id: "id1", username: "mariya", password: "m6" }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}

export async function getMessages() {
  const { data, error } = await supabase
  .from('messages0')
  .select('*')  
  if(error) 
  {console.log(error);
    throw new Error("Messages could not be loaded");
  }
  return data;
}