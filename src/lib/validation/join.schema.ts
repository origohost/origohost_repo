import { z } from 'zod';

export const joinFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must be under 100 characters.' }),

  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email must be under 120 characters.' }),

  organization: z
    .string()
    .trim()
    .max(120, { message: 'Organization name must be under 120 characters.' })
    .optional(),

  pathway: z.enum(
    [
      'Participant',
      'Volunteer',
      'Speaker',
      'Mentor',
      'Organizer',
      'Campus Representative',
    ],
    {
      message: 'Please select a pathway.',
    }
  ),

  motivation: z
    .string()
    .trim()
    .min(10, { message: 'Please share your motivation (min 10 characters).' })
    .max(3000, { message: 'Motivation must be under 3000 characters.' }),

  consentGiven: z
    .boolean()
    .refine((value) => value === true, {
      message: 'You must consent to privacy rules before submitting.',
    }),

  // Honeypot field for bot spam detection
  _hp: z.string().optional(),
});

export type JoinFormValues = z.infer<typeof joinFormSchema>;
