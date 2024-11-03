import supabase from "@/config/supabaseClient";

interface UserProfile {
    user_name: string;
    full_name?: string;
    date_of_birth?: Date;
    phone_number?: string;
    profile_pic?: string;
    address?: string;
    xp?: number;
    user_id: any;
}

export const createUserProfile = async (userData: UserProfile) => {
  const { error, data } = await supabase.from('Profile').insert(userData);
  if (error) {
    throw error;
  }
  return data;
    
}