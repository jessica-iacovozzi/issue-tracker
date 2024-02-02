import z from 'zod';

enum Status {
  open = 'OPEN',
  ongoing = 'ONGOING',
  closed = 'CLOSED'
}

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.').max(65535),
  projectId: z.number().min(1, 'Your issue needs to be assigned to a project.').max(2147483647),
  images: z.array(z.string()).optional(),
  creatorId: z.string().min(1, 'Creator ID is required.').max(255)
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z.string().min(1, 'Description is required.').max(65535).optional(),
  assigneeId: z.string().min(1, 'Assigned user ID is required.').max(255).optional().nullable(),
  status: z.nativeEnum(Status).optional(),
  projectId: z.number().min(1, 'Your issue needs to be assigned to a project.').max(2147483647).optional(),
  images: z.array(z.string()).optional(),
  creatorId: z.string().min(1, 'Creator ID is required.').max(255).optional()
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  managerId: z.string().min(1, 'Project manager ID is required.').max(255)
});

export const patchProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  managerId: z.string().min(1, 'Project manager ID is required.').max(255).optional()
})
