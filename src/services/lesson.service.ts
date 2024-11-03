import supabase from "@/config/supabaseClient";

export async function createLesson(title: string) {
  const { error, data } = await supabase.from("Lesson").insert({
    title,
  });
  if (error) {
    throw error;
  }
  return data;
    
}

export async function fetchLessonsPaginated(start: number, limit: number) {
  const { data, error } = await supabase.from("Lesson").select("*").range(start, start + limit - 1);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchLessonById(id: string) {
  const { data, error } = await supabase.from("Lesson").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateLessonById(id: string, title: string) {
  const { error, data } = await supabase.from("Lesson").update({ title }).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteLessonById(id: string) {
  const { error } = await supabase.from("Lesson").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return;
}