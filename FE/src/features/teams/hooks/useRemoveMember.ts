import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";

// Hook xóa member
const useRemoveMember = () => {
  const queryClient = useQueryClient();

  const removeMemberMutation = useMutation({
    mutationFn: ({ teamId, userId }: { teamId: number; userId: number }) =>
      teamService.removeMember(teamId, userId),
    onSuccess: async (_, variables) => {
      const { teamId } = variables;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY.TEAM.MEMBERS(teamId),
        }),
      ]);
    },
  });

  return { ...removeMemberMutation };
};

export { useRemoveMember };
