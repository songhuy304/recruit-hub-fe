import { ETEAM_ROLE } from "@/enums";
import { TFunction } from "@/i18n/config";
import { z } from "zod";

export const signInSchema = (t: TFunction) =>
  z.object({
    identifier: z.string().min(
      1,
      t("validation.required", {
        field: t("field.email.label"),
      })
    ),

    password: z.string().min(
      1,
      t("validation.required", {
        field: t("field.password.label"),
      })
    ),
  });

export const createTeamSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, t("validation.required", { field: t("field.team-name.label") }))
      .max(
        20,
        t("validation.max-length", {
          field: t("field.team-name.label"),
          maxLength: 20,
        })
      ),
    slug: z
      .string()
      .min(1, t("validation.required", { field: t("field.slug.label") }))
      .regex(/^[a-z0-9-]+$/, t("validation.invalid-slug")),
    logoUrl: z.string().optional(),
  });

export const joinTeamSchema = (t: TFunction) =>
  z.object({
    inviteCode: z
      .string()
      .min(
        1,
        t("validation.required", { field: t("field.invite-code.label") })
      ),
  });

export function parseEmailList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

export const inviteMemberSchema = (t: TFunction) =>
  z.object({
    emails: z
      .string()
      .min(1, t("validation.required", { field: t("field.emails.label") }))
      .refine(
        (val) => {
          const emailList = parseEmailList(val);
          if (emailList.length === 0) return false;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailList.every((email) => emailRegex.test(email));
        },
        {
          message: t("validation.invalid-emails"),
        }
      ),
    role: z.enum([ETEAM_ROLE.ADMIN, ETEAM_ROLE.MEMBER]),
  });

export type CreateTeamFormValues = z.infer<ReturnType<typeof createTeamSchema>>;
export type JoinTeamFormValues = z.infer<ReturnType<typeof joinTeamSchema>>;
export type InviteMemberFormValues = z.infer<
  ReturnType<typeof inviteMemberSchema>
>;
