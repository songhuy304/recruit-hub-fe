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
}

export interface ICreateTeamPayload {
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface ITeamStatistics {
  members: 0;
  invites: 0;
  joinRequests: 0;
}
