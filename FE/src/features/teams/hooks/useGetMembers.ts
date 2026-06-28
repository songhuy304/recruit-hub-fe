import { QUERY_KEY } from "@/config/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { teamService } from "../services";

export interface UseGetMembersParams {
  teamId: number;
  page: number;
  limit: number;
  search?: string;
  enabled?: boolean;
}

const useGetMembers = ({
  teamId,
  page,
  limit,
  search,
  enabled = true,
}: UseGetMembersParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.TEAM.MEMBERS(teamId), { page, limit, search }],
    queryFn: () => teamService.getMembers({ teamId, page, limit, search }),
    enabled: enabled && !!teamId,
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetMembers };
