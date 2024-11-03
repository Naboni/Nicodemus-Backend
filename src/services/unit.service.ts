import supabase from "@/config/supabaseClient";

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