import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";
import { ICreateTeamPayload } from "../types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { CreateTeamFormValues } from "../schemas/team.schema";

const useCreateTeam = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: (teamData: ICreateTeamPayload) =>
      teamService.createTeam(teamData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.TEAM.LIST });
    },
  });

  const handleCreateTeam = async (values: CreateTeamFormValues, form: any) => {
    createTeamMutation.mutateAsync(
      {
        logoUrl: values.logoUrl || null,
        name: values.name,
        slug: values.slug,
      },
      {
        onSuccess: () => {
          toast.success(t("Teams.create-team-success"));
          form.reset();
        },
        onError: (error) => {
          toast.error(t(error.message));
        },
      }
    );
  };

  return { ...createTeamMutation, handleCreateTeam };
};

export { useCreateTeam };
