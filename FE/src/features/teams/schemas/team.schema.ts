import { ETEAM_ROLE } from "@/enums";
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

export function parseEmailList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

export const inviteMemberSchema = z.object({
  emails: z
    .string()
    .min(1, "Invite.emails-required")
    .refine(
      (val) => {
        const emailList = parseEmailList(val);
        if (emailList.length === 0) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailList.every((email) => emailRegex.test(email));
      },
      {
        message: "Invite.invalid-emails",
      }
    ),
  role: z.enum([ETEAM_ROLE.ADMIN, ETEAM_ROLE.MEMBER]),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
export type JoinTeamFormValues = z.infer<typeof joinTeamSchema>;
export type InviteMemberFormValues = z.infer<typeof inviteMemberSchema>;
