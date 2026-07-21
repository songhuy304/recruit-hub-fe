import { QUERY_KEY } from "@/config/query-keys";
import { IGetMembers } from "@/features/teams/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { teamService } from "../services";

export interface UseGetMembersParams extends IGetMembers {
  enabled?: boolean;
}

const useGetMembers = ({
  teamId,
  page,
  limit,
  search,
  sort,
  enabled = true,
}: UseGetMembersParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.TEAM.MEMBERS(teamId), { page, limit, search, sort }],
    queryFn: () => teamService.getMembers({ teamId, page, limit, search, sort }),
    enabled: enabled && !!teamId,
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetMembers };
