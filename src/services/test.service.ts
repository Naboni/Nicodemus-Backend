import supabase from "@/config/supabaseClient";

interface Test {
    question: string;
    answer: string;
    answer_options: string[];
    lesson_id?: string;
    unit_id?: string;
    course_id?: string;
}

export const createTest = async (test: Test) => {
  const { error, data } = await supabase.from("Test").insert(test);
  if (error) {
    throw error;
  }
  return data;
    
}

export const fetchTestsByLessonId = async (lesson_id: string) => {
    const { data, error } = await supabase.from("Test").select("*").eq("lesson_id", lesson_id);
    if (error) {
        throw error;
    }
    return data;
}

export const fetchTestsByUnitId = async (unit_id: string) => {
    const { data, error } = await supabase.from("Test").select("*").eq("unit_id", unit_id);
    if (error) {
        throw error;
    }
    return data;
}

export const fetchTestsByCourseId = async (course_id: string) => {
    const { data, error } = await supabase.from("Test").select("*").eq("course_id", course_id);
    if (error) {
        throw error;
    }
    return data;
}

export const fetchTestById = async (id: string) => {
    const { data, error } = await supabase.from("Test").select("*").eq("id", id);
    if (error) {
        throw error;
    }
    return data;
}

export const updateTestById = async (id: string, title: string) => {
    const { error, data } = await supabase.from("Test").update({ title }).eq("id", id);
    if (error) {
      throw error;
    }
    return data;
  }
  
  export const deleteTestById = async (id: string) => {
    const { error } = await supabase.from("Test").delete().eq("id", id);
    if (error) {
      throw error;
    }
    return;
  }
