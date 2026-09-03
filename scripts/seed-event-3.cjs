const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function seed() {
  const eventId = "e3d0981e-1f7d-417d-94cf-e313ad6ef048"; // fixed uuid

  const { data: event, error: eventErr } = await supabase
    .from("events_v2")
    .upsert({
      id: eventId,
      title: "Cybersecurity & Ethical Hacking Fundamentals: Securing the Digital World Responsibly",
      slug: "cybersecurity-fundamentals-securing-digital-world-responsibly",
      short_description:
        "Learn cybersecurity fundamentals, ethical hacking concepts, responsible security practices, and real-world career opportunities through an interactive live session.",
      long_description: `Cybersecurity is becoming one of the fastest-growing technology domains worldwide. This live webinar introduces students and technology enthusiasts to the core concepts of cybersecurity and ethical hacking while emphasizing responsible learning and ethical practices.

Participants will gain practical knowledge about cyber threats, digital safety, ethical hacking methodologies, cybersecurity careers, security best practices, and modern defensive techniques.

The session is beginner-friendly while providing insights valuable for aspiring cybersecurity professionals.

## Learning Outcomes
- Introduction to Cybersecurity & CIA Triad
- Threat Landscape, Malware, Phishing, Social Engineering
- Password Security, Authentication, MFA
- Secure Browsing & Network Security Basics
- Ethical Hacking Process, Vulnerability Assessment, Penetration Testing
- OWASP Top 10 Introduction & Web Security Fundamentals
- Responsible Disclosure
- Cybersecurity Career Roadmap & Industry Certifications
- Security Best Practices

## Technologies & Tools Covered
Linux, Kali Linux, Windows Security, Wireshark, Burp Suite, Nmap, OWASP, Metasploit, Google Dorking, Password Managers, Firewalls, VPN, Virtual Machines.`,
      banner_url: "/assets/events/kss2026ep03-poster.jpg",
      thumbnail_url: "/assets/events/kss2026ep03-poster.jpg",
      date: "2026-08-09",
      start_time: "12:00:00",
      end_time: "14:00:00",
      timezone: "IST",
      mode: "Online",
      venue_name: "Google Meet",
      registration_link:
        "https://unstop.com/o/2HNSbPd?lb=3fjmXvr8&utm_medium=Share&utm_source=imtarunchaudhary&utm_campaign=Workshops",
      price: 0,
      category: "Knowledge Sharing Series",
      is_published: true,
      certificate_enabled: true,
      seo_metadata: {
        tags: [
          "Cybersecurity",
          "Ethical Hacking",
          "Information Security",
          "Network Security",
          "OWASP",
          "Linux",
          "Security",
          "Vulnerability Assessment",
          "Penetration Testing",
          "Cyber Awareness",
          "Google Meet",
          "Online Webinar",
          "OrigoHOST",
        ],
        badges: [
          "Knowledge Sharing Series",
          "Episode 03",
          "Upcoming",
          "Free",
          "Limited Seats",
          "Certificate",
          "Online",
        ],
      },
    })
    .select()
    .single();

  if (eventErr) {
    console.error("Error inserting event:", eventErr);
    return;
  }
  console.log("Event inserted:", event.id);

  let speakerId = "323e4567-e89b-12d3-a456-426614174001"; // UUID
  const { error: speakerErr } = await supabase.from("speakers").upsert({
    id: speakerId,
    name: "Ms. Mukta Motwani",
    designation: "Software Engineering Student",
    organization: "VIT Vellore",
    bio: "Mukta Motwani is a cybersecurity enthusiast focused on ethical hacking, digital security, secure development practices, vulnerability awareness, and cybersecurity education. She enjoys helping students understand cybersecurity from both practical and responsible perspectives.",
  });
  if (speakerErr) console.error("Error speaker:", speakerErr);

  const { error: esErr } = await supabase.from("event_speakers").upsert({
    event_id: eventId,
    speaker_id: speakerId,
    session_title: "Cybersecurity Enthusiast & Practitioner",
    speaking_time: "12:00 PM",
  });
  if (esErr) console.error("Error event_speakers:", esErr);

  const orgId = "123e4567-e89b-12d3-a456-426614174002"; // OrigoHOST
  const { error: orgErr } = await supabase.from("event_organizers").upsert({
    id: orgId,
    event_id: eventId,
    name: "OrigoHOST",
    role: "Organizer",
  });
  if (orgErr) console.error("Error org:", orgErr);

  const { error: galErr } = await supabase.from("event_gallery").upsert({
    id: "323e4567-e89b-12d3-a456-426614174003",
    event_id: eventId,
    image_url: "/assets/events/kss2026ep03-poster.jpg",
    caption: "Cybersecurity Fundamentals Webinar Poster",
  });
  if (galErr) console.error("Error gallery:", galErr);

  console.log("Database seeded successfully!");
}
seed();
