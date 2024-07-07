// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config();

// const supabase = createClient("https://juwaylbyjjmkiwwbzldf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1d2F5bGJ5ampta2l3d2J6bGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyMDE5ODMsImV4cCI6MjAzNTc3Nzk4M30.tV94VBudgKrrBl6S5LuvfksFE75zkMtWxfqMF5gK4Qo");

// module.exports = supabase;


const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
