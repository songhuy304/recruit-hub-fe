import { QUERY_KEY } from "@/config/query-keys";
import { ETEAM_ROLE } from "@/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { teamService } from "../services";
import { IUpdateMember } from "../types";

type UpdateMemberVariables = {
  teamId: number;
  userId: number;
  params: IUpdateMember;
};

const useUpdateMember = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const updateMemberMutation = useMutation({
    mutationFn: ({ teamId, userId, params }: UpdateMemberVariables) =>
      teamService.updateMember(params, teamId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.TEAM.MEMBERS(variables.teamId),
      });
      toast.success(t("Teams.update-member-success"));
    },
    onError: (error: Error) => {
      toast.error(t(error.message));
    },
  });

  const handleUpdateMember = (
    teamId: number,
    userId: number,
    role: ETEAM_ROLE
  ) =>
    updateMemberMutation.mutateAsync({
      teamId,
      userId,
      params: { role },
    });

  return {
    handleUpdateMember,
    ...updateMemberMutation,
  };
};

export { useUpdateMember };
