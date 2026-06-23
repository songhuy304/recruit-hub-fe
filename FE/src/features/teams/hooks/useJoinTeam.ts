import { useMutation } from "@tanstack/react-query";
import { teamService } from "../services";

const useJoinTeam = () => {
  const joinTeamMutation = useMutation({
    mutationFn: (inviteCode: string) => teamService.joinTeam(inviteCode),
  });

  return { ...joinTeamMutation };
};

export { useJoinTeam };
