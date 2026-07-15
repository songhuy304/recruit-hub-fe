import * as z from "zod";
import {
  ECurrency,
  EEmploymentType,
  EJobLevel,
  EJobStatus,
  EWorkLocationType,
} from "../enums";
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
        .optional(),

      workLocationType: z.enum(EWorkLocationType, {
        message: t("validation.required", {
          field: t("field.work-location-type.label"),
        }),
      }),
      salaryMin: z.number().optional().or(z.literal("")),
      salaryMax: z.number().optional().or(z.literal("")),
      currency: z.enum(ECurrency, {
        message: t("validation.required", {
          field: t("field.currency.label"),
        }),
      }),
      isNegotiable: z.boolean().default(false),
      skills: z
        .array(
          z
            .string(t("validation.required", { field: t("field.skills.label") }))
            .min(1, t("validation.required", { field: t("field.skills.label") }))
        )
        .min(1, t("validation.required", { field: t("field.skills.label") }))
        .max(10, t("validation.max-tags", { max: 10 })),
      openedAt: z.date().optional(),
      expiresAt: z.date().optional(),
      description: z
        .string(t("validation.required", { field: t("field.description.label") }))
        .min(1, t("validation.required", { field: t("field.description.label") })),
      requirements: z.string().optional(),
      benefits: z.string().optional(),
      published: z.boolean().default(false),
      pinned: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      // salary check
      if (
        data.salaryMin != null &&
        data.salaryMax != null &&
        data.salaryMax < data.salaryMin
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMax"],
          message: t("validation.salary-max"),
        });
      }

      // date check
      if (data.openedAt && data.expiresAt && data.expiresAt < data.openedAt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["expiresAt"],
          message: t("validation.expired-after-open"),
        });
      }
    });

export type CreateJobFormValues = z.infer<ReturnType<typeof createJobSchema>>;
