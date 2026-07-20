import { QUERY_KEY } from "@/config/query-keys";
import { invalidateQueries } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { jobService } from "../services";

interface TogglePinnedParams {
  pinned: boolean;
  jobId: number;
}

const usePinnedJob = () => {
  const t = useTranslations();

  const mutation = useMutation({
    mutationFn: ({ pinned, jobId }: TogglePinnedParams) =>
      jobService.togglePinned(jobId, pinned),

    onSuccess: (_, variables) => {
      invalidateQueries([QUERY_KEY.JOB.LIST, QUERY_KEY.JOB.DETAIL(variables.jobId)]);
      toast.success(t("Jobs.update-success"));
    },
    onError: (error) => {
      const message = error?.message || t("Jobs.edit-failed");
      toast.error(message);
    },
  });

  const handleTogglePinned = useCallback(
    (pinned: boolean, jobId: number) => {
      return mutation.mutateAsync({ pinned, jobId });
    },
    [mutation]
  );

  return {
    handleTogglePinned,
    ...mutation,
  };
};

export { usePinnedJob };
