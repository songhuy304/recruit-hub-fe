import { QUERY_KEY } from "@/config/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { teamService } from "../services";
import { IGetMembers } from "@/features/teams/types";

export interface UseGetTeamRequestParams extends IGetMembers {
  teamId: number;
  enabled?: boolean;
}

const useGetTeamRequest = ({
  teamId,
  page,
  limit,
  search,
  enabled = true,
}: UseGetTeamRequestParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.TEAM.JOIN_REQUESTS(teamId), { page, limit, search }],
    queryFn: () => teamService.getJoinRequests({ teamId, page, limit, search }),
    enabled: enabled && !!teamId,
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetTeamRequest };
