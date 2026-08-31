import { z } from 'zod';

export const organizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Organization name is required'),
  website: z.string().url('Invalid website URL').or(z.literal('')).optional(),
  email: z.string().email('Invalid email address').or(z.literal('')).optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  type: z.enum(['University', 'Enterprise', 'Startup', 'Community', 'Sponsor', 'Partner']).default('University'),
  status: z.enum(['Active', 'Prospect', 'Partner', 'Archived', 'Inactive']).default('Active'),
  notes: z.string().optional(),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;
