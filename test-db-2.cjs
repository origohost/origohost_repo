const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function main() {
  const { data, error } = await supabase.from('event_speakers').select('*').limit(1);
  console.log("EVENT_SPEAKERS:", data, error);
  const { data: d2, error: e2 } = await supabase.from('speakers').select('*').limit(1);
  console.log("SPEAKERS:", d2, e2);
  const { data: d3, error: e3 } = await supabase.from('event_gallery').select('*').limit(1);
  console.log("GALLERY:", d3, e3);
}

main();
