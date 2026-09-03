import { z } from "zod";

export const ambassadorApplicationSchema = z.object({
  // Step 1: Personal
  full_name: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),

  // Step 2: Contact
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(5, "Pincode is required"),

  // Step 3: Education
  education: z.object({
    university: z.string().min(2, "University is required"),
    degree: z.string().min(2, "Degree is required"),
    major: z.string().min(2, "Major is required"),
    yearOfStudy: z.string().min(1, "Year of study is required"),
    expectedGraduation: z.string().min(4, "Graduation year is required"),
  }),

  // Step 4: Skills & Social
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  social: z.object({
    linkedin: z.string().url("Must be a valid URL").or(z.literal("")),
    github: z.string().url("Must be a valid URL").or(z.literal("")),
    twitter: z.string().url("Must be a valid URL").or(z.literal("")),
    portfolio: z.string().url("Must be a valid URL").or(z.literal("")),
  }),

  // Step 5: Experience
  experience: z.object({
    previousAmbassador: z.string(),
    techCommunities: z.string(),
    hackathons: z.string(),
  }),

  // Step 6: Questions
  questions: z.object({
    whyOrigoHOSTs: z.string().min(50, "Please provide at least 50 characters"),
    strategy: z.string().min(50, "Please provide at least 50 characters"),
  }),
});

export type AmbassadorApplicationData = z.infer<typeof ambassadorApplicationSchema>;

export const defaultValues: AmbassadorApplicationData = {
  full_name: "",
  dob: "",
  gender: "",
  nationality: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  education: { university: "", degree: "", major: "", yearOfStudy: "", expectedGraduation: "" },
  skills: [],
  social: { linkedin: "", github: "", twitter: "", portfolio: "" },
  experience: { previousAmbassador: "", techCommunities: "", hackathons: "" },
  questions: { whyOrigoHOSTs: "", strategy: "" },
};
