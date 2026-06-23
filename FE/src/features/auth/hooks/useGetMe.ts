import { QUERY_KEY } from "@/config/query-keys";
import { useAppSelector } from "@/hooks/useRedux";
import { userService } from "@/services";
import { selectAccessToken } from "@/store";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const token = useAppSelector(selectAccessToken);

  return useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => userService.getMe(),
    enabled: !!token,
    retry: 0,
  });
};

export { useGetMe };
