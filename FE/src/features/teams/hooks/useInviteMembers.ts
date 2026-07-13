import { useMutation } from "@tanstack/react-query";
import { teamService } from "../services";
import { IInviteMemberPayload } from "../types";

const useInviteMembers = () => {
  const inviteMembersMutation = useMutation({
    mutationFn: (payload: IInviteMemberPayload) => teamService.inviteMembers(payload),
  });

  return { ...inviteMembersMutation };
};

export { useInviteMembers };
