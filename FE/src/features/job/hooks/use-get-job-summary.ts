import { QUERY_KEY } from "@/config/query-keys";
import { IJobSummaryQueryParams } from "@/features/job/types";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../services";

export interface UseGetJobSummaryParams extends IJobSummaryQueryParams {
  enabled?: boolean;
}

const useGetJobSummary = ({ enabled = true, ...params }: UseGetJobSummaryParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.JOB.LIST, params],
    queryFn: () => jobService.getJobSummary(params),
    enabled,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetJobSummary };
