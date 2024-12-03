import supabase from "@/config/supabaseClient";
import { checkIfRecordExists } from "@/utils/check-if-records-exist";

export const createCourse = async (title: string) => {
  const { error, data } = await supabase.from("Course").insert({
    title,
  });
  if (error) {
    throw error;
  }
  return data;
    
}

export const fetchCoursesPaginated = async (start: number, limit: number) => {
  const { data, error } = await supabase.from("Course").select("*").range(start, start + limit - 1);
  if (error) {
    throw error;
  }
  return data;
}

export const fetchCourseById = async (id: string) => {
  const { data, error } = await supabase.from("Course").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export const updateCourseById = async (id: string, title: string) => {
  const { error, data } = await supabase.from("Course").update({ title }).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export const deleteCourseById = async (id: string) => {
  const { error } = await supabase.from("Course").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return;
}

// many to many relationship with user

export const createUserCourse = async (courseId: string, userId: string) => {
  const existingRecord = await checkIfRecordExists('UserCourse', {
    course_id: courseId,
    user_id: userId
  });

  if (existingRecord) {
    return { message: 'Record already exists', data: existingRecord };
  }
  
  const { error, data } = await supabase.from("UserCourse").insert({
    course_id: courseId,
    user_id: userId
  });
  if (error) {
    throw error;
  }
  return data;
}