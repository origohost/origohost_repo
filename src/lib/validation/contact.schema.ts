import { z } from 'zod';

export const contactFormSchema = z.object({
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

  contact_number: z
    .string()
    .trim()
    .max(20, { message: 'Phone number too long.' })
    .optional(),

  organization: z
    .string()
    .trim()
    .max(100, { message: 'Organization must be under 100 characters.' })
    .optional(),

  category: z.enum(
    [
      'Community / Campus Event',
      'Partnership',
      'Sponsorship',
      'Enterprise / Custom Program',
      'General Inquiry',
      'Press / Media',
    ],
    {
      message: 'Please select an inquiry category.',
    }
  ),

  subject: z
    .string()
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(150, { message: 'Subject must be under 150 characters.' }),

  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(3000, { message: 'Message must be under 3000 characters.' }),

  consentGiven: z
    .boolean()
    .refine((value) => value === true, {
      message: 'You must consent to privacy rules before submitting.',
    }),

  // Honeypot field for bot spam detection
  _hp: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
