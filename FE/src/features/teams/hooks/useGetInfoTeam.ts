import { QUERY_KEY } from "@/config/query-keys";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectAccessToken, setTeams } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services";
import { useEffect } from "react";

const useGetInfoTeam = () => {
  const token = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: QUERY_KEY.TEAM.INFO,
    queryFn: () => teamService.getInfo(),
    enabled: !!token,
    retry: 1,
  });

  return { ...query };
};

export { useGetInfoTeam };
