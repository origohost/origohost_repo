import { z } from 'zod';

export const leadSchema = z.object({
  id: z.string().optional(),
  contactId: z.string().optional(),
  organizationId: z.string().optional(),
  title: z.string().min(1, 'Lead title is required'),
  source: z.string().default('Website Intake'),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'CONVERTED', 'LOST']).default('NEW'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).default('Medium'),
  ownerId: z.string().optional(),
  estimatedValue: z.number().min(0, 'Estimated value must be non-negative').optional(),
  notes: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
