import { z } from 'zod';

export const activitySchema = z.object({
  id: z.string().optional(),
  contactId: z.string().optional(),
  organizationId: z.string().optional(),
  type: z.enum(['Call', 'Email', 'Meeting', 'Note', 'Task']).default('Meeting'),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().optional(),
  status: z.enum(['Pending', 'Completed', 'Cancelled']).default('Pending'),
  dueAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdBy: z.string().optional(),
});

export type ActivityInput = z.infer<typeof activitySchema>;
