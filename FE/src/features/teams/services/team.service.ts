import { IResponse } from "@/types/api.type";
import { apiClient } from "@/lib/axios";
import { ICreateTeamPayload, ITeam } from "../types";
import { ITokenResponse } from "@/services/auth/auth.type";

const PATH = {
  INFO: "/teams/info",
  LIST: "/teams",
  CREATE: "/teams/create-team",
  SWITCH: (teamId: number) => `/teams/switch/${teamId}`,
  DELETE: (teamId: number) => `/teams/${teamId}`,
  LEAVE: (teamId: number) => `/teams/leave/${teamId}`,
  JOIN: (inviteCode: string) => `/teams/join/${inviteCode}`,
  INVITE: (teamId: number) => `/teams/${teamId}/invitations`,
};

export const teamService = {
  getInfo: (): Promise<IResponse<ITeam>> => apiClient.get(PATH.INFO),
  getTeams: (): Promise<IResponse<ITeam[]>> => apiClient.get(PATH.LIST),
  createTeam: (teamData: ICreateTeamPayload): Promise<IResponse<void>> =>
    apiClient.post(PATH.CREATE, teamData),
  switchTeam: (teamId: number): Promise<IResponse<ITokenResponse>> =>
    apiClient.post(PATH.SWITCH(teamId)),
  deleteTeam: (teamId: number): Promise<IResponse<void>> =>
    apiClient.delete(PATH.DELETE(teamId)),
  leaveTeam: (teamId: number): Promise<IResponse<void>> =>
    apiClient.post(PATH.LEAVE(teamId)),
  joinTeam: (inviteCode: string): Promise<IResponse<void>> =>
    apiClient.post(PATH.JOIN(inviteCode)),
  inviteMembers: (
    teamId: number,
    payload: { emails: string[]; role: string },
  ): Promise<IResponse<void>> => apiClient.post(PATH.INVITE(teamId), payload),
};
