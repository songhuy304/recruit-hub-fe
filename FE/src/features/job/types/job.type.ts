import { IPagination } from "@/types/api.type";
import {
  ECurrency,
  EEmploymentType,
  EJobLevel,
  EJobStatus,
  EWorkLocationType,
} from "../enums";
import { ITeamMember } from "@/features/teams/types";
import { IDepartment } from "@/services/common/types";

export interface Team {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  members: ITeamMember[];
}

export interface IJob {
  id: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  employmentType: EEmploymentType;
  workLocationType: EWorkLocationType;
  level: EJobLevel;
  status: EJobStatus;
  salaryMin: number;
  salaryMax: number;
  expiresAt: string | null;
  openedAt: string;
  isPublished: boolean;
  isPinned: boolean;
  location: string;
  department: IDepartment;
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
  applicantCount?: number;
  currency: ECurrency;
  isNegotiable: boolean;
  skills: string[];
  officeAddress: string;
  team?: Team;
}

export interface IDateRangeFilter {
  from?: string;
  to?: string;
}

export interface IJobSortFilter {
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface IJobQueryParams extends IPagination {
  status?: EJobStatus;
  q?: string;
  jobType?: EEmploymentType[];
  level?: EJobLevel[];
  isPinned?: boolean;
  createdAt?: IDateRangeFilter;
  sort?: IJobSortFilter;
  location?: string[];
}

export interface IJobSummaryQueryParams {
  q?: string;
  location?: string[];
  department?: string[];
  jobType?: EEmploymentType[];
  level?: EJobLevel[];
  createdAt?: IDateRangeFilter;
}
