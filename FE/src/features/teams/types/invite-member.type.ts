import { ETEAM_ROLE } from "@/enums";

export interface IInviteMemberPayload {
  emails: string[];
  role: ETEAM_ROLE;
  teamId: number;
}
