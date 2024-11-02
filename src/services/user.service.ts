import supabase from "@/config/supabaseClient";

export async function createUser(email: string, password: string) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
    
}