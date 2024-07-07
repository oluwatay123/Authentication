const supabase = require('../utils/ db');

const Organisation = {
  async create ({ orgId, name, description, users }) {
    try {
        const { data, error } = await supabase
            .from('organisations')
            .insert([{ orgId, name, description, users }])
            .select('*');  // Ensure it returns the created record

        // Debug logs
        console.log('Inserted Organisation Data:', data);
        console.log('Error (if any):', error);

        if (error) throw error;
        return { data: data[0], error: null };  // Return the first (and only) record
    } catch (error) {
        return { data: null, error };
    }
},

 async findById(orgId) {
    try {
        const { data, error } = await supabase
            .from('organisations')
            .select('*')
            .eq('orgId', orgId)
            .single();  // Use .single() to fetch a single record

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
},
  async findByUserId(userId) {
    return await supabase.from('organisations').select().contains('users', [userId]);
  },
  async updateUsers (orgId, users)  {
    try {
        const { data, error } = await supabase
            .from('organisations')
            .update({ users })
            .eq('orgId', orgId)
            .select('*')
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}
};

module.exports = Organisation;

