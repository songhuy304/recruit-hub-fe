import get from "lodash/get";

import { CreateJobFormValues } from "../schemas";
import { ICreateJobEntity, IJob, JobSubmitAction } from "../types";
import { toNumber } from "lodash";

export const mutationJobMapper = {
  toEntity: (values: CreateJobFormValues, action: JobSubmitAction): ICreateJobEntity => {
    const opensAt = get(values, "openedAt");
    const expiresAt = get(values, "expiresAt");

    const salaryMin = get(values, "salaryMin", null);
    const salaryMax = get(values, "salaryMax", null);

    return {
      title: get(values, "title"),

      description: get(values, "description", ""),
      requirements: get(values, "requirements", ""),
      benefits: get(values, "benefits", ""),

      employmentType: get(values, "employmentType", null),
      level: get(values, "level", null),
      status: get(values, "status"),

      salaryMin: salaryMax ? toNumber(salaryMin) : null,
      salaryMax: salaryMax ? toNumber(salaryMax) : null,
      currency: get(values, "currency", "VND"),
      isNegotiable: get(values, "isNegotiable", false),

      openedAt: opensAt ? opensAt.toISOString() : null,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,

      isPublished: get(values, "published", action === "publish" ? true : false),
      isPinned: get(values, "pinned", false),

      officeAddress: get(values, "officeAddress", ""),
      location: get(values, "location"),

      department: Number(get(values, "departments")),

      skills: get(values, "skills", []),

      workLocationType: get(values, "workLocationType"),
    };
  },

  toFormValues: (job: IJob): CreateJobFormValues => {
    return {
      title: job.title,

      status: job.status,
      employmentType: job.employmentType,
      level: job.level,

      departments: String(job.department.id),
      location: job.location,

      workLocationType: job.workLocationType,
      currency: job.currency,

      isNegotiable: job.isNegotiable,

      skills: job.skills ?? [],

      description: job.description,
      requirements: job.requirements ?? "",
      benefits: job.benefits ?? "",

      published: job.isPublished,
      pinned: job.isPinned,

      officeAddress: job.officeAddress ?? "",

      salaryMin: job.salaryMin ?? undefined,
      salaryMax: job.salaryMax ?? undefined,

      openedAt: job.openedAt ? new Date(job.openedAt) : undefined,
      expiresAt: job.expiresAt ? new Date(job.expiresAt) : undefined,
    };
  },
};
