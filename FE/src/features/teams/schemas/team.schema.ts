import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  logoUrl: z.string().optional(),
});

export const joinTeamSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required"),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
export type JoinTeamFormValues = z.infer<typeof joinTeamSchema>;
