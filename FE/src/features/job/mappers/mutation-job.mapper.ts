import get from "lodash/get";

import { CreateJobFormValues } from "../schemas";
import { ICreateJobEntity, JobSubmitAction } from "../types";
import { EJobStatus } from "../enums";
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
      status: get(values, "status", action === "publish" ? EJobStatus.OPEN : null),

      salaryMin: salaryMax ? toNumber(salaryMin) : null,
      salaryMax: salaryMax ? toNumber(salaryMax) : null,
      currency: get(values, "currency", "VND"),
      isNegotiable: get(values, "isNegotiable", false),

      openedAt: opensAt ? opensAt.toISOString() : null,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,

      isPublished: get(values, "published", false),
      isPinned: get(values, "pinned", false),

      officeAddress: get(values, "officeAddress", ""),
      location: get(values, "location"),

      departments: [get(values, "departments")],

      skills: get(values, "skills", []),

      workLocationType: get(values, "workLocationType"),
    };
  },
};
