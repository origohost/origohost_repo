import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  organizationId: z.string().optional(),
  jobTitle: z.string().optional(),
  source: z.string().default('Direct Intake'),
  status: z.enum(['Active', 'Lead', 'Engaged', 'Inactive', 'Archived', 'Deleted']).default('Active'),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
