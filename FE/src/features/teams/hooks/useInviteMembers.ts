import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";

export interface InviteMembersPayload {
  teamId: number;
  emails: string[];
  role: string;
}

const useInviteMembers = () => {
  const queryClient = useQueryClient();

  const inviteMembersMutation = useMutation({
    mutationFn: ({ teamId, emails, role }: InviteMembersPayload) =>
      teamService.inviteMembers(teamId, { emails, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TEAM.ROOT] });
    },
  });

  return { ...inviteMembersMutation };
};

export { useInviteMembers };
