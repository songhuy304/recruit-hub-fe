import { QUERY_KEY } from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../services";

export interface UseGetJobDetailsParams {
  id: number | undefined;
  enabled?: boolean;
}

const useGetJobDetails = ({ id, enabled }: UseGetJobDetailsParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.JOB.DETAIL(id ?? 0)],
    queryFn: () => jobService.getJobDetail(id ?? 0),
    enabled: !!id && enabled !== false,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetJobDetails };
