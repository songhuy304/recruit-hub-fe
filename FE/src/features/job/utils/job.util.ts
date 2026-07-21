import { employmentTypeOptions } from "@/features/job/constants";
import { ECurrency } from "@/features/job/enums";
import { IJob } from "@/features/job/types";
import { ILocation } from "@/services/common/types";

function formatCurrencyAmount(amount: number, currency: ECurrency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatJobSalaryRange(
  job: Pick<IJob, 'salaryMin' | 'salaryMax' | 'currency' | 'isNegotiable'>
): string | null {
  if (job.isNegotiable) return null;

  const { salaryMin, salaryMax, currency } = job;

  if (salaryMin != null && salaryMax != null) {
    return `${formatCurrencyAmount(salaryMin, currency)} - ${formatCurrencyAmount(salaryMax, currency)}`;
  }

  if (salaryMin != null) {
    return formatCurrencyAmount(salaryMin, currency);
  }

  if (salaryMax != null) {
    return formatCurrencyAmount(salaryMax, currency);
  }

  return null;
}

export function getEmploymentTypeLabel(employmentType: IJob["employmentType"]): string {
  const label = employmentTypeOptions.find(
    (option) => option.value === employmentType
  )?.label;

  return typeof label === "string" ? label : employmentType;
}

export function getNameLocation(
  location: IJob["location"],
  locations: ILocation[]
): string {
  const locationObj = locations.find((loc) => loc.code === location);
  return locationObj ? locationObj.englishName : "-";
}
