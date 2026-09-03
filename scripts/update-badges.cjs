const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function run() {
  await supabase.from('events_v2').update({
    seo_metadata: {
      tags: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI", "LLM", "Prompt Engineering", "RAG", "AI Agents", "Transformers", "Python", "Cloud AI", "FastAPI", "Docker", "Vector Databases", "Career", "Online Webinar"],
      badges: ["Knowledge Sharing Series", "Episode 02", "AI", "Webinar", "Free", "Certificate"]
    }
  }).eq('id', 'e2d0981e-1f7d-417d-94cf-e313ad6ef047');
  console.log("Badges updated.");
}
run();
