import supabase from "@/config/supabaseClient";
import { checkIfRecordExists } from "@/utils/check-if-records-exist";
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

export const getUserProfile = async (id: string) => {
  const { data, error } = await supabase.from('Profile').select('*').eq('id', id);
  if (error) {
    throw error;
  }
  return data;
}

export const updateUserProfile = async (id: string, userData: Omit<UserProfile, "user_id">) => {
  const { error, data } = await supabase.from('Profile').update(userData).eq('id', id);
  if (error) {
    throw error;
  }
  return data;
}

export const deleteUserProfile = async (id: string) => {
  const { error } = await supabase.from('Profile').delete().eq('id', id);
  if (error) {
    throw error;
  }
  return;
}

export const addXP = async (id: string, xp: number) => {
  const { error, data } = await supabase.from('Profile').update({ xp }).eq('id', id);
  if (error) {
    throw error;
  }
  return data;
}

export const createTestProfile = async (profileId: string, testId: string) => {

  const existingRecord = await checkIfRecordExists('UserTest', {
    user_id: profileId,
    test_id: testId,
  });

  if (existingRecord) {
    return { message: 'Record already exists', data: existingRecord };
  }

  const { error, data } = await supabase.from('UserTest').insert({
    user_id: profileId,
    test_id: testId
  }).select("*");

  if (error) {
    throw error;
  }
  return data;
}

export const fetchTestsAlreadyTaken = async (profileId: string) => {
  const { data, error } = await supabase
    .from('UserTest')
    .select('test_id')
    .eq('user_id', profileId);

  if (error) {
    throw error;
  }
  return data;
}