import { QUERY_KEY } from "@/config/query-keys";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectAccessToken, setTeams } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { teamService } from "../services";

const useGetTeams = () => {
  const token = useAppSelector(selectAccessToken);
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
