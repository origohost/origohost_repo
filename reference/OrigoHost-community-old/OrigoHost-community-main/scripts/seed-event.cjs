const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function seed() {
  const eventId = "e2d0981e-1f7d-417d-94cf-e313ad6ef047";

  let speakerId = "123e4567-e89b-12d3-a456-426614174001"; // UUID
  const { data: newSpeaker, error: speakerErr } = await supabase
    .from("speakers")
    .upsert({
      id: speakerId,
      name: "Mr. Tarun Kumar",
      designation: "Founder & President",
      organization: "OrigoHOST",
      bio: "Founder & President at OrigoHOST.",
    })
    .select()
    .single();

  if (speakerErr) console.error("Error speaker:", speakerErr);

  const { error: esErr } = await supabase.from("event_speakers").upsert({
    event_id: eventId,
    speaker_id: speakerId,
    session_title: "Keynote Speaker",
    speaking_time: "12:00 PM",
  });
  if (esErr) console.error("Error event_speakers:", esErr);

  const orgId = "123e4567-e89b-12d3-a456-426614174002"; // UUID
  const { error: orgErr } = await supabase.from("event_organizers").upsert({
    id: orgId,
    event_id: eventId,
    name: "OrigoHOST",
    role: "Organizer",
  });
  if (orgErr) console.error("Error org:", orgErr);

  const { error: galErr } = await supabase.from("event_gallery").upsert({
    id: "123e4567-e89b-12d3-a456-426614174003",
    event_id: eventId,
    image_url: "/assets/events/kss2026ep02-poster.jpg",
    caption: "Building AI Applications Webinar Poster",
  });
  if (galErr) console.error("Error gallery:", galErr);

  console.log("Database seeded successfully!");
}
seed();
