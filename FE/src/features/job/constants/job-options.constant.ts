import { Option } from "@/components/forms/fields/select-field";
import { EEmploymentType, EJobLevel, EJobStatus, EWorkLocationType } from "../enums";

export const employmentTypeOptions: Option[] = [
  {
    value: EEmploymentType.FULL_TIME,
    label: "Full-time",
  },
  {
    value: EEmploymentType.PART_TIME,
    label: "Part-time",
  },
  {
    value: EEmploymentType.CONTRACT,
    label: "Contract",
  },
  {
    value: EEmploymentType.INTERN,
    label: "Intern",
  },
  {
    value: EEmploymentType.FREELANCE,
    label: "Freelance",
  },
];

export const levelOptions: Option[] = [
  {
    value: EJobLevel.INTERN,
    label: "Intern",
  },
  {
    value: EJobLevel.FRESHER,
    label: "Fresher",
  },
  {
    value: EJobLevel.JUNIOR,
    label: "Junior",
  },
  {
    value: EJobLevel.MIDDLE,
    label: "Middle",
  },
  {
    value: EJobLevel.SENIOR,
    label: "Senior",
  },
  {
    value: EJobLevel.LEAD,
    label: "Lead",
  },
];

export const jobStatusConfig: Record<
  EJobStatus,
  {
    label: string;
    color: string;
  }
> = {
  [EJobStatus.DRAFT]: {
    label: "Draft",
    color: "bg-gray-400",
  },
  [EJobStatus.OPEN]: {
    label: "Open",
    color: "bg-green-500",
  },
  [EJobStatus.CLOSED]: {
    label: "Closed",
    color: "bg-red-500",
  },
  [EJobStatus.ARCHIVED]: {
    label: "Archived",
    color: "bg-slate-500",
  },
};

export const workLocationTypeOptions: Option[] = [
  {
    value: EWorkLocationType.AT_OFFICE,
    label: "At Office",
  },
  {
    value: EWorkLocationType.REMOTE,
    label: "Remote",
  },
  {
    value: EWorkLocationType.HYBRID,
    label: "Hybrid",
  },
];

export const currencyOptions: Option[] = [
  {
    value: "VND",
    label: "VND",
  },
  {
    value: "USD",
    label: "USD",
  },
];
