import get from "lodash/get";

import { JobFormValues } from "../schemas";
import { IJobEntity } from "../types";

export const mutationJobMapper = {
  toEntity: (values: JobFormValues): IJobEntity => {
    const opensAt = get(values, "opensAt");
    const expiresAt = get(values, "expiresAt");

    return {
      title: get(values, "title"),

      description: get(values, "description"),
      requirements: get(values, "requirements"),
      benefits: get(values, "benefits", ""),

      employmentType: get(values, "employmentType", null),
      level: get(values, "level", null),
      status: get(values, "status", null),

      salaryMin: get(values, "salaryMin", null),
      salaryMax: get(values, "salaryMax", null),
      currency: get(values, "currency", "VND"),
      isNegotiable: get(values, "isNegotiable", false),

      openedAt: opensAt ? opensAt.toISOString() : null,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,

      isPublished: get(values, "published", false),
      isPinned: get(values, "pinned", false),

      officeAddress: get(values, "officeAddress"),
      location: get(values, "location"),

      departments: [get(values, "departments")],

      skills: get(values, "skills", []).map(
        (item: { id: string; text: string }) => item.text
      ),

      workLocationType: get(values, "workLocationType"),
    };
  },
};
