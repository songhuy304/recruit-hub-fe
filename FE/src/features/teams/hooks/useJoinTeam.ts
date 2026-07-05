import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { teamService } from "../services";
import { JoinTeamFormValues } from "../schemas/team.schema";

const useJoinTeam = () => {
  const t = useTranslations();

  const joinTeamMutation = useMutation({
    mutationFn: (inviteCode: string) => teamService.joinTeam(inviteCode),
  });

  const handleJoinTeam = async (values: JoinTeamFormValues, form: any) => {
    const replace = values.inviteCode.replace(/#/g, "");
    joinTeamMutation.mutateAsync(replace, {
      onSuccess: () => {
        toast.success(t("Teams.join-team-success"));
        form.reset();
      },
      onError: (error) => {
        toast.error(t(error.message));
      },
    });
  };

  return { ...joinTeamMutation, handleJoinTeam };
};

export { useJoinTeam };
