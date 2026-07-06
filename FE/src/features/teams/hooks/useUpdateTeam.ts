import { QUERY_KEY } from "@/config/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UpdateTeamFormValues } from "../schemas/team.schema";
import { teamService } from "../services";
import { IUpdateTeamPayload } from "../types";

type UpdateTeamVariables = {
  teamId: number;
  params: IUpdateTeamPayload;
};

const useUpdateTeam = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const updateTeamMutation = useMutation({
    mutationFn: ({ teamId, params }: UpdateTeamVariables) =>
      teamService.updateTeam(params, teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.TEAM.LIST });
      toast.success(t("Teams.update-team-success"));
    },
    onError: (error: Error) => {
      toast.error(t(error.message));
    },
  });

  const handleUpdateTeam = (
    teamId: number,
    values: UpdateTeamFormValues,
    form: any
  ) => {
    updateTeamMutation.mutate(
      {
        teamId,
        params: {
          logoUrl: values.logoUrl || null,
          name: values.name,
          slug: values.slug,
        },
      },
      { onSuccess: () => form.reset() }
    );
  };

  return {
    handleUpdateTeam,
    ...updateTeamMutation,
  };
};

export { useUpdateTeam };
