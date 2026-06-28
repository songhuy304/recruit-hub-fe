import { IPagination } from "@/types/api.type";

export interface IGetMembers extends IPagination {
  teamId: number;
  search?: string;
}
