import { IPaginatedResponse, IResponse } from "@/types/api.type";
import { apiClient } from "@/lib/axios";
import {
  IApproveJoinRequestPayload,
  ICreateTeamPayload,
  IRejectJoinRequestPayload,
  ITeam,
  ITeamMember,
  ITeamStatistics,
} from "../types";
import { ITokenResponse } from "@/services/auth/auth.type";
import { IGetMembers } from "../types/team-member";

const PATH = {
  INFO: "/teams/info",
  LIST: "/teams",
  CREATE: "/teams/create-team",
  SWITCH: (teamId: number) => `/teams/switch/${teamId}`,
  DELETE: (teamId: number) => `/teams/${teamId}`,
  LEAVE: (teamId: number) => `/teams/leave/${teamId}`,
  JOIN: (inviteCode: string) => `/teams/join/${inviteCode}`,
  INVITE: (teamId: number) => `/teams/${teamId}/invitations`,
  GET_STATISTICS: (teamId: number) => `/teams/${teamId}/statistics`,
  GET_MEMBERS: () => `/teams/members`,
  GET_JOIN_REQUESTS: () => `/teams/join-requests`,
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
  getStatistics: (teamId: number): Promise<IResponse<ITeamStatistics>> =>
    apiClient.get(PATH.GET_STATISTICS(teamId)),
  getMembers: (params: IGetMembers): Promise<IPaginatedResponse<ITeamMember>> =>
    apiClient.get(PATH.GET_MEMBERS(), {
      params,
    }),

  getJoinRequests: (
    params: IGetMembers,
  ): Promise<IPaginatedResponse<ITeamMember>> =>
    apiClient.get(PATH.GET_JOIN_REQUESTS(), {
      params,
    }),

  approveJoinRequest: (
    payload: IApproveJoinRequestPayload,
  ): Promise<IResponse<void>> =>
    apiClient.post(`/teams/join-requests/approve`, payload),
  rejectJoinRequest: (
    payload: IRejectJoinRequestPayload,
  ): Promise<IResponse<void>> =>
    apiClient.post(`/teams/join-requests/reject`, payload),
};
