import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";
import {
  IApproveJoinRequestPayload,
  IRejectJoinRequestPayload,
} from "../types";
import { useTranslations } from "next-intl";

type JoinRequestAction = "approve" | "reject";

interface MutationPayload {
  action: JoinRequestAction;
  payload: IApproveJoinRequestPayload | IRejectJoinRequestPayload;
}

const useMutationJoinRequest = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ action, payload }: MutationPayload) => {
      if (action === "approve") {
        return teamService.approveJoinRequest(
          payload as IApproveJoinRequestPayload,
        );
      }

      return teamService.rejectJoinRequest(
        payload as IRejectJoinRequestPayload,
      );
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TEAM.ROOT],
      });

      toast.success(
        variables.action === "approve"
          ? t("Teams.approve-join-request-success")
          : t("Teams.reject-join-request-success"),
      );
    },

    onError: (error) => {
      toast.error(t(error?.message));
    },
  });
};

export { useMutationJoinRequest };
