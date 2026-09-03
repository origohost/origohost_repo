import { describe, it, expect } from "vitest";
import { foundersContent } from "./founders";

describe("foundersContent.profiles — CMS snapshot", () => {
  it("matches the recorded structure and copy", () => {
    // Serialize deterministically so field ordering doesn't flake the snapshot.
    const founders = foundersContent.profiles.map((f: any) => ({
      name: f.name,
      role: f.role,
      badge: f.badge,
      avatarUrl: f.avatarUrl,
      quote: f.quote,
      bio: f.biography,
      links: f.links?.map((l: any) => ({ label: l.label, href: l.href, icon: l.icon })),
    }));

    expect(founders).toMatchInlineSnapshot(`
      [
        {
          "avatarUrl": "/tarun-kumar.png",
          "badge": "Co-Founder",
          "bio": "Tarun Kumar is a visionary AI Engineer, entrepreneur, researcher, and community leader passionate about building intelligent software and AI-powered solutions. Tarun is committed to driving innovation, empowering developers, and creating technology that delivers real-world impact. His work bridges the gap between academic research and enterprise-scale production systems. With a strong track record of spearheading national-level tech initiatives, he continuously works toward democratizing access to high-tier technology education in India.",
          "links": [
            {
              "href": "https://www.linkedin.com/in/iamtarunchaudhary",
              "icon": "Linkedin",
              "label": "LinkedIn",
            },
            {
              "href": "https://www.instagram.com/tarunsinghchdhry",
              "icon": "InstagramIcon",
              "label": "Instagram",
            },
            {
              "href": "mailto:tarunsinghchaudharyy@gmail.com",
              "icon": "Mail",
              "label": "Email",
            },
          ],
          "name": "Tarun Kumar",
          "quote": "Every great innovation begins with a single idea — but true impact is created when passionate people come together to learn, collaborate, and build.",
          "role": "Co-Founder",
        },
        {
          "avatarUrl": "/ritik-kumar.jpg",
          "badge": "Founder",
          "bio": "Ritik Kumar is a technology entrepreneur, AI engineer, and community leader serving as the Founder & Community Director of OrigoHOST Community, one of India's emerging technology and developer communities focused on empowering students, developers, founders, and innovators.

      He is responsible for leading OrigoHOST's community growth, digital strategy, technology initiatives, workshops, hackathons, mentorship programs, and ecosystem partnerships. His vision is to create a platform where learning extends beyond classrooms and every member gets opportunities to build real-world projects, collaborate with industry experts, and accelerate their careers.

      Alongside OrigoHOST, Ritik officially founded Binarize Technologies Pvt. Ltd. and serves as its Founder & CEO. Ritik focuses on AI-powered software, cloud platforms, scalable web applications, and digital transformation solutions. He also serves as the Director at Yennick Pharma Pvt. Ltd., leading enterprise digital initiatives and technology modernization.

      With expertise across Artificial Intelligence, Full-Stack Development, Cloud Computing, DevOps, Product Engineering, and Community Building, Ritik combines technical excellence with entrepreneurial thinking to create impactful technology ecosystems.",
          "links": [
            {
              "href": "https://ritik-portfolio-coral.vercel.app/",
              "icon": "Globe",
              "label": "Portfolio",
            },
            {
              "href": "https://www.linkedin.com/in/codewithritik19/",
              "icon": "Linkedin",
              "label": "LinkedIn",
            },
            {
              "href": "https://github.com/codewithritik19",
              "icon": "Github",
              "label": "GitHub",
            },
          ],
          "name": "Ritik Kumar",
          "quote": "Ritik believes that technology becomes truly valuable when knowledge is openly shared and communities grow together. His leadership philosophy emphasizes innovation, collaboration, transparency, continuous learning, and building ecosystems where developers can transform ideas into impactful solutions.",
          "role": "Founder & Community Director",
        },
        {
          "avatarUrl": "/brajesh-kumar.jpg",
          "badge": "Community Manager",
          "bio": "Brajesh Kumar is a dynamic Community Manager and DevRel advocate, currently leading community growth and engagement at the OrigoHOST Community. Driven by a passion for technology and education, Brajesh specializes in architecting inclusive developer ecosystems that empower students, professionals, and startups.

      With deep technical expertise spanning AI, Cloud Infrastructure, and Full Stack development, Brajesh brings authentic engineering insight to his community leadership. He has a proven track record of orchestrating high-impact technical events, including hackathons, hands-on workshops, and large-scale developer meetups.",
          "links": [],
          "name": "Brajesh Kumar",
          "quote": "Brajesh believes in empowering the next generation of builders. He creates environments where students, developers, and startups can thrive collaboratively.",
          "role": "Community Manager",
        },
      ]
    `);
  });

  it("enforces required fields on every founder", () => {
    for (const f of foundersContent.profiles) {
      expect(f.name, "name").toMatch(/\S/);
      expect(f.role, "role").toMatch(/\S/);
      expect(f.biography, `bio for ${f.name}`).toBeTruthy();
      expect(f.quote, `quote for ${f.name}`).toBeTruthy();
      expect(f.avatarUrl, `avatarUrl for ${f.name}`).toBeTruthy();
      expect(f.links?.length ?? 0, `links for ${f.name}`).toBeGreaterThan(0);
      for (const link of f.links ?? []) {
        expect(link.href, `link ${link.label}`).toMatch(/^(https?:|mailto:|#|\/)/);
      }
    }
  });
});
