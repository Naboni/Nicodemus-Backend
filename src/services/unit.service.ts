import supabase from "@/config/supabaseClient";
import { checkIfRecordExists } from "@/utils/check-if-records-exist";

export const createUnit = async (title: string) => {
  const { error, data } = await supabase.from("Unit").insert({
    title,
  });
  if (error) {
    throw error;
  }
  return data;
    
}

export const fetchUnitsPaginated = async (start: number, limit: number) => {
  const { data, error } = await supabase.from("Unit").select("*").range(start, start + limit - 1);
  if (error) {
    throw error;
  }
  return data;
}

export const fetchUnitById = async (id: string) => {
  const { data, error } = await supabase.from("Unit").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export const updateUnitById = async (id: string, title: string) => {
  const { error, data } = await supabase.from("Unit").update({ title }).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export const deleteUnitById = async (id: string) => {
  const { error } = await supabase.from("Unit").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return;
}

// many to many relationship with user

export const createUserUnit = async (unitId: string, userId: string) => {
  const existingRecord = await checkIfRecordExists('UserUnit', {
    unit_id: unitId,
    user_id: userId
  });

  if (existingRecord) {
    return { message: 'Record already exists', data: existingRecord };
  }

  const { error, data } = await supabase.from("UserUnit").insert({
    unit_id: unitId,
    user_id: userId
  });
  if (error) {
    throw error;
  }
  return data;
}