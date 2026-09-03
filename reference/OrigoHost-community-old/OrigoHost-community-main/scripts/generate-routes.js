import fs from "fs";
import path from "path";

const WORKSPACES = {
  Operations: [
    "Users",
    "Students",
    "Organizations",
    "Recruiters",
    "Mentors",
    "Volunteers",
    "Speakers",
    "Admins",
    "Roles",
    "Permissions",
    "Registration Management",
    "Verification Center",
    "Activity Timeline",
    "Sessions",
    "Device Manager",
    "Audit Logs",
    "Recycle Bin",
  ],
  Community: [
    "Community Members",
    "Groups",
    "Communities",
    "Forums",
    "Discussions",
    "Mentorship",
    "Campus Ambassador",
    "Leaderboard",
    "Achievements",
    "Badges",
    "Certificates",
    "Volunteer Management",
    "Announcements",
    "Community Analytics",
  ],
  Content: [
    "CMS",
    "Homepage",
    "Landing Pages",
    "Page Builder",
    "Blog",
    "Categories",
    "Authors",
    "Gallery",
    "Media Library",
    "Videos",
    "Resources",
    "Testimonials",
    "FAQs",
    "Menus",
    "Footer",
    "Navigation",
    "Forms Builder",
    "Popup Builder",
    "Banner Manager",
  ],
  Events: [
    "Events",
    "Categories",
    "Schedules",
    "Venues",
    "Speakers",
    "Sponsors",
    "Partners",
    "Registration",
    "Attendance",
    "QR Check-in",
    "QR Tickets",
    "Certificates",
    "Feedback",
    "Reviews",
    "Event Gallery",
    "Livestream",
    "Calendar",
    "Reports",
  ],
  Recruitment: [
    "Jobs",
    "Companies",
    "Applications",
    "Interview Pipeline",
    "Resume Database",
    "Resume Screening",
    "Offer Letters",
    "Rejected",
    "Analytics",
    "Reports",
  ],
  Marketing: [
    "Newsletter",
    "Subscribers",
    "Campaigns",
    "Email Templates",
    "Announcement Center",
    "Notifications",
    "Popup Campaigns",
    "SEO Manager",
    "Social Posts",
    "Referral Program",
    "Coupon Manager",
  ],
  Analytics: [
    "Dashboard",
    "Users",
    "Traffic",
    "Events",
    "Jobs",
    "Organizations",
    "Countries",
    "Cities",
    "Devices",
    "Browsers",
    "Conversions",
    "Funnels",
    "Retention",
    "Reports",
    "Heatmaps",
    "Realtime",
    "Exports",
  ],
  AiCenter: [
    "AI Dashboard",
    "AI Search",
    "AI Chatbot",
    "AI Career Advisor",
    "AI Resume Review",
    "AI Analytics",
    "AI Content Generator",
    "AI Moderation",
    "Prompt Library",
    "Prompt Templates",
    "AI Logs",
    "Token Usage",
    "AI Settings",
  ],
  Finance: [
    "Payments",
    "Invoices",
    "Transactions",
    "Refunds",
    "Subscriptions",
    "Revenue",
    "Sponsors",
    "Donations",
    "Taxes",
    "Reports",
  ],
  System: [
    "Settings",
    "Branding",
    "Logo",
    "Theme",
    "Email",
    "SMTP",
    "Domains",
    "Storage",
    "Localization",
    "Timezone",
    "Maintenance",
    "Feature Flags",
    "Security",
    "Backups",
    "Restore",
    "System Health",
    "Integrations",
  ],
  Developer: [
    "API Explorer",
    "API Keys",
    "Webhook Manager",
    "Webhook Logs",
    "SQL Explorer",
    "Database Browser",
    "Storage Browser",
    "Cron Jobs",
    "Queue Manager",
    "Error Logs",
    "Activity Logs",
    "Deployment Logs",
    "Environment Variables",
    "Feature Flags",
    "Developer Tools",
  ],
  Personal: [
    "My Profile",
    "Appearance",
    "Preferences",
    "Notifications",
    "Connected Accounts",
    "API Tokens",
    "Sessions",
    "Security",
    "Help",
    "Feedback",
  ],
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const routesDir = path.join(process.cwd(), "src", "routes");

let generatedCount = 0;
let skippedCount = 0;

for (const [workspace, modules] of Object.entries(WORKSPACES)) {
  for (const mod of modules) {
    const slug = slugify(mod);

    // Skip if it conflicts with existing custom routes we built
    const existingFileNames = [
      `admin.${slug}.tsx`,
      `admin.${slug}/index.tsx`,
      `admin.${slug.replace(/s$/, "")}.tsx`, // Try singular if plural
    ];

    let exists = false;
    for (const f of existingFileNames) {
      if (fs.existsSync(path.join(routesDir, f))) {
        exists = true;
        break;
      }
    }

    // Specifically protect our core routes
    const protectedSlugs = [
      "users",
      "audit",
      "settings",
      "newsletter",
      "seo",
      "jobs",
      "events",
      "pages",
      "certificates",
      "partners",
      "testimonials",
      "messages",
      "gallery",
      "blog",
      "faq",
      "navigation",
      "job-applications",
      "event-registrations",
    ];
    if (protectedSlugs.includes(slug)) {
      exists = true;
    }

    if (exists) {
      skippedCount++;
      continue;
    }

    // Determine the route structure.
    // To avoid dumping 100 files into root /admin/, we will put them under /admin/$workspace/$module
    // Wait, the user prompt implies they are all just workspace navigation.
    // Putting them in `admin.${workspaceSlug}.${slug}.tsx` creates nested routes.

    const workspaceSlug = slugify(workspace);
    const fileName = `admin.${workspaceSlug}.${slug}.tsx`;
    const filePath = path.join(routesDir, fileName);

    const componentName = `Admin${workspace}${slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")}Page`;

    const content = `import { buildSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderModule } from "@/components/admin/placeholder-module";

export const Route = createFileRoute("/admin/${workspaceSlug}/${slug}")({
  head: () =>
    buildSeo({
      title: "Admin — ${mod}",
      description: "Manage ${mod}",
      path: "/admin/${workspaceSlug}/${slug}",
      noindex: true,
    }),
  component: ${componentName},
});

function ${componentName}() {
  return (
    <PlaceholderModule 
      workspace="${workspace}" 
      moduleName="${mod}" 
    />
  );
}
`;

    fs.writeFileSync(filePath, content, "utf-8");
    generatedCount++;
  }
}

console.log(
  `Successfully generated ${generatedCount} placeholder routes. Skipped ${skippedCount} existing routes.`,
);
