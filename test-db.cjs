const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function main() {
  const { data, error } = await supabase.from('events_v2').select('*').limit(1);
  console.log("EVENTS_V2:", data, error);
}

main();
