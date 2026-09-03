import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
async function test() {
  const { data, error } = await supabase.auth.signUp({
    email: "test" + Date.now() + "@example.com",
    password: "password123",
    options: {
      data: { display_name: "Test User" },
    },
  });
  console.log("Data:", data);
  console.log("Error:", error);
}
test();
