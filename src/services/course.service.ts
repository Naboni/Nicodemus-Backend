import supabase from "@/config/supabaseClient";

export async function createCourse(title: string) {
  const { error, data } = await supabase.from("Course").insert({
    title,
  });
  if (error) {
    throw error;
  }
  return data;
    
}

export async function fetchCoursesPaginated(start: number, limit: number) {
  const { data, error } = await supabase.from("Course").select("*").range(start, start + limit - 1);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCourseById(id: string) {
  const { data, error } = await supabase.from("Course").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateCourseById(id: string, title: string) {
  const { error, data } = await supabase.from("Course").update({ title }).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteCourseById(id: string) {
  const { error } = await supabase.from("Course").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return;
}