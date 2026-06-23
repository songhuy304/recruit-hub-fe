import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";

const useLeaveTeam = () => {
  const queryClient = useQueryClient();

  const leaveTeamMutation = useMutation({
    mutationFn: (teamId: number) => teamService.leaveTeam(teamId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER.ROOT] }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TEAM.ROOT] }),
      ]);
    },
  });

  return { ...leaveTeamMutation };
};

export { useLeaveTeam };
