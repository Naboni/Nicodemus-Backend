import supabase from "@/config/supabaseClient";

export async function createUnit(title: string, course_id: number) {
  const { error, data } = await supabase.from("unit").insert({
    title,
    course_id,
  });
  if (error) {
    throw error;
  }
  return data;
    
}