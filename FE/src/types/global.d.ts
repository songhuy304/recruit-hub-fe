import { ETEAM_ROLE } from "@/enums/app.enum";
import { ITeam } from "@/features/teams/types";

export {};

declare global {
  interface CurrentTeam extends ITeam {
    teamRole: ETEAM_ROLE;
  }

  interface User {
    id: number;
    userName: string;
    email: string;
    fullName: string;
    avatar: string;
    role: ETEAM_ROLE;
    isVerified: boolean;
    currentTeamId: number;
    currentTeam: CurrentTeam;
  }
}
