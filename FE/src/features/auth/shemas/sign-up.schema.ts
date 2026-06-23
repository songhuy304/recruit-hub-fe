import { PASSWORD_REGEX } from "@/constants";
import { TFunction } from "@/i18n/config";
import z from "zod";

export const signUpFormSchema = (t: TFunction) =>
  z.object({
    userName: z
      .string()
      .min(
        6,
        t("validation.min-length", {
          field: t("field.username.label"),
          minLength: 6,
        }),
      )
      .max(
        30,
        t("validation.max-length", {
          field: t("field.username.label"),
          maxLength: 30,
        }),
      )
      .regex(/^[a-zA-Z0-9_]+$/, t("validation.username-format")),

    email: z.email(t("validation.invalid-email")),

    fullName: z
      .string()
      .min(
        6,
        t("validation.min-length", {
          field: t("field.name.label"),
          minLength: 6,
        }),
      )
      .max(
        100,
        t("validation.max-length", {
          field: t("field.name.label"),
          maxLength: 100,
        }),
      ),

    password: z.string().regex(PASSWORD_REGEX, t("validation.password-format")),

    companyName: z
      .string()
      .max(
        100,
        t("validation.max-length", {
          field: "Company Name",
          maxLength: 100,
        }),
      )
      .optional(),
  });

export type SignUpFormValues = z.infer<ReturnType<typeof signUpFormSchema>>;
