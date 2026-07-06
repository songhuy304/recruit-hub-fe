import { ETEAM_ROLE } from "@/enums";

export enum ETEAM_TYPE {
  PERSONAL = "personal",
  ORGANIZATION = "organization",
}

export interface ITeam {
  id: number;
  name: string;
  inviteCode: string;
  slug: string;
  type: ETEAM_TYPE;
  logoUrl: string | null;
  teamRole: ETEAM_ROLE;
}

export interface ICreateTeamPayload {
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface IUpdateTeamPayload {
  name?: string;
  slug?: string;
  logoUrl?: string | null;
}

export interface ITeamStatistics {
  members: 0;
  invites: 0;
  joinRequests: 0;
}

export interface ITeamMember {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  role: string;
  isVerified: boolean;
  teamRole: ETEAM_ROLE;
  createdAt: string;
  updatedAt: string;
}
