import supabase from "@/config/supabaseClient";

/**
 * Checks if a record exists in a Supabase table based on given conditions.
 * @param table - The table name to query.
 * @param conditions - An object representing the conditions to check.
 * @returns The existing record if found, or null if not.
 */
export const checkIfRecordExists = async (
    table: string,
    conditions: Record<string, any>
  ): Promise<any | null> => {
    try {
      let query = supabase.from(table).select('*').single();
  
      Object.entries(conditions).forEach(([key, value]) => {
        query = (query as any).eq(key, value);
      });
  
      const { data, error } = await query;
  
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
  
      return data || null;
    } catch (error) {
      console.error('Error checking record existence:', error);
      throw error;
    }
  };