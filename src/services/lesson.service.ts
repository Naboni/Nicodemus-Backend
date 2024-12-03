import supabase from "@/config/supabaseClient";
import { checkIfRecordExists } from "@/utils/check-if-records-exist";

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

// many to many relationship with user

export const createUserLesson = async (lessonId: string, userId: string) => {

  const existingRecord = await checkIfRecordExists('UserLesson', {
    lesson_id: lessonId,
    user_id: userId
  });

  if (existingRecord) {
    return { message: 'Record already exists', data: existingRecord };
  }


  const { error, data } = await supabase.from("UserLesson").insert({
    lesson_id: lessonId,
    user_id: userId
  });

  // increment xp by 5
  const { error: xpError } = await supabase.from("Profile").update({ xp: 5 }).eq("id", userId);
  
  if (error || xpError) {
    throw error || xpError;
  }

  return data;
}

export const moveToNextStepInLesson = async (lessonId: string, userId: string, step: number) => {

  const { data: userLesson, error: fetchError } = await supabase
      .from('UserLesson')
      .select('*')
      .eq('lesson_id', lessonId)
      .eq('user_id', userId)
      .single();

  if (fetchError) {
    throw new Error('UserLesson record not found');
  }

  if (step > userLesson.total_step) {
    throw new Error('Step exceeds total steps');
  }

  const { error, data } = await supabase.from("UserLesson").update({ step }).eq("lesson_id", lessonId).eq("user_id", userId).select("*");
  
  if (error) {
    throw error;
  }
  return data;
}