/**
 * Module Schema Registry
 * ───────────────────────────────────────────────────
 * Maps every generic admin module (workspace/moduleName) to a structured
 * list of field definitions. The DynamicForm component uses this registry
 * to auto-generate proper form controls instead of raw JSON editors.
 *
 * Field types map to UI components:
 *   text       → Input
 *   textarea   → Textarea
 *   number     → Input[number]
 *   boolean    → Switch/Toggle
 *   select     → Select dropdown
 *   email      → Input[email]
 *   url        → Input[url]
 *   phone      → Input[tel]
 *   datetime   → DateTimePicker
 *   date       → DatePicker
 *   tags       → Tag input (comma-separated)
 *   image      → Image URL input with preview
 *   color      → Color picker
 *   slug       → Auto-generated slug
 *   status     → Badge selector
 *   json       → Developer-only JSON editor (hidden by default)
 */

export type SchemaFieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "email"
  | "url"
  | "phone"
  | "datetime"
  | "date"
  | "tags"
  | "image"
  | "color"
  | "slug"
  | "status"
  | "json";

export interface SchemaField {
  key: string;
  label: string;
  type: SchemaFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: unknown;
  group?: string; // for grouping fields into sections
  description?: string;
}

export interface ModuleSchema {
  fields: SchemaField[];
  listColumns: string[]; // keys to show in the data table
  singular: string;
  plural: string;
  icon?: string;
}

// ─────────────────────────────────────────────
// OPERATIONS WORKSPACE
// ─────────────────────────────────────────────

const operationsStudents: ModuleSchema = {
  singular: "Student",
  plural: "Students",
  listColumns: ["name", "email", "university", "status"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
    {
      key: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "john@example.com",
    },
    { key: "phone", label: "Phone", type: "phone", placeholder: "+91 9876543210" },
    { key: "university", label: "University", type: "text", placeholder: "MIT" },
    { key: "degree", label: "Degree", type: "text", placeholder: "B.Tech Computer Science" },
    {
      key: "year",
      label: "Year",
      type: "select",
      options: ["1st", "2nd", "3rd", "4th", "5th", "Alumni"],
    },
    { key: "skills", label: "Skills", type: "tags", placeholder: "React, Node.js, Python" },
    { key: "bio", label: "Bio", type: "textarea", placeholder: "A brief description..." },
    { key: "avatar_url", label: "Avatar", type: "image" },
    {
      key: "linkedin_url",
      label: "LinkedIn",
      type: "url",
      placeholder: "https://linkedin.com/in/...",
    },
    { key: "github_url", label: "GitHub", type: "url", placeholder: "https://github.com/..." },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "suspended", "graduated"],
      defaultValue: "active",
    },
  ],
};

const operationsRecruiters: ModuleSchema = {
  singular: "Recruiter",
  plural: "Recruiters",
  listColumns: ["name", "company", "email", "status"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "company", label: "Company", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "phone" },
    { key: "designation", label: "Designation", type: "text", placeholder: "HR Manager" },
    { key: "industry", label: "Industry", type: "text" },
    { key: "linkedin_url", label: "LinkedIn", type: "url" },
    { key: "website", label: "Website", type: "url" },
    { key: "logo_url", label: "Company Logo", type: "image" },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "blocked"],
      defaultValue: "active",
    },
  ],
};

const operationsMentors: ModuleSchema = {
  singular: "Mentor",
  plural: "Mentors",
  listColumns: ["name", "expertise", "email", "status"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "phone" },
    { key: "expertise", label: "Expertise", type: "tags", placeholder: "AI, Cloud, DevOps" },
    { key: "bio", label: "Bio", type: "textarea" },
    { key: "avatar_url", label: "Avatar", type: "image" },
    { key: "linkedin_url", label: "LinkedIn", type: "url" },
    { key: "experience_years", label: "Years of Experience", type: "number" },
    { key: "company", label: "Company", type: "text" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "on_leave"],
      defaultValue: "active",
    },
  ],
};

const operationsVolunteers: ModuleSchema = {
  singular: "Volunteer",
  plural: "Volunteers",
  listColumns: ["name", "email", "role", "status"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "phone" },
    {
      key: "role",
      label: "Role",
      type: "select",
      options: [
        "Event Coordinator",
        "Technical Lead",
        "Logistics",
        "Marketing",
        "Design",
        "Content",
        "Other",
      ],
    },
    {
      key: "availability",
      label: "Availability",
      type: "select",
      options: ["Full-time", "Part-time", "Weekends", "On-call"],
    },
    { key: "skills", label: "Skills", type: "tags" },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "on_leave"],
      defaultValue: "active",
    },
  ],
};

const operationsSpeakers: ModuleSchema = {
  singular: "Speaker",
  plural: "Speakers",
  listColumns: ["name", "topic", "company", "status"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "phone" },
    { key: "topic", label: "Topic / Specialization", type: "text", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "designation", label: "Designation", type: "text" },
    { key: "bio", label: "Biography", type: "textarea" },
    { key: "avatar_url", label: "Photo URL", type: "image" },
    { key: "linkedin_url", label: "LinkedIn", type: "url" },
    { key: "twitter_url", label: "Twitter/X", type: "url" },
    { key: "github_url", label: "GitHub", type: "url" },
    { key: "portfolio_url", label: "Portfolio", type: "url" },
    { key: "instagram_url", label: "Instagram", type: "url" },
    { key: "speaker_statistics", label: "Speaker Statistics", type: "textarea" },
    { key: "sessions_delivered", label: "Sessions Delivered", type: "number", defaultValue: 0 },
    { key: "upcoming_sessions", label: "Upcoming Sessions", type: "number", defaultValue: 0 },
    { key: "past_sessions", label: "Past Sessions", type: "number", defaultValue: 0 },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["confirmed", "tentative", "cancelled"],
      defaultValue: "confirmed",
    },
  ],
};

const operationsAdmins: ModuleSchema = {
  singular: "Admin",
  plural: "Admins",
  listColumns: ["name", "email", "role", "status"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    {
      key: "role",
      label: "Admin Role",
      type: "select",
      options: ["admin", "super_admin", "moderator", "editor"],
      required: true,
    },
    { key: "department", label: "Department", type: "text" },
    { key: "avatar_url", label: "Avatar", type: "image" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "suspended"],
      defaultValue: "active",
    },
  ],
};

const operationsRoles: ModuleSchema = {
  singular: "Role",
  plural: "Roles",
  listColumns: ["name", "description", "permissions_count"],
  fields: [
    {
      key: "name",
      label: "Role Name",
      type: "text",
      required: true,
      placeholder: "content_editor",
    },
    {
      key: "display_name",
      label: "Display Name",
      type: "text",
      required: true,
      placeholder: "Content Editor",
    },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "permissions",
      label: "Permissions",
      type: "tags",
      placeholder: "read, write, delete, publish",
    },
    { key: "permissions_count", label: "# Permissions", type: "number" },
    { key: "is_system", label: "System Role", type: "boolean" },
  ],
};

const operationsPermissions: ModuleSchema = {
  singular: "Permission",
  plural: "Permissions",
  listColumns: ["name", "resource", "action"],
  fields: [
    {
      key: "name",
      label: "Permission Key",
      type: "text",
      required: true,
      placeholder: "events.create",
    },
    { key: "resource", label: "Resource", type: "text", required: true, placeholder: "events" },
    {
      key: "action",
      label: "Action",
      type: "select",
      options: ["create", "read", "update", "delete", "publish", "manage"],
      required: true,
    },
    { key: "description", label: "Description", type: "textarea" },
  ],
};

const operationsRegistrationMgmt: ModuleSchema = {
  singular: "Registration",
  plural: "Registrations",
  listColumns: ["name", "email", "event_name", "status", "payment_status"],
  fields: [
    { key: "name", label: "Participant Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "phone" },
    { key: "event_name", label: "Event", type: "text" },
    {
      key: "ticket_type",
      label: "Ticket Type",
      type: "select",
      options: ["Free", "Paid", "VIP", "Early Bird"],
    },
    {
      key: "attendance_status",
      label: "Attendance Status",
      type: "select",
      options: ["Pending", "Checked In", "No Show"],
    },
    {
      key: "payment_status",
      label: "Payment Status",
      type: "select",
      options: ["Pending", "Paid", "Failed", "Refunded"],
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["confirmed", "pending", "cancelled", "waitlisted", "approved", "rejected"],
      defaultValue: "pending",
    },
    { key: "registered_at", label: "Registered At", type: "datetime" },
  ],
};

const operationsVerificationCenter: ModuleSchema = {
  singular: "Verification Request",
  plural: "Verification Requests",
  listColumns: ["entity_name", "entity_type", "status"],
  fields: [
    { key: "entity_name", label: "Entity Name", type: "text", required: true },
    {
      key: "entity_type",
      label: "Entity Type",
      type: "select",
      options: ["Organization", "Student", "Recruiter", "Mentor", "Speaker"],
      required: true,
    },
    { key: "email", label: "Email", type: "email" },
    { key: "document_url", label: "Document URL", type: "url" },
    { key: "notes", label: "Review Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["pending", "verified", "rejected"],
      defaultValue: "pending",
    },
    { key: "reviewed_at", label: "Reviewed At", type: "datetime" },
  ],
};

const operationsActivityTimeline: ModuleSchema = {
  singular: "Activity",
  plural: "Activities",
  listColumns: ["actor", "action", "entity", "created_at"],
  fields: [
    { key: "actor", label: "Actor", type: "text", required: true },
    { key: "action", label: "Action", type: "text", required: true },
    { key: "entity", label: "Entity", type: "text" },
    { key: "entity_id", label: "Entity ID", type: "text" },
    { key: "details", label: "Details", type: "textarea" },
    { key: "ip_address", label: "IP Address", type: "text" },
    { key: "created_at", label: "Timestamp", type: "datetime" },
  ],
};

const operationsSessions: ModuleSchema = {
  singular: "Session",
  plural: "Sessions",
  listColumns: ["user_email", "device", "ip_address", "last_active"],
  fields: [
    { key: "user_email", label: "User Email", type: "email" },
    { key: "device", label: "Device", type: "text" },
    { key: "browser", label: "Browser", type: "text" },
    { key: "ip_address", label: "IP Address", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "last_active", label: "Last Active", type: "datetime" },
    { key: "is_current", label: "Current Session", type: "boolean" },
  ],
};

const operationsDeviceManager: ModuleSchema = {
  singular: "Device",
  plural: "Devices",
  listColumns: ["device_name", "type", "assigned_to", "status"],
  fields: [
    { key: "device_name", label: "Device Name", type: "text", required: true },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: [
        "Laptop",
        "Desktop",
        "Tablet",
        "Phone",
        "Projector",
        "Camera",
        "Microphone",
        "Other",
      ],
      required: true,
    },
    { key: "serial_number", label: "Serial Number", type: "text" },
    { key: "assigned_to", label: "Assigned To", type: "text" },
    {
      key: "condition",
      label: "Condition",
      type: "select",
      options: ["New", "Good", "Fair", "Needs Repair", "Retired"],
    },
    { key: "purchase_date", label: "Purchase Date", type: "date" },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "in_repair", "retired"],
      defaultValue: "active",
    },
  ],
};

const operationsRecycleBin: ModuleSchema = {
  singular: "Deleted Item",
  plural: "Deleted Items",
  listColumns: ["item_name", "item_type", "deleted_by", "deleted_at"],
  fields: [
    { key: "item_name", label: "Item Name", type: "text" },
    { key: "item_type", label: "Item Type", type: "text" },
    { key: "deleted_by", label: "Deleted By", type: "text" },
    { key: "deleted_at", label: "Deleted At", type: "datetime" },
    { key: "original_data", label: "Original Data", type: "json" },
  ],
};

// ─────────────────────────────────────────────
// COMMUNITY WORKSPACE
// ─────────────────────────────────────────────

const communityMembers: ModuleSchema = {
  singular: "Member",
  plural: "Members",
  listColumns: ["name", "email", "role", "joined_at"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    {
      key: "role",
      label: "Community Role",
      type: "select",
      options: ["Member", "Moderator", "Lead", "Mentor", "Alumni"],
    },
    { key: "bio", label: "Bio", type: "textarea" },
    { key: "avatar_url", label: "Avatar", type: "image" },
    { key: "joined_at", label: "Joined At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "banned"],
      defaultValue: "active",
    },
  ],
};

const communityGroups: ModuleSchema = {
  singular: "Group",
  plural: "Groups",
  listColumns: ["name", "category", "members_count", "status"],
  fields: [
    { key: "name", label: "Group Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["Tech", "Design", "Business", "Creative", "Social", "Academic", "Other"],
    },
    { key: "image_url", label: "Cover Image", type: "image" },
    { key: "members_count", label: "Members", type: "number", defaultValue: 0 },
    { key: "is_private", label: "Private Group", type: "boolean" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "archived"],
      defaultValue: "active",
    },
  ],
};

const communityCommunities: ModuleSchema = {
  singular: "Community",
  plural: "Communities",
  listColumns: ["name", "type", "members_count", "status"],
  fields: [
    { key: "name", label: "Community Name", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Open Source", "Study Group", "Professional", "Hobby", "Regional"],
    },
    { key: "image_url", label: "Logo", type: "image" },
    { key: "members_count", label: "Members", type: "number", defaultValue: 0 },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "archived"],
      defaultValue: "active",
    },
  ],
};

const communityForums: ModuleSchema = {
  singular: "Forum",
  plural: "Forums",
  listColumns: ["title", "category", "posts_count", "status"],
  fields: [
    { key: "title", label: "Forum Title", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["General", "Technical", "Q&A", "Showcase", "Jobs", "Events", "Off-topic"],
    },
    { key: "posts_count", label: "Posts", type: "number", defaultValue: 0 },
    { key: "is_pinned", label: "Pinned", type: "boolean" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "locked", "archived"],
      defaultValue: "active",
    },
  ],
};

const communityDiscussions: ModuleSchema = {
  singular: "Discussion",
  plural: "Discussions",
  listColumns: ["title", "author", "replies_count", "status"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "content", label: "Content", type: "textarea", required: true },
    { key: "author", label: "Author", type: "text" },
    { key: "forum", label: "Forum", type: "text" },
    { key: "tags", label: "Tags", type: "tags" },
    { key: "replies_count", label: "Replies", type: "number", defaultValue: 0 },
    { key: "is_pinned", label: "Pinned", type: "boolean" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["open", "closed", "resolved"],
      defaultValue: "open",
    },
  ],
};

const communityMentorship: ModuleSchema = {
  singular: "Mentorship Pair",
  plural: "Mentorship Pairs",
  listColumns: ["mentor_name", "mentee_name", "topic", "status"],
  fields: [
    { key: "mentor_name", label: "Mentor", type: "text", required: true },
    { key: "mentee_name", label: "Mentee", type: "text", required: true },
    { key: "topic", label: "Topic / Focus Area", type: "text" },
    { key: "start_date", label: "Start Date", type: "date" },
    { key: "end_date", label: "End Date", type: "date" },
    { key: "sessions_completed", label: "Sessions Completed", type: "number", defaultValue: 0 },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "completed", "paused", "cancelled"],
      defaultValue: "active",
    },
  ],
};

const communityLeaderboard: ModuleSchema = {
  singular: "Leaderboard Entry",
  plural: "Leaderboard",
  listColumns: ["rank", "name", "points", "level"],
  fields: [
    { key: "rank", label: "Rank", type: "number", required: true },
    { key: "name", label: "Member Name", type: "text", required: true },
    { key: "points", label: "Points", type: "number", required: true },
    {
      key: "level",
      label: "Level",
      type: "select",
      options: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
    },
    { key: "badges_count", label: "Badges", type: "number", defaultValue: 0 },
    { key: "contributions", label: "Contributions", type: "number", defaultValue: 0 },
  ],
};

const communityAchievements: ModuleSchema = {
  singular: "Achievement",
  plural: "Achievements",
  listColumns: ["title", "category", "points", "status"],
  fields: [
    { key: "title", label: "Achievement Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["Events", "Community", "Learning", "Mentorship", "Special"],
    },
    { key: "icon_url", label: "Icon", type: "image" },
    { key: "points", label: "Points", type: "number", defaultValue: 10 },
    { key: "criteria", label: "Unlock Criteria", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "retired"],
      defaultValue: "active",
    },
  ],
};

const communityBadges: ModuleSchema = {
  singular: "Badge",
  plural: "Badges",
  listColumns: ["name", "tier", "awarded_count"],
  fields: [
    { key: "name", label: "Badge Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "icon_url", label: "Badge Icon", type: "image" },
    {
      key: "tier",
      label: "Tier",
      type: "select",
      options: ["Common", "Rare", "Epic", "Legendary"],
    },
    { key: "color", label: "Color", type: "color" },
    { key: "awarded_count", label: "Times Awarded", type: "number", defaultValue: 0 },
    { key: "is_active", label: "Active", type: "boolean", defaultValue: true },
  ],
};

const communityVolunteerMgmt: ModuleSchema = {
  singular: "Volunteer Record",
  plural: "Volunteer Records",
  listColumns: ["name", "event_name", "hours", "status"],
  fields: [
    { key: "name", label: "Volunteer Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email" },
    { key: "event_name", label: "Event", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "hours", label: "Hours Contributed", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "completed", "no_show"],
      defaultValue: "active",
    },
  ],
};

const communityAnnouncements: ModuleSchema = {
  singular: "Announcement",
  plural: "Announcements",
  listColumns: ["title", "audience", "published", "created_at"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "content", label: "Content", type: "textarea", required: true },
    {
      key: "audience",
      label: "Target Audience",
      type: "select",
      options: ["All", "Students", "Organizations", "Recruiters", "Mentors"],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      options: ["low", "normal", "high", "urgent"],
    },
    { key: "image_url", label: "Image", type: "image" },
    { key: "published", label: "Published", type: "boolean", defaultValue: false },
    { key: "created_at", label: "Created At", type: "datetime" },
  ],
};

const communityAnalytics: ModuleSchema = {
  singular: "Analytics Entry",
  plural: "Community Analytics",
  listColumns: ["metric", "value", "period"],
  fields: [
    { key: "metric", label: "Metric", type: "text", required: true },
    { key: "value", label: "Value", type: "number", required: true },
    {
      key: "period",
      label: "Period",
      type: "select",
      options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
    },
    { key: "change_percent", label: "Change %", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" },
  ],
};

// ─────────────────────────────────────────────
// CONTENT WORKSPACE
// ─────────────────────────────────────────────

const contentCms: ModuleSchema = {
  singular: "CMS Entry",
  plural: "CMS Entries",
  listColumns: ["title", "slug", "type", "published"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    {
      key: "type",
      label: "Content Type",
      type: "select",
      options: ["page", "post", "snippet", "template"],
      required: true,
    },
    { key: "content", label: "Content", type: "textarea" },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "featured_image", label: "Featured Image", type: "image" },
    { key: "seo_title", label: "SEO Title", type: "text" },
    { key: "seo_description", label: "SEO Description", type: "textarea" },
    { key: "published", label: "Published", type: "boolean", defaultValue: false },
  ],
};

const contentHomepage: ModuleSchema = {
  singular: "Section",
  plural: "Homepage Sections",
  listColumns: ["section_name", "sort_order", "is_visible"],
  fields: [
    { key: "section_name", label: "Section Name", type: "text", required: true },
    { key: "heading", label: "Heading", type: "text" },
    { key: "subheading", label: "Subheading", type: "text" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "cta_text", label: "CTA Text", type: "text" },
    { key: "cta_url", label: "CTA Link", type: "url" },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
    { key: "is_visible", label: "Visible", type: "boolean", defaultValue: true },
  ],
};

const contentLandingPages: ModuleSchema = {
  singular: "Landing Page",
  plural: "Landing Pages",
  listColumns: ["title", "slug", "status"],
  fields: [
    { key: "title", label: "Page Title", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "hero_title", label: "Hero Title", type: "text" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "text" },
    { key: "hero_image", label: "Hero Image", type: "image" },
    { key: "cta_text", label: "CTA Text", type: "text" },
    { key: "cta_url", label: "CTA URL", type: "url" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "published", "archived"],
      defaultValue: "draft",
    },
  ],
};

const contentPageBuilder: ModuleSchema = {
  singular: "Page",
  plural: "Pages",
  listColumns: ["title", "slug", "template", "status"],
  fields: [
    { key: "title", label: "Page Title", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    {
      key: "template",
      label: "Template",
      type: "select",
      options: ["Default", "Full Width", "Sidebar", "Landing", "Custom"],
    },
    { key: "content", label: "Content", type: "textarea" },
    { key: "seo_title", label: "SEO Title", type: "text" },
    { key: "seo_description", label: "SEO Description", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "published", "archived"],
      defaultValue: "draft",
    },
  ],
};

const contentCategories: ModuleSchema = {
  singular: "Category",
  plural: "Categories",
  listColumns: ["name", "slug", "parent", "sort_order"],
  fields: [
    { key: "name", label: "Category Name", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "parent", label: "Parent Category", type: "text" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "color", label: "Color", type: "color" },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  ],
};

const contentAuthors: ModuleSchema = {
  singular: "Author",
  plural: "Authors",
  listColumns: ["name", "email", "posts_count"],
  fields: [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email" },
    { key: "bio", label: "Bio", type: "textarea" },
    { key: "avatar_url", label: "Avatar", type: "image" },
    { key: "website", label: "Website", type: "url" },
    {
      key: "social_links",
      label: "Social Links",
      type: "tags",
      placeholder: "twitter.com/..., linkedin.com/...",
    },
    { key: "posts_count", label: "Posts Count", type: "number", defaultValue: 0 },
  ],
};

const contentMediaLibrary: ModuleSchema = {
  singular: "Media",
  plural: "Media Library",
  listColumns: ["filename", "type", "size", "uploaded_at"],
  fields: [
    { key: "filename", label: "File Name", type: "text", required: true },
    { key: "url", label: "File URL", type: "url", required: true },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Image", "Video", "Document", "Audio", "Other"],
    },
    { key: "size", label: "Size (KB)", type: "number" },
    { key: "alt_text", label: "Alt Text", type: "text" },
    { key: "caption", label: "Caption", type: "textarea" },
    { key: "uploaded_at", label: "Uploaded At", type: "datetime" },
  ],
};

const contentVideos: ModuleSchema = {
  singular: "Video",
  plural: "Videos",
  listColumns: ["title", "platform", "duration", "published"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "url", label: "Video URL", type: "url", required: true },
    {
      key: "platform",
      label: "Platform",
      type: "select",
      options: ["YouTube", "Vimeo", "Self-hosted", "Other"],
    },
    { key: "thumbnail_url", label: "Thumbnail", type: "image" },
    { key: "duration", label: "Duration", type: "text", placeholder: "10:30" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "published", label: "Published", type: "boolean", defaultValue: true },
  ],
};

const contentResources: ModuleSchema = {
  singular: "Resource",
  plural: "Resources",
  listColumns: ["title", "type", "category", "downloads"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["PDF", "Slide Deck", "Template", "Cheat Sheet", "eBook", "Worksheet", "Other"],
    },
    { key: "category", label: "Category", type: "text" },
    { key: "file_url", label: "File URL", type: "url", required: true },
    { key: "thumbnail_url", label: "Thumbnail", type: "image" },
    { key: "downloads", label: "Downloads", type: "number", defaultValue: 0 },
    { key: "published", label: "Published", type: "boolean", defaultValue: true },
  ],
};

const contentMenus: ModuleSchema = {
  singular: "Menu Item",
  plural: "Menu Items",
  listColumns: ["label", "href", "parent", "sort_order"],
  fields: [
    { key: "label", label: "Label", type: "text", required: true },
    { key: "href", label: "Link", type: "url", required: true },
    { key: "parent", label: "Parent Menu", type: "text" },
    { key: "is_external", label: "External Link", type: "boolean" },
    { key: "icon", label: "Icon Name", type: "text" },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
    { key: "is_visible", label: "Visible", type: "boolean", defaultValue: true },
  ],
};

const contentFooter: ModuleSchema = {
  singular: "Footer Link",
  plural: "Footer Links",
  listColumns: ["label", "href", "section", "sort_order"],
  fields: [
    { key: "label", label: "Label", type: "text", required: true },
    { key: "href", label: "Link", type: "url", required: true },
    {
      key: "section",
      label: "Section",
      type: "select",
      options: ["Company", "Resources", "Legal", "Social"],
    },
    { key: "is_external", label: "External Link", type: "boolean" },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  ],
};

const contentFormsBuilder: ModuleSchema = {
  singular: "Form",
  plural: "Forms",
  listColumns: ["name", "submissions_count", "status"],
  fields: [
    { key: "name", label: "Form Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "fields_config", label: "Fields Configuration", type: "json" },
    { key: "redirect_url", label: "Redirect URL", type: "url" },
    { key: "notification_email", label: "Notification Email", type: "email" },
    { key: "submissions_count", label: "Submissions", type: "number", defaultValue: 0 },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive"],
      defaultValue: "active",
    },
  ],
};

const contentPopupBuilder: ModuleSchema = {
  singular: "Popup",
  plural: "Popups",
  listColumns: ["title", "trigger", "status"],
  fields: [
    { key: "title", label: "Popup Title", type: "text", required: true },
    { key: "content", label: "Content", type: "textarea" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "cta_text", label: "CTA Text", type: "text" },
    { key: "cta_url", label: "CTA URL", type: "url" },
    {
      key: "trigger",
      label: "Trigger",
      type: "select",
      options: ["On Load", "Exit Intent", "Scroll %", "Time Delay", "Manual"],
    },
    { key: "delay_seconds", label: "Delay (s)", type: "number" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "scheduled"],
      defaultValue: "inactive",
    },
  ],
};

const contentBannerManager: ModuleSchema = {
  singular: "Banner",
  plural: "Banners",
  listColumns: ["title", "position", "is_active"],
  fields: [
    { key: "title", label: "Banner Title", type: "text", required: true },
    { key: "content", label: "Content / Message", type: "textarea" },
    { key: "image_url", label: "Banner Image", type: "image" },
    { key: "link_url", label: "Link URL", type: "url" },
    {
      key: "position",
      label: "Position",
      type: "select",
      options: ["Top Bar", "Hero", "Sidebar", "Footer", "Modal"],
    },
    { key: "bg_color", label: "Background Color", type: "color" },
    { key: "text_color", label: "Text Color", type: "color" },
    { key: "start_date", label: "Start Date", type: "datetime" },
    { key: "end_date", label: "End Date", type: "datetime" },
    { key: "is_active", label: "Active", type: "boolean", defaultValue: true },
  ],
};

// ─────────────────────────────────────────────
// EVENTS WORKSPACE (Generic sub-modules)
// ─────────────────────────────────────────────

const eventsCategories: ModuleSchema = {
  singular: "Event Category",
  plural: "Event Categories",
  listColumns: ["name", "slug", "events_count"],
  fields: [
    { key: "name", label: "Category Name", type: "text", required: true },
    { key: "slug", label: "Slug", type: "slug" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "color", label: "Color", type: "color" },
    { key: "icon", label: "Icon Name", type: "text" },
    { key: "events_count", label: "Events", type: "number", defaultValue: 0 },
  ],
};

const eventsSchedules: ModuleSchema = {
  singular: "Schedule",
  plural: "Schedules",
  listColumns: ["event_name", "session_title", "start_time", "speaker"],
  fields: [
    { key: "event_name", label: "Event", type: "text", required: true },
    { key: "session_title", label: "Session Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "speaker", label: "Speaker", type: "text" },
    { key: "start_time", label: "Start Time", type: "datetime", required: true },
    { key: "end_time", label: "End Time", type: "datetime" },
    { key: "room", label: "Room / Venue", type: "text" },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Talk", "Workshop", "Panel", "Break", "Networking", "Keynote"],
    },
    { key: "timeline_details", label: "Timeline Details", type: "textarea" },
    { key: "agenda_topics", label: "Agenda Topics", type: "tags" },
  ],
};

const eventsVenues: ModuleSchema = {
  singular: "Venue",
  plural: "Venues",
  listColumns: ["name", "city", "capacity", "status"],
  fields: [
    { key: "name", label: "Venue Name", type: "text", required: true },
    { key: "address", label: "Address", type: "textarea" },
    { key: "city", label: "City", type: "text" },
    { key: "state", label: "State", type: "text" },
    { key: "country", label: "Country", type: "text" },
    { key: "capacity", label: "Capacity", type: "number" },
    { key: "contact_email", label: "Contact Email", type: "email" },
    { key: "contact_phone", label: "Contact Phone", type: "phone" },
    { key: "map_url", label: "Map URL", type: "url" },
    { key: "image_url", label: "Image", type: "image" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["available", "booked", "closed"],
      defaultValue: "available",
    },
  ],
};

const eventsSponsors: ModuleSchema = {
  singular: "Event Sponsor",
  plural: "Event Sponsors",
  listColumns: ["company_name", "tier", "event_name", "status"],
  fields: [
    { key: "company_name", label: "Company Name", type: "text", required: true },
    { key: "event_name", label: "Event", type: "text" },
    {
      key: "tier",
      label: "Sponsorship Tier",
      type: "select",
      options: ["Title", "Platinum", "Gold", "Silver", "Bronze", "Community"],
    },
    { key: "amount", label: "Amount (₹)", type: "number" },
    { key: "contact_name", label: "Contact Person", type: "text" },
    { key: "contact_email", label: "Contact Email", type: "email" },
    { key: "logo_url", label: "Logo", type: "image" },
    { key: "website", label: "Website", type: "url" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["confirmed", "pending", "cancelled"],
      defaultValue: "pending",
    },
  ],
};

const eventsAttendance: ModuleSchema = {
  singular: "Attendance Record",
  plural: "Attendance Records",
  listColumns: ["attendee_name", "event_name", "check_in_time", "status"],
  fields: [
    { key: "attendee_name", label: "Attendee Name", type: "text", required: true },
    { key: "attendee_email", label: "Email", type: "email" },
    { key: "event_name", label: "Event", type: "text" },
    { key: "check_in_time", label: "Check-in Time", type: "datetime" },
    { key: "check_out_time", label: "Check-out Time", type: "datetime" },
    {
      key: "method",
      label: "Check-in Method",
      type: "select",
      options: ["QR Code", "Manual", "NFC", "Badge Scan"],
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["checked_in", "checked_out", "no_show"],
      defaultValue: "checked_in",
    },
  ],
};

const eventsQrCheckin: ModuleSchema = {
  singular: "QR Check-in",
  plural: "QR Check-ins",
  listColumns: ["attendee_name", "event_name", "live_check_in", "scanned_at"],
  fields: [
    { key: "attendee_name", label: "Attendee", type: "text", required: true },
    { key: "attendee_email", label: "Email", type: "email" },
    { key: "event_name", label: "Event", type: "text" },
    { key: "qr_code", label: "QR Code", type: "text" },
    { key: "live_check_in", label: "Live Check-in Status", type: "boolean", defaultValue: true },
    { key: "check_in_statistics", label: "Statistics", type: "json" },
    { key: "scanned_at", label: "Scanned At", type: "datetime" },
    { key: "scanned_by", label: "Scanned By", type: "text" },
  ],
};

const eventsQrTickets: ModuleSchema = {
  singular: "Ticket",
  plural: "Tickets",
  listColumns: ["ticket_id", "attendee_name", "event_name", "status"],
  fields: [
    { key: "ticket_id", label: "Ticket ID", type: "text", required: true },
    { key: "attendee_name", label: "Attendee", type: "text", required: true },
    { key: "attendee_email", label: "Email", type: "email" },
    { key: "event_name", label: "Event", type: "text" },
    {
      key: "ticket_type",
      label: "Type",
      type: "select",
      options: ["General", "VIP", "Early Bird", "Student", "Speaker", "Sponsor"],
    },
    { key: "price", label: "Price (₹)", type: "number" },
    { key: "qr_url", label: "QR Code URL", type: "url" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "used", "cancelled", "expired"],
      defaultValue: "active",
    },
  ],
};

const eventsFeedback: ModuleSchema = {
  singular: "Feedback",
  plural: "Feedback",
  listColumns: ["attendee_name", "event_name", "event_rating", "speaker_rating"],
  fields: [
    { key: "attendee_name", label: "Attendee", type: "text" },
    { key: "attendee_email", label: "Email", type: "email" },
    { key: "event_name", label: "Event", type: "text" },
    { key: "rating", label: "Overall Rating (1-5)", type: "number" },
    { key: "event_rating", label: "Event Rating (1-5)", type: "number" },
    { key: "speaker_rating", label: "Speaker Rating (1-5)", type: "number" },
    { key: "feedback", label: "Feedback/Comments", type: "textarea" },
    { key: "suggestions", label: "Suggestions", type: "textarea" },
    { key: "would_recommend", label: "Would Recommend", type: "boolean" },
    { key: "created_at", label: "Submitted At", type: "datetime" },
  ],
};

const eventsReviews: ModuleSchema = {
  singular: "Review",
  plural: "Reviews",
  listColumns: ["reviewer_name", "event_name", "rating", "is_pinned", "status"],
  fields: [
    { key: "reviewer_name", label: "Reviewer", type: "text", required: true },
    { key: "event_name", label: "Event", type: "text" },
    { key: "rating", label: "Rating", type: "number" },
    { key: "title", label: "Review Title", type: "text" },
    { key: "content", label: "Review Content", type: "textarea" },
    { key: "is_verified", label: "Verified Attendee", type: "boolean" },
    { key: "is_pinned", label: "Pinned Review", type: "boolean" },
    { key: "is_spam", label: "Mark as Spam", type: "boolean" },
    {
      key: "status",
      label: "Moderation Status",
      type: "status",
      options: ["pending", "approved", "rejected", "spam"],
      defaultValue: "pending",
    },
  ],
};

const eventsGallery: ModuleSchema = {
  singular: "Event Media",
  plural: "Event Media",
  listColumns: ["title", "event_name", "media_type", "album_name"],
  fields: [
    { key: "title", label: "Title", type: "text" },
    {
      key: "media_type",
      label: "Media Type",
      type: "select",
      options: ["Image", "Video"],
      defaultValue: "Image",
    },
    { key: "image_url", label: "Image URL (if Image)", type: "image" },
    { key: "video_url", label: "Video URL (if Video)", type: "url" },
    { key: "album_name", label: "Album", type: "text" },
    { key: "event_name", label: "Event", type: "text" },
    { key: "photographer", label: "Credits / Photographer", type: "text" },
    { key: "caption", label: "Caption", type: "textarea" },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  ],
};

const eventsLivestream: ModuleSchema = {
  singular: "Livestream",
  plural: "Livestreams",
  listColumns: ["title", "platform", "event_name", "status"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "event_name", label: "Event", type: "text" },
    {
      key: "platform",
      label: "Platform",
      type: "select",
      options: ["YouTube", "Twitch", "Zoom", "Teams", "Custom"],
    },
    { key: "stream_url", label: "Stream URL", type: "url", required: true },
    { key: "embed_code", label: "Embed Code", type: "textarea" },
    { key: "scheduled_at", label: "Scheduled At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["scheduled", "live", "ended", "cancelled"],
      defaultValue: "scheduled",
    },
  ],
};

const eventsCalendar: ModuleSchema = {
  singular: "Calendar Event",
  plural: "Calendar Events",
  listColumns: ["title", "date", "type", "status"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "date", label: "Date", type: "datetime", required: true },
    { key: "end_date", label: "End Date", type: "datetime" },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Event", "Deadline", "Meeting", "Holiday", "Other"],
    },
    { key: "description", label: "Description", type: "textarea" },
    { key: "location", label: "Location", type: "text" },
    { key: "color", label: "Color", type: "color" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["upcoming", "ongoing", "completed", "cancelled"],
      defaultValue: "upcoming",
    },
  ],
};

const eventsCertificates: ModuleSchema = {
  singular: "Certificate",
  plural: "Certificates",
  listColumns: ["recipient_name", "event_name", "template", "status"],
  fields: [
    { key: "recipient_name", label: "Recipient Name", type: "text", required: true },
    { key: "recipient_email", label: "Recipient Email", type: "email" },
    { key: "event_name", label: "Event / Course", type: "text", required: true },
    { key: "template", label: "Certificate Template", type: "text" },
    { key: "issue_date", label: "Issue Date", type: "datetime" },
    { key: "download_url", label: "Download PDF URL", type: "url" },
    { key: "bulk_generate", label: "Bulk Generate Batch ID", type: "text" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["issued", "pending", "revoked"],
      defaultValue: "issued",
    },
  ],
};

const eventsReports: ModuleSchema = {
  singular: "Event Report",
  plural: "Event Reports",
  listColumns: ["event_name", "report_type", "created_at"],
  fields: [
    { key: "event_name", label: "Event", type: "text", required: true },
    {
      key: "report_type",
      label: "Report Type",
      type: "select",
      options: ["Attendance", "Revenue", "Feedback", "Sponsor ROI", "Summary"],
    },
    { key: "total_attendees", label: "Total Attendees", type: "number" },
    { key: "revenue", label: "Revenue (₹)", type: "number" },
    { key: "satisfaction_score", label: "Satisfaction Score", type: "number" },
    { key: "highlights", label: "Highlights", type: "textarea" },
    { key: "created_at", label: "Created At", type: "datetime" },
  ],
};

// ─────────────────────────────────────────────
// RECRUITMENT WORKSPACE
// ─────────────────────────────────────────────

const recruitmentCompanies: ModuleSchema = {
  singular: "Company",
  plural: "Companies",
  listColumns: ["name", "industry", "jobs_count", "status"],
  fields: [
    { key: "name", label: "Company Name", type: "text", required: true },
    { key: "industry", label: "Industry", type: "text" },
    { key: "website", label: "Website", type: "url" },
    { key: "logo_url", label: "Logo", type: "image" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "location", label: "Location", type: "text" },
    { key: "contact_email", label: "Contact Email", type: "email" },
    { key: "contact_phone", label: "Contact Phone", type: "phone" },
    { key: "jobs_count", label: "Active Jobs", type: "number", defaultValue: 0 },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "inactive", "blacklisted"],
      defaultValue: "active",
    },
  ],
};

const recruitmentApplications: ModuleSchema = {
  singular: "Application",
  plural: "Applications",
  listColumns: ["applicant_name", "job_title", "company", "status"],
  fields: [
    { key: "applicant_name", label: "Applicant", type: "text", required: true },
    { key: "applicant_email", label: "Email", type: "email", required: true },
    { key: "job_title", label: "Job Title", type: "text" },
    { key: "company", label: "Company", type: "text" },
    { key: "resume_url", label: "Resume URL", type: "url" },
    { key: "portfolio_url", label: "Portfolio URL", type: "url" },
    { key: "cover_letter", label: "Cover Letter", type: "textarea" },
    { key: "applied_at", label: "Applied At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: [
        "pending",
        "reviewed",
        "shortlisted",
        "interview",
        "offered",
        "accepted",
        "rejected",
      ],
      defaultValue: "pending",
    },
  ],
};

const recruitmentInterviewPipeline: ModuleSchema = {
  singular: "Interview",
  plural: "Interviews",
  listColumns: ["candidate_name", "company", "round", "status"],
  fields: [
    { key: "candidate_name", label: "Candidate", type: "text", required: true },
    { key: "candidate_email", label: "Email", type: "email" },
    { key: "company", label: "Company", type: "text" },
    { key: "job_title", label: "Job Title", type: "text" },
    {
      key: "round",
      label: "Round",
      type: "select",
      options: ["Screening", "Technical", "HR", "Final", "Group Discussion", "Assignment"],
    },
    { key: "scheduled_at", label: "Scheduled At", type: "datetime" },
    { key: "interviewer", label: "Interviewer", type: "text" },
    { key: "feedback", label: "Feedback", type: "textarea" },
    { key: "score", label: "Score (1-10)", type: "number" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["scheduled", "completed", "no_show", "rescheduled"],
      defaultValue: "scheduled",
    },
  ],
};

const recruitmentResumeDatabase: ModuleSchema = {
  singular: "Resume",
  plural: "Resume Database",
  listColumns: ["name", "email", "skills", "experience_years"],
  fields: [
    { key: "name", label: "Candidate Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "phone" },
    { key: "skills", label: "Skills", type: "tags" },
    { key: "experience_years", label: "Years of Experience", type: "number" },
    { key: "current_company", label: "Current Company", type: "text" },
    { key: "current_role", label: "Current Role", type: "text" },
    { key: "resume_url", label: "Resume URL", type: "url" },
    { key: "linkedin_url", label: "LinkedIn", type: "url" },
    { key: "notes", label: "Notes", type: "textarea" },
  ],
};

const recruitmentResumeScreening: ModuleSchema = {
  singular: "Screening",
  plural: "Resume Screenings",
  listColumns: ["candidate_name", "job_title", "score", "result"],
  fields: [
    { key: "candidate_name", label: "Candidate", type: "text", required: true },
    { key: "job_title", label: "Job Title", type: "text" },
    { key: "resume_url", label: "Resume URL", type: "url" },
    { key: "score", label: "Match Score (%)", type: "number" },
    { key: "strengths", label: "Strengths", type: "tags" },
    { key: "weaknesses", label: "Areas of Improvement", type: "tags" },
    { key: "notes", label: "Reviewer Notes", type: "textarea" },
    {
      key: "result",
      label: "Result",
      type: "status",
      options: ["pass", "fail", "review"],
      defaultValue: "review",
    },
  ],
};

const recruitmentOfferLetters: ModuleSchema = {
  singular: "Offer Letter",
  plural: "Offer Letters",
  listColumns: ["candidate_name", "company", "role", "status"],
  fields: [
    { key: "candidate_name", label: "Candidate", type: "text", required: true },
    { key: "candidate_email", label: "Email", type: "email", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "salary", label: "CTC (₹)", type: "number" },
    { key: "joining_date", label: "Joining Date", type: "date" },
    { key: "offer_letter_url", label: "Offer Letter PDF", type: "url" },
    { key: "valid_until", label: "Valid Until", type: "date" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["drafted", "sent", "accepted", "declined", "expired"],
      defaultValue: "drafted",
    },
  ],
};

const recruitmentRejected: ModuleSchema = {
  singular: "Rejected Candidate",
  plural: "Rejected Candidates",
  listColumns: ["name", "company", "reason", "rejected_at"],
  fields: [
    { key: "name", label: "Candidate Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email" },
    { key: "company", label: "Company", type: "text" },
    { key: "job_title", label: "Job Title", type: "text" },
    {
      key: "reason",
      label: "Rejection Reason",
      type: "select",
      options: [
        "Not Qualified",
        "Better Candidate",
        "Salary Mismatch",
        "Culture Fit",
        "No Response",
        "Other",
      ],
    },
    { key: "feedback", label: "Feedback", type: "textarea" },
    { key: "rejected_at", label: "Rejected At", type: "datetime" },
    { key: "can_reapply", label: "Can Re-apply", type: "boolean", defaultValue: true },
  ],
};

const recruitmentAnalytics: ModuleSchema = {
  singular: "Metric",
  plural: "Recruitment Analytics",
  listColumns: ["metric", "value", "period"],
  fields: [
    { key: "metric", label: "Metric Name", type: "text", required: true },
    { key: "value", label: "Value", type: "number", required: true },
    {
      key: "period",
      label: "Period",
      type: "select",
      options: ["Daily", "Weekly", "Monthly", "Quarterly"],
    },
    { key: "change", label: "Change %", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" },
  ],
};

const recruitmentReports: ModuleSchema = {
  singular: "Report",
  plural: "Recruitment Reports",
  listColumns: ["title", "type", "created_at"],
  fields: [
    { key: "title", label: "Report Title", type: "text", required: true },
    {
      key: "type",
      label: "Report Type",
      type: "select",
      options: ["Hiring", "Pipeline", "Diversity", "Time-to-hire", "Source Analysis"],
    },
    { key: "content", label: "Content / Summary", type: "textarea" },
    { key: "data", label: "Report Data", type: "json" },
    { key: "created_at", label: "Created At", type: "datetime" },
  ],
};

// ─────────────────────────────────────────────
// MARKETING WORKSPACE
// ─────────────────────────────────────────────

const marketingSubscribers: ModuleSchema = {
  singular: "Subscriber",
  plural: "Subscribers",
  listColumns: ["email", "source", "status", "subscribed_at"],
  fields: [
    { key: "email", label: "Email", type: "email", required: true },
    { key: "name", label: "Name", type: "text" },
    {
      key: "source",
      label: "Source",
      type: "select",
      options: ["Website", "Event", "Referral", "Social Media", "Import", "Other"],
    },
    { key: "tags", label: "Tags", type: "tags" },
    { key: "subscribed_at", label: "Subscribed At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "unsubscribed", "bounced"],
      defaultValue: "active",
    },
  ],
};

const marketingCampaigns: ModuleSchema = {
  singular: "Campaign",
  plural: "Campaigns",
  listColumns: ["name", "type", "status", "sent_at"],
  fields: [
    { key: "name", label: "Campaign Name", type: "text", required: true },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Email", "SMS", "Push Notification", "In-App", "Social"],
      required: true,
    },
    { key: "subject", label: "Subject", type: "text" },
    { key: "content", label: "Content", type: "textarea" },
    {
      key: "audience",
      label: "Target Audience",
      type: "select",
      options: ["All", "Students", "Organizations", "Recruiters", "Custom Segment"],
    },
    { key: "scheduled_at", label: "Scheduled At", type: "datetime" },
    { key: "sent_at", label: "Sent At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "scheduled", "sending", "sent", "cancelled"],
      defaultValue: "draft",
    },
  ],
};

const marketingEmailTemplates: ModuleSchema = {
  singular: "Email Template",
  plural: "Email Templates",
  listColumns: ["name", "category", "subject"],
  fields: [
    { key: "name", label: "Template Name", type: "text", required: true },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["Welcome", "Notification", "Marketing", "Transactional", "Event", "Newsletter"],
    },
    { key: "subject", label: "Subject Line", type: "text", required: true },
    { key: "html_content", label: "HTML Content", type: "textarea" },
    { key: "preview_text", label: "Preview Text", type: "text" },
    { key: "is_active", label: "Active", type: "boolean", defaultValue: true },
  ],
};

const marketingAnnouncementCenter: ModuleSchema = {
  singular: "Announcement",
  plural: "Announcements",
  listColumns: ["title", "channel", "status", "published_at"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "content", label: "Content", type: "textarea", required: true },
    {
      key: "channel",
      label: "Channel",
      type: "select",
      options: ["Website", "Email", "Push", "In-App", "All"],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      options: ["low", "normal", "high", "critical"],
    },
    { key: "image_url", label: "Image", type: "image" },
    { key: "published_at", label: "Published At", type: "datetime" },
    { key: "expires_at", label: "Expires At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "published", "expired"],
      defaultValue: "draft",
    },
  ],
};

const marketingNotifications: ModuleSchema = {
  singular: "Notification",
  plural: "Notifications",
  listColumns: ["title", "type", "audience", "status"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "message", label: "Message", type: "textarea", required: true },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Info", "Warning", "Success", "Error", "Promotional"],
    },
    {
      key: "audience",
      label: "Audience",
      type: "select",
      options: ["All", "Students", "Organizations", "Admins", "Custom"],
    },
    { key: "action_url", label: "Action URL", type: "url" },
    { key: "scheduled_at", label: "Scheduled At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "sent", "scheduled"],
      defaultValue: "draft",
    },
  ],
};

const marketingPopupCampaigns: ModuleSchema = {
  singular: "Popup Campaign",
  plural: "Popup Campaigns",
  listColumns: ["name", "trigger", "conversions", "status"],
  fields: [
    { key: "name", label: "Campaign Name", type: "text", required: true },
    { key: "headline", label: "Headline", type: "text" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "cta_text", label: "CTA Text", type: "text" },
    { key: "cta_url", label: "CTA URL", type: "url" },
    {
      key: "trigger",
      label: "Trigger",
      type: "select",
      options: ["Page Load", "Exit Intent", "Scroll", "Time Delay", "Click"],
    },
    {
      key: "page_rules",
      label: "Page Rules",
      type: "text",
      placeholder: "e.g., /events/*, /blog/*",
    },
    { key: "conversions", label: "Conversions", type: "number", defaultValue: 0 },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "paused", "ended"],
      defaultValue: "active",
    },
  ],
};

const marketingSeoManager: ModuleSchema = {
  singular: "SEO Entry",
  plural: "SEO Entries",
  listColumns: ["page_path", "title", "score"],
  fields: [
    { key: "page_path", label: "Page Path", type: "text", required: true, placeholder: "/about" },
    { key: "title", label: "Meta Title", type: "text", required: true },
    { key: "description", label: "Meta Description", type: "textarea" },
    { key: "og_image", label: "OG Image", type: "image" },
    { key: "canonical_url", label: "Canonical URL", type: "url" },
    { key: "keywords", label: "Keywords", type: "tags" },
    { key: "score", label: "SEO Score", type: "number" },
    {
      key: "robots",
      label: "Robots",
      type: "select",
      options: ["index,follow", "noindex,follow", "index,nofollow", "noindex,nofollow"],
    },
  ],
};

const marketingSocialPosts: ModuleSchema = {
  singular: "Social Post",
  plural: "Social Posts",
  listColumns: ["title", "platform", "status", "scheduled_at"],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "content", label: "Content", type: "textarea", required: true },
    {
      key: "platform",
      label: "Platform",
      type: "select",
      options: ["Twitter/X", "LinkedIn", "Instagram", "Facebook", "All"],
    },
    { key: "image_url", label: "Image", type: "image" },
    { key: "link_url", label: "Link", type: "url" },
    { key: "hashtags", label: "Hashtags", type: "tags" },
    { key: "scheduled_at", label: "Scheduled At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "scheduled", "published"],
      defaultValue: "draft",
    },
  ],
};

const marketingReferralProgram: ModuleSchema = {
  singular: "Referral",
  plural: "Referrals",
  listColumns: ["referrer_name", "referred_email", "reward", "status"],
  fields: [
    { key: "referrer_name", label: "Referrer", type: "text", required: true },
    { key: "referrer_email", label: "Referrer Email", type: "email" },
    { key: "referred_email", label: "Referred Email", type: "email", required: true },
    { key: "referred_name", label: "Referred Name", type: "text" },
    { key: "reward", label: "Reward", type: "text" },
    { key: "referral_code", label: "Referral Code", type: "text" },
    { key: "converted_at", label: "Converted At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["pending", "converted", "rewarded", "expired"],
      defaultValue: "pending",
    },
  ],
};

const marketingCouponManager: ModuleSchema = {
  singular: "Coupon",
  plural: "Coupons",
  listColumns: ["code", "discount", "uses", "status"],
  fields: [
    { key: "code", label: "Coupon Code", type: "text", required: true, placeholder: "LAUNCH2026" },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "discount_type",
      label: "Discount Type",
      type: "select",
      options: ["Percentage", "Fixed Amount", "Free Item"],
      required: true,
    },
    { key: "discount", label: "Discount Value", type: "number", required: true },
    { key: "min_purchase", label: "Min Purchase (₹)", type: "number" },
    { key: "max_uses", label: "Max Uses", type: "number" },
    { key: "uses", label: "Uses", type: "number", defaultValue: 0 },
    { key: "valid_from", label: "Valid From", type: "datetime" },
    { key: "valid_until", label: "Valid Until", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "expired", "disabled"],
      defaultValue: "active",
    },
  ],
};

// ─────────────────────────────────────────────
// ANALYTICS, AI CENTER, FINANCE, SYSTEM, DEVELOPER, PERSONAL
// ─────────────────────────────────────────────

// Generic "metrics/config" schemas for modules that are primarily dashboards or settings
const genericAnalytics: ModuleSchema = {
  singular: "Entry",
  plural: "Entries",
  listColumns: ["metric", "value", "period", "trend"],
  fields: [
    { key: "metric", label: "Metric Name", type: "text", required: true },
    { key: "value", label: "Value", type: "number", required: true },
    {
      key: "period",
      label: "Period",
      type: "select",
      options: ["Hourly", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
    },
    { key: "trend", label: "Trend %", type: "number" },
    { key: "dimension", label: "Dimension", type: "text" },
    { key: "notes", label: "Notes", type: "textarea" },
  ],
};

const genericConfig: ModuleSchema = {
  singular: "Setting",
  plural: "Settings",
  listColumns: ["key", "value", "category"],
  fields: [
    { key: "key", label: "Setting Key", type: "text", required: true },
    { key: "value", label: "Value", type: "textarea", required: true },
    { key: "category", label: "Category", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "is_secret", label: "Secret Value", type: "boolean" },
  ],
};

const genericLog: ModuleSchema = {
  singular: "Log Entry",
  plural: "Log Entries",
  listColumns: ["level", "message", "source", "timestamp"],
  fields: [
    {
      key: "level",
      label: "Level",
      type: "select",
      options: ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"],
    },
    { key: "message", label: "Message", type: "textarea", required: true },
    { key: "source", label: "Source", type: "text" },
    { key: "details", label: "Details", type: "json" },
    { key: "timestamp", label: "Timestamp", type: "datetime" },
  ],
};

// Finance
const financePayments: ModuleSchema = {
  singular: "Payment",
  plural: "Payments",
  listColumns: ["payer_name", "amount", "method", "status"],
  fields: [
    { key: "payer_name", label: "Payer Name", type: "text", required: true },
    { key: "payer_email", label: "Email", type: "email" },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    {
      key: "method",
      label: "Payment Method",
      type: "select",
      options: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet", "Cash", "Other"],
    },
    { key: "transaction_id", label: "Transaction ID", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "paid_at", label: "Paid At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["pending", "completed", "failed", "refunded"],
      defaultValue: "pending",
    },
  ],
};

const financeInvoices: ModuleSchema = {
  singular: "Invoice",
  plural: "Invoices",
  listColumns: ["invoice_number", "client_name", "amount", "status"],
  fields: [
    { key: "invoice_number", label: "Invoice #", type: "text", required: true },
    { key: "client_name", label: "Client", type: "text", required: true },
    { key: "client_email", label: "Client Email", type: "email" },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    { key: "tax", label: "Tax (₹)", type: "number" },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "items", label: "Line Items", type: "json" },
    { key: "notes", label: "Notes", type: "textarea" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["draft", "sent", "paid", "overdue", "cancelled"],
      defaultValue: "draft",
    },
  ],
};

const financeTransactions: ModuleSchema = {
  singular: "Transaction",
  plural: "Transactions",
  listColumns: ["description", "amount", "type", "created_at"],
  fields: [
    { key: "description", label: "Description", type: "text", required: true },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    { key: "type", label: "Type", type: "select", options: ["Credit", "Debit"], required: true },
    { key: "category", label: "Category", type: "text" },
    { key: "reference_id", label: "Reference ID", type: "text" },
    { key: "notes", label: "Notes", type: "textarea" },
    { key: "created_at", label: "Date", type: "datetime" },
  ],
};

const financeRefunds: ModuleSchema = {
  singular: "Refund",
  plural: "Refunds",
  listColumns: ["requester_name", "amount", "reason", "status"],
  fields: [
    { key: "requester_name", label: "Requester", type: "text", required: true },
    { key: "requester_email", label: "Email", type: "email" },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    { key: "original_transaction_id", label: "Original Transaction ID", type: "text" },
    { key: "reason", label: "Reason", type: "textarea" },
    { key: "requested_at", label: "Requested At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["pending", "approved", "processed", "rejected"],
      defaultValue: "pending",
    },
  ],
};

const financeSubscriptions: ModuleSchema = {
  singular: "Subscription",
  plural: "Subscriptions",
  listColumns: ["subscriber_name", "plan", "amount", "status"],
  fields: [
    { key: "subscriber_name", label: "Subscriber", type: "text", required: true },
    { key: "subscriber_email", label: "Email", type: "email" },
    { key: "plan", label: "Plan", type: "select", options: ["Free", "Basic", "Pro", "Enterprise"] },
    { key: "amount", label: "Amount (₹/mo)", type: "number" },
    { key: "started_at", label: "Started At", type: "datetime" },
    { key: "expires_at", label: "Expires At", type: "datetime" },
    { key: "auto_renew", label: "Auto Renew", type: "boolean", defaultValue: true },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["active", "paused", "cancelled", "expired"],
      defaultValue: "active",
    },
  ],
};

const financeRevenue: ModuleSchema = {
  singular: "Revenue Entry",
  plural: "Revenue",
  listColumns: ["source", "amount", "period", "trend"],
  fields: [
    { key: "source", label: "Revenue Source", type: "text", required: true },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    {
      key: "period",
      label: "Period",
      type: "select",
      options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
    },
    { key: "trend", label: "Growth %", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" },
  ],
};

const financeDonations: ModuleSchema = {
  singular: "Donation",
  plural: "Donations",
  listColumns: ["donor_name", "amount", "purpose", "status"],
  fields: [
    { key: "donor_name", label: "Donor Name", type: "text", required: true },
    { key: "donor_email", label: "Email", type: "email" },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    { key: "purpose", label: "Purpose", type: "text" },
    {
      key: "payment_method",
      label: "Payment Method",
      type: "select",
      options: ["UPI", "Card", "Bank Transfer", "Cash", "Other"],
    },
    { key: "receipt_url", label: "Receipt URL", type: "url" },
    { key: "donated_at", label: "Donated At", type: "datetime" },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["received", "pending", "refunded"],
      defaultValue: "received",
    },
  ],
};

const financeTaxes: ModuleSchema = {
  singular: "Tax Entry",
  plural: "Tax Entries",
  listColumns: ["description", "amount", "type", "period"],
  fields: [
    { key: "description", label: "Description", type: "text", required: true },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    {
      key: "type",
      label: "Tax Type",
      type: "select",
      options: ["GST", "TDS", "Income Tax", "Service Tax", "Other"],
    },
    { key: "period", label: "Period", type: "text", placeholder: "Q1 FY2026" },
    {
      key: "filing_status",
      label: "Filing Status",
      type: "status",
      options: ["pending", "filed", "paid"],
      defaultValue: "pending",
    },
  ],
};

const financeReports: ModuleSchema = {
  singular: "Financial Report",
  plural: "Financial Reports",
  listColumns: ["title", "type", "period", "created_at"],
  fields: [
    { key: "title", label: "Report Title", type: "text", required: true },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["P&L", "Balance Sheet", "Cash Flow", "Revenue", "Tax Summary", "Custom"],
    },
    { key: "period", label: "Period", type: "text" },
    { key: "summary", label: "Summary", type: "textarea" },
    { key: "file_url", label: "Report File", type: "url" },
    { key: "created_at", label: "Created At", type: "datetime" },
  ],
};

const financeSponsors: ModuleSchema = {
  singular: "Sponsor Payment",
  plural: "Sponsor Payments",
  listColumns: ["company_name", "amount", "payment_date", "status"],
  fields: [
    { key: "company_name", label: "Sponsor Company", type: "text", required: true },
    { key: "amount", label: "Amount (₹)", type: "number", required: true },
    {
      key: "tier",
      label: "Tier",
      type: "select",
      options: ["Title", "Platinum", "Gold", "Silver", "Bronze"],
    },
    { key: "invoice_number", label: "Invoice #", type: "text" },
    { key: "payment_date", label: "Payment Date", type: "date" },
    {
      key: "payment_method",
      label: "Method",
      type: "select",
      options: ["Bank Transfer", "UPI", "Cheque", "Other"],
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      options: ["pending", "received", "overdue"],
      defaultValue: "pending",
    },
  ],
};

// Personal workspace
const personalProfile: ModuleSchema = {
  singular: "Profile Setting",
  plural: "Profile Settings",
  listColumns: ["key", "value"],
  fields: [
    { key: "key", label: "Setting", type: "text", required: true },
    { key: "value", label: "Value", type: "textarea" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["General", "Display", "Privacy", "Notifications"],
    },
  ],
};

// ─────────────────────────────────────────────
// MASTER REGISTRY
// ─────────────────────────────────────────────

/**
 * Lookup key format: "workspace/moduleName" (exactly as the GenericAdminModule receives them)
 * Example: GenericAdminModule workspace="Operations" moduleName="Students"
 *          → lookup key: "Operations/Students"
 */
export const MODULE_SCHEMAS: Record<string, ModuleSchema> = {
  // Operations
  "Operations/Students": operationsStudents,
  "Operations/Recruiters": operationsRecruiters,
  "Operations/Mentors": operationsMentors,
  "Operations/Volunteers": operationsVolunteers,
  "Operations/Speakers": operationsSpeakers,
  "Operations/Admins": operationsAdmins,
  "Operations/Roles": operationsRoles,
  "Operations/Permissions": operationsPermissions,
  "Operations/Registration Management": operationsRegistrationMgmt,
  "Operations/Verification Center": operationsVerificationCenter,
  "Operations/Activity Timeline": operationsActivityTimeline,
  "Operations/Sessions": operationsSessions,
  "Operations/Device Manager": operationsDeviceManager,
  "Operations/Recycle Bin": operationsRecycleBin,

  // Community
  "Community/Community Members": communityMembers,
  "Community/Groups": communityGroups,
  "Community/Communities": communityCommunities,
  "Community/Forums": communityForums,
  "Community/Discussions": communityDiscussions,
  "Community/Mentorship": communityMentorship,
  "Community/Leaderboard": communityLeaderboard,
  "Community/Achievements": communityAchievements,
  "Community/Badges": communityBadges,
  "Community/Volunteer Management": communityVolunteerMgmt,
  "Community/Announcements": communityAnnouncements,
  "Community/Community Analytics": communityAnalytics,

  // Content
  "Content/CMS": contentCms,
  "Content/Homepage": contentHomepage,
  "Content/Landing Pages": contentLandingPages,
  "Content/Page Builder": contentPageBuilder,
  "Content/Categories": contentCategories,
  "Content/Authors": contentAuthors,
  "Content/Media Library": contentMediaLibrary,
  "Content/Videos": contentVideos,
  "Content/Resources": contentResources,
  "Content/Menus": contentMenus,
  "Content/Footer": contentFooter,
  "Content/Forms Builder": contentFormsBuilder,
  "Content/Popup Builder": contentPopupBuilder,
  "Content/Banner Manager": contentBannerManager,

  // Events (sub-modules that are generic)
  "Events/Categories": eventsCategories,
  "Events/Schedules": eventsSchedules,
  "Events/Venues": eventsVenues,
  "Events/Sponsors": eventsSponsors,
  "Events/Attendance": eventsAttendance,
  "Events/QR Check-in": eventsQrCheckin,
  "Events/QR Tickets": eventsQrTickets,
  "Events/Feedback": eventsFeedback,
  "Events/Reviews": eventsReviews,
  "Events/Event Gallery": eventsGallery,
  "Events/Livestream": eventsLivestream,
  "Events/Calendar": eventsCalendar,
  "Events/Reports": eventsReports,
  "Events/Speakers": operationsSpeakers, // reuse
  "Events/Partners": { ...eventsSponsors, singular: "Partner", plural: "Partners" },
  "Events/Registration": operationsRegistrationMgmt,
  "Events/Certificates": eventsCertificates,

  // Recruitment
  "Recruitment/Companies": recruitmentCompanies,
  "Recruitment/Applications": recruitmentApplications,
  "Recruitment/Interview Pipeline": recruitmentInterviewPipeline,
  "Recruitment/Resume Database": recruitmentResumeDatabase,
  "Recruitment/Resume Screening": recruitmentResumeScreening,
  "Recruitment/Offer Letters": recruitmentOfferLetters,
  "Recruitment/Rejected": recruitmentRejected,
  "Recruitment/Analytics": recruitmentAnalytics,
  "Recruitment/Reports": recruitmentReports,

  // Marketing
  "Marketing/Subscribers": marketingSubscribers,
  "Marketing/Campaigns": marketingCampaigns,
  "Marketing/Email Templates": marketingEmailTemplates,
  "Marketing/Announcement Center": marketingAnnouncementCenter,
  "Marketing/Notifications": marketingNotifications,
  "Marketing/Popup Campaigns": marketingPopupCampaigns,
  "Marketing/SEO Manager": marketingSeoManager,
  "Marketing/Social Posts": marketingSocialPosts,
  "Marketing/Referral Program": marketingReferralProgram,
  "Marketing/Coupon Manager": marketingCouponManager,
  "Marketing/Newsletter": marketingCampaigns, // same structure

  // Analytics
  "Analytics/Dashboard": genericAnalytics,
  "Analytics/Users": genericAnalytics,
  "Analytics/Traffic": genericAnalytics,
  "Analytics/Events": genericAnalytics,
  "Analytics/Jobs": genericAnalytics,
  "Analytics/Organizations": genericAnalytics,
  "Analytics/Countries": genericAnalytics,
  "Analytics/Cities": genericAnalytics,
  "Analytics/Devices": genericAnalytics,
  "Analytics/Browsers": genericAnalytics,
  "Analytics/Conversions": genericAnalytics,
  "Analytics/Funnels": genericAnalytics,
  "Analytics/Retention": genericAnalytics,
  "Analytics/Reports": genericAnalytics,
  "Analytics/Heatmaps": genericAnalytics,
  "Analytics/Realtime": genericAnalytics,
  "Analytics/Exports": genericAnalytics,

  // AI Center
  "AI Center/AI Dashboard": genericAnalytics,
  "AI Center/AI Search": genericConfig,
  "AI Center/AI Chatbot": genericConfig,
  "AI Center/AI Career Advisor": genericConfig,
  "AI Center/AI Resume Review": genericConfig,
  "AI Center/AI Analytics": genericAnalytics,
  "AI Center/AI Content Generator": genericConfig,
  "AI Center/AI Moderation": genericConfig,
  "AI Center/Prompt Library": {
    singular: "Prompt",
    plural: "Prompts",
    listColumns: ["name", "category", "model"],
    fields: [
      { key: "name", label: "Prompt Name", type: "text", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: ["Content", "Code", "Email", "SEO", "Support", "Other"],
      },
      {
        key: "model",
        label: "Model",
        type: "select",
        options: ["GPT-4", "GPT-3.5", "Claude", "Gemini", "Llama", "Custom"],
      },
      { key: "system_prompt", label: "System Prompt", type: "textarea", required: true },
      { key: "user_prompt_template", label: "User Prompt Template", type: "textarea" },
      { key: "temperature", label: "Temperature", type: "number" },
      { key: "max_tokens", label: "Max Tokens", type: "number" },
      { key: "is_active", label: "Active", type: "boolean", defaultValue: true },
    ],
  },
  "AI Center/Prompt Templates": {
    singular: "Template",
    plural: "Templates",
    listColumns: ["name", "category", "uses"],
    fields: [
      { key: "name", label: "Template Name", type: "text", required: true },
      { key: "category", label: "Category", type: "text" },
      { key: "template", label: "Template Content", type: "textarea", required: true },
      { key: "variables", label: "Variables", type: "tags", placeholder: "{{name}}, {{company}}" },
      { key: "uses", label: "Times Used", type: "number", defaultValue: 0 },
    ],
  },
  "AI Center/AI Logs": genericLog,
  "AI Center/Token Usage": genericAnalytics,
  "AI Center/AI Settings": genericConfig,

  // Finance
  "Finance/Payments": financePayments,
  "Finance/Invoices": financeInvoices,
  "Finance/Transactions": financeTransactions,
  "Finance/Refunds": financeRefunds,
  "Finance/Subscriptions": financeSubscriptions,
  "Finance/Revenue": financeRevenue,
  "Finance/Sponsors": financeSponsors,
  "Finance/Donations": financeDonations,
  "Finance/Taxes": financeTaxes,
  "Finance/Reports": financeReports,

  // System
  "System/Settings": genericConfig,
  "System/Branding": genericConfig,
  "System/Logo": genericConfig,
  "System/Theme": genericConfig,
  "System/Email": genericConfig,
  "System/SMTP": genericConfig,
  "System/Domains": genericConfig,
  "System/Storage": genericConfig,
  "System/Localization": genericConfig,
  "System/Timezone": genericConfig,
  "System/Maintenance": genericConfig,
  "System/Feature Flags": {
    singular: "Feature Flag",
    plural: "Feature Flags",
    listColumns: ["name", "is_enabled", "environment"],
    fields: [
      {
        key: "name",
        label: "Flag Name",
        type: "text",
        required: true,
        placeholder: "enable_ai_search",
      },
      { key: "description", label: "Description", type: "textarea" },
      { key: "is_enabled", label: "Enabled", type: "boolean", defaultValue: false },
      {
        key: "environment",
        label: "Environment",
        type: "select",
        options: ["All", "Production", "Staging", "Development"],
      },
      { key: "rollout_percentage", label: "Rollout %", type: "number", defaultValue: 100 },
    ],
  },
  "System/Security": genericConfig,
  "System/Backups": genericLog,
  "System/Restore": genericLog,
  "System/System Health": genericAnalytics,
  "System/Integrations": genericConfig,

  // Developer
  "Developer/API Explorer": genericConfig,
  "Developer/API Keys": genericConfig,
  "Developer/Webhook Manager": genericConfig,
  "Developer/Webhook Logs": genericLog,
  "Developer/SQL Explorer": genericConfig,
  "Developer/Database Browser": genericConfig,
  "Developer/Storage Browser": genericConfig,
  "Developer/Cron Jobs": genericConfig,
  "Developer/Queue Manager": genericConfig,
  "Developer/Error Logs": genericLog,
  "Developer/Activity Logs": genericLog,
  "Developer/Deployment Logs": genericLog,
  "Developer/Environment Variables": genericConfig,
  "Developer/Feature Flags": {
    singular: "Feature Flag",
    plural: "Feature Flags",
    listColumns: ["name", "is_enabled", "environment"],
    fields: [
      { key: "name", label: "Flag Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "is_enabled", label: "Enabled", type: "boolean", defaultValue: false },
      {
        key: "environment",
        label: "Environment",
        type: "select",
        options: ["All", "Production", "Staging", "Development"],
      },
    ],
  },
  "Developer/Developer Tools": genericConfig,

  // Personal
  "Personal/My Profile": personalProfile,
  "Personal/Appearance": personalProfile,
  "Personal/Preferences": personalProfile,
  "Personal/Notifications": personalProfile,
  "Personal/Connected Accounts": personalProfile,
  "Personal/API Tokens": genericConfig,
  "Personal/Sessions": operationsSessions,
  "Personal/Security": genericConfig,
  "Personal/Help": personalProfile,
  "Personal/Feedback": {
    singular: "Feedback",
    plural: "Feedback",
    listColumns: ["subject", "type", "status"],
    fields: [
      { key: "subject", label: "Subject", type: "text", required: true },
      { key: "message", label: "Message", type: "textarea", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["Bug", "Feature Request", "Question", "Compliment", "Other"],
      },
      { key: "screenshot_url", label: "Screenshot", type: "image" },
      {
        key: "status",
        label: "Status",
        type: "status",
        options: ["open", "in_progress", "resolved", "closed"],
        defaultValue: "open",
      },
    ],
  },
};

/**
 * Resolves the schema for a generic admin module.
 * Falls back to a sensible default if no mapping exists.
 */
export function getModuleSchema(workspace: string, moduleName: string): ModuleSchema {
  const key = `${workspace}/${moduleName}`;
  if (MODULE_SCHEMAS[key]) return MODULE_SCHEMAS[key];

  // Fallback: generate a reasonable default schema
  return {
    singular: moduleName.replace(/s$/, ""),
    plural: moduleName,
    listColumns: ["name", "description", "status"],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "category", label: "Category", type: "text" },
      { key: "image_url", label: "Image", type: "image" },
      { key: "url", label: "URL", type: "url" },
      { key: "notes", label: "Notes", type: "textarea" },
      {
        key: "status",
        label: "Status",
        type: "status",
        options: ["active", "inactive", "draft"],
        defaultValue: "active",
      },
    ],
  };
}
