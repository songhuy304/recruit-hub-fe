import { QUERY_KEY } from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../services";

export interface UseGetJobDetailsParams {
  id: number;
  enabled?: boolean;
}

const useGetJobDetails = ({ id, enabled }: UseGetJobDetailsParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.JOB.DETAIL(id)],
    queryFn: () => jobService.getJobDetail(id),
    enabled: !!id && enabled !== false,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetJobDetails };
