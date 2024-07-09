
const supabase = require('../utils/db');

const User = {
  async create(user) {
    try {
      const { data, error } = await supabase.from('users').insert(user).select();
      if (error) throw error;
      return { data, error };
    } catch (error) {
      console.error('User creation error:', error);
      throw error;
    }
  },
  async findByEmail(email) {
    try {
      const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
      if (error) throw error;
      return { data, error };
    } catch (error) {
      console.error('Find user by email error:', error);
      throw error;
    }
  },
 async getUserById (userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userId', userId)
      .single();

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return { error: 'User not found' };
  }
}
  
};

module.exports = User;

