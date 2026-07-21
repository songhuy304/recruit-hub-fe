import { ETEAM_ROLE } from "@/enums";
import { IPagination } from "@/types/api.type";

export interface IGetMembers extends IPagination {
  teamId: number;
  search?: string;
  sort?: string;
}

export interface IUpdateMember {
  role: ETEAM_ROLE;
}
