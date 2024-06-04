import supabase from "./supabase";

export async function signUpUser(email: string, password: string) {
  const response = await supabase.auth.signUp({ email, password });
  return response;
}

export async function signInUser(email: string, password: string) {
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
}
