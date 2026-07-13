import { IPaginatedResponse, IResponse } from "@/types/api.type";
import { apiClient } from "@/lib/axios";
import {
  IApproveJoinRequestPayload,
  ICreateTeamPayload,
  IInviteMemberPayload,
  IRejectJoinRequestPayload,
  ITeam,
  ITeamMember,
  ITeamStatistics,
  IUpdateTeamPayload,
} from "../types";
import { ITokenResponse } from "@/services/auth/auth.type";
import { IGetMembers, IUpdateMember } from "../types/team-member";

const PATH = {
  INFO: "/teams/info",
  LIST: "/teams",
  CREATE: "/teams/create-team",
  UPDATE: (teamId: number) => `/teams/${teamId}`,
  UPDATE_MEMBER: (teamId: number, userId: number) => `/teams/${teamId}/members/${userId}`,
  SWITCH: (teamId: number) => `/teams/switch/${teamId}`,
  DELETE: (teamId: number) => `/teams/${teamId}`,
  LEAVE: (teamId: number) => `/teams/leave/${teamId}`,
  JOIN: (inviteCode: string) => `/teams/join/${inviteCode}`,
  INVITE: () => `/teams/invitations`,
  GET_STATISTICS: (teamId: number) => `/teams/${teamId}/statistics`,
  GET_MEMBERS: () => `/teams/members`,
  GET_JOIN_REQUESTS: () => `/teams/join-requests`,
  REMOVE_MEMBER: (teamId: number, userId: number) => `/teams/${teamId}/members/${userId}`,
  APPROVE_JOIN_REQUEST: () => `/teams/join-requests/approve`,
  REJECT_JOIN_REQUEST: () => `/teams/join-requests/reject`,
};

export const teamService = {
  getInfo: (): Promise<IResponse<ITeam>> => apiClient.get(PATH.INFO),
  getTeams: (): Promise<IResponse<ITeam[]>> => apiClient.get(PATH.LIST),
  createTeam: (teamData: ICreateTeamPayload): Promise<IResponse<void>> =>
    apiClient.post(PATH.CREATE, teamData),
  updateTeam: (teamData: IUpdateTeamPayload, teamId: number): Promise<IResponse<void>> =>
    apiClient.patch(PATH.UPDATE(teamId), teamData),

  updateMember: (
    memberData: IUpdateMember,
    teamId: number,
    userId: number
  ): Promise<IResponse<void>> =>
    apiClient.patch(PATH.UPDATE_MEMBER(teamId, userId), memberData),
  switchTeam: (teamId: number): Promise<IResponse<ITokenResponse>> =>
    apiClient.post(PATH.SWITCH(teamId)),
  deleteTeam: (teamId: number): Promise<IResponse<void>> =>
    apiClient.delete(PATH.DELETE(teamId)),
  removeMember: (teamId: number, userId: number): Promise<IResponse<void>> =>
    apiClient.delete(PATH.REMOVE_MEMBER(teamId, userId)),
  leaveTeam: (teamId: number): Promise<IResponse<void>> =>
    apiClient.post(PATH.LEAVE(teamId)),
  joinTeam: (inviteCode: string): Promise<IResponse<void>> =>
    apiClient.post(PATH.JOIN(inviteCode)),
  inviteMembers: (payload: IInviteMemberPayload): Promise<IResponse<void>> =>
    apiClient.post(PATH.INVITE(), payload),
  getStatistics: (teamId: number): Promise<IResponse<ITeamStatistics>> =>
    apiClient.get(PATH.GET_STATISTICS(teamId)),
  getMembers: (params: IGetMembers): Promise<IPaginatedResponse<ITeamMember>> =>
    apiClient.get(PATH.GET_MEMBERS(), {
      params,
    }),

  getJoinRequests: (params: IGetMembers): Promise<IPaginatedResponse<ITeamMember>> =>
    apiClient.get(PATH.GET_JOIN_REQUESTS(), {
      params,
    }),

  approveJoinRequest: (payload: IApproveJoinRequestPayload): Promise<IResponse<void>> =>
    apiClient.post(PATH.APPROVE_JOIN_REQUEST(), payload),
  rejectJoinRequest: (payload: IRejectJoinRequestPayload): Promise<IResponse<void>> =>
    apiClient.post(PATH.REJECT_JOIN_REQUEST(), payload),
};
