import supabase from "@/config/supabaseClient";

export async function createUnit(title: string) {
  const { error, data } = await supabase.from("Unit").insert({
    title,
  });
  if (error) {
    throw error;
  }
  return data;
    
}

export async function fetchUnitsPaginated(start: number, limit: number) {
  const { data, error } = await supabase.from("Unit").select("*").range(start, start + limit - 1);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchUnitById(id: string) {
  const { data, error } = await supabase.from("Unit").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateUnitById(id: string, title: string) {
  const { error, data } = await supabase.from("Unit").update({ title }).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteUnitById(id: string) {
  const { error } = await supabase.from("Unit").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return;
}