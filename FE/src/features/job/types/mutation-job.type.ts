import { EEmploymentType, EJobLevel, EJobStatus, EWorkLocationType } from "../enums";

export type JobSubmitAction = "draft" | "publish";

export interface IJobEntity {
  title: string;
  description: string | null;
  requirements: string | null;
  benefits: string | null;

  employmentType: EEmploymentType | null;
  level: EJobLevel | null;
  status: EJobStatus | null;

  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  isNegotiable: boolean;

  expiresAt: string | null;
  openedAt: string | null;

  isPublished: boolean;
  isPinned: boolean;

  officeAddress: string | null;
  location: string;

  departments: string[];
  skills: string[];

  workLocationType: EWorkLocationType;
}
