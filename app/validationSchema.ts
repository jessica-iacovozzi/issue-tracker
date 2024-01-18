import z from 'zod';

enum Status {
  open = 'OPEN',
  ongoing = 'ONGOING',
  closed = 'CLOSED'
}

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.').max(65535)
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z.string().min(1, 'Description is required.').max(65535).optional(),
  assigneeId: z.string().min(1, 'Assigned user ID is required.').max(255).optional().nullable(),
  status: z.nativeEnum(Status).optional()
});
