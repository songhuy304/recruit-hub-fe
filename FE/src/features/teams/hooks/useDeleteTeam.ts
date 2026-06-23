import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";

// Hook xóa team
const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  const deleteTeamMutation = useMutation({
    mutationFn: (teamId: number) => teamService.deleteTeam(teamId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER.ROOT] }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TEAM.ROOT] }),
      ]);
    },
  });

  return { ...deleteTeamMutation };
};

export { useDeleteTeam };
