import * as z from "zod";
import { EEmploymentType, EJobLevel, EJobStatus, EWorkLocationType } from "../enums";
import { TFunction } from "@/i18n/config";

export const createJobSchema = (t: TFunction) =>
  z
    .object({
      title: z
        .string(
          t("validation.required", {
            field: t("field.job-title.label"),
          })
        )
        .trim()
        .min(
          1,
          t("validation.required", {
            field: t("field.job-title.label"),
          })
        )
        .max(
          255,
          t("validation.max-length", {
            field: t("field.job-title.label"),
            maxLength: 255,
          })
        ),

      status: z.enum(EJobStatus, {
        message: t("validation.required", {
          field: t("field.status.label"),
        }),
      }),

      employmentType: z.enum(EEmploymentType, {
        message: t("validation.required", {
          field: t("field.employment-type.label"),
        }),
      }),

      level: z.enum(EJobLevel, {
        message: t("validation.required", {
          field: t("field.level.label"),
        }),
      }),

      departments: z.enum(EJobLevel, {
        message: t("validation.required", {
          field: t("field.level.label"),
        }),
      }),

      location: z
        .string(
          t("validation.required", {
            field: t("field.location.label"),
          })
        )
        .min(
          1,
          t("validation.required", {
            field: t("field.location.label"),
          })
        ),

      officeAddress: z
        .string(
          t("validation.required", {
            field: t("field.office-address.label"),
          })
        )
        .trim()
        .min(
          1,
          t("validation.required", {
            field: t("field.office-address.label"),
          })
        ),

      workLocationType: z.enum(EWorkLocationType, {
        message: t("validation.required", {
          field: t("field.work-location-type.label"),
        }),
      }),
      salaryMin: z.number().optional(),
      salaryMax: z.number().optional(),
      currency: z.string().default("VND"),
      isNegotiable: z.boolean().default(false),
      skills: z
        .array(
          z.object({
            id: z.string(),
            text: z.string(),
          })
        )
        .min(
          1,
          t("validation.required", {
            field: t("field.skills.label"),
          })
        ),
      openedAt: z.date().optional(),
      expiresAt: z.date().optional(),
      description: z.string().optional(),
      requirements: z.string().optional(),
      benefits: z.string().optional(),
      published: z.boolean().default(false),
      pinned: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      // salary
      if (
        data.salaryMin !== undefined &&
        data.salaryMax !== undefined &&
        data.salaryMax < data.salaryMin
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMax"],
          message: t("validation.salary-max"),
        });
      }

      // date
      if (data.openedAt && data.expiresAt && data.expiresAt < data.openedAt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["expiresAt"],
          message: t("validation.expired-after-open"),
        });
      }
    });

export type CreateJobFormValues = z.infer<ReturnType<typeof createJobSchema>>;
