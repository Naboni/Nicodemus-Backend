import supabase from "@/config/supabaseClient";

export const createLesson = async (title: string) => {
  const { error, data } = await supabase.from("Lesson").insert({
    title,
  });
  if (error) {
    throw error;
  }
  return data;
    
}

export const fetchLessonsPaginated = async (start: number, limit: number) => {
  const { data, error } = await supabase.from("Lesson").select("*").range(start, start + limit - 1);
  if (error) {
    throw error;
  }
  return data;
}

export const fetchLessonById = async (id: string) => {
  const { data, error } = await supabase.from("Lesson").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export const updateLessonById = async (id: string, title: string) => {
  const { error, data } = await supabase.from("Lesson").update({ title }).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export const deleteLessonById = async (id: string) => {
  const { error } = await supabase.from("Lesson").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return;
}