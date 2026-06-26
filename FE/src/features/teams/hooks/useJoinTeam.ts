import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { teamService } from "../services";

const useJoinTeam = () => {
  const t = useTranslations();

  const joinTeamMutation = useMutation({
    mutationFn: (inviteCode: string) => teamService.joinTeam(inviteCode),
    onError: (error) => {
      toast.error(t(error.message));
    },
  });

  return { ...joinTeamMutation };
};

export { useJoinTeam };
