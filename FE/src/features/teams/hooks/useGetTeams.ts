import { QUERY_KEY } from "@/config/query-keys";
import { useAppDispatch } from "@/hooks/useRedux";
import { tokenStorage } from "@/lib/auth";
import { setTeams } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { teamService } from "../services";

const useGetTeams = () => {
  const token = tokenStorage.getAccess();
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: QUERY_KEY.TEAM.LIST,
    queryFn: () => teamService.getTeams(),
    enabled: !!token,
    retry: 1,
  });

  const data = query.data?.data || [];

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setTeams(query.data.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  return { ...query, data };
};

export { useGetTeams };
