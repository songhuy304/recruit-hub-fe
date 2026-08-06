import { QUERY_KEY } from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services";
import { tokenStorage } from "@/lib/auth";

const useGetInfoTeam = () => {
  const accessToken = tokenStorage.getAccess();

  const query = useQuery({
    queryKey: QUERY_KEY.TEAM.INFO,
    queryFn: () => teamService.getInfo(),
    enabled: !!accessToken,
    retry: 1,
  });

  return { ...query };
};

export { useGetInfoTeam };
