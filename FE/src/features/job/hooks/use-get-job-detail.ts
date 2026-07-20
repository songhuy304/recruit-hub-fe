import { QUERY_KEY } from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../services";

export interface UseGetJobDetailsParams {
  id: number;
}

const useGetJobDetails = ({ id }: UseGetJobDetailsParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.JOB.DETAIL(id)],
    queryFn: () => jobService.getJobDetail(id),
    enabled: !!id,
  });

  return {
    ...query,
    data: query.data,
  };
};

export { useGetJobDetails };
