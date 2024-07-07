// const supabase = require('../utils/ db');

// async function createUser(userData) {
//   const response = await supabase.from('users').insert([userData]);
//   const { data, error } = response;
//   console.log('Supabase Create User Response:', response); // Log the entire response
//   if (error) {
//     console.error('Error inserting user:', error);
//   } else {
//     console.log('User inserted successfully:', data);
//   }
//   return { data, error };
// }

// async function getUserByEmail(email) {
//   const response = await supabase.from('users').select().eq('email', email).single();
//   const { data, error } = response;
//   console.log('Supabase Get User Response:', response); // Log the entire response
//   if (error) {
//     console.error('Error fetching user by email:', error);
//   }
//   return { data, error };
// }

// module.exports = {
//   createUser,
//   getUserByEmail,
// };



const supabase = require('../utils/ db');

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

