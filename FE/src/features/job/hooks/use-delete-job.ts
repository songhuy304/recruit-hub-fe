import { QUERY_KEY } from "@/config/query-keys";
import { invalidateQueries } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { jobService } from "../services";

const useDeleteJob = () => {
  const t = useTranslations();

  const mutation = useMutation({
    mutationFn: (jobId: number) => jobService.deleteJob(jobId),

    onSuccess: () => {
      invalidateQueries([QUERY_KEY.JOB.LIST]);
      toast.success(t("Jobs.delete-success"));
    },
    onError: (error) => {
      const message = error?.message || t("Jobs.delete-failed");
      toast.error(message);
    },
  });

  const handleDeleteJob = useCallback(
    (jobId: number) => {
      return mutation.mutateAsync(jobId);
    },
    [mutation]
  );

  return {
    handleDeleteJob,
    ...mutation,
  };
};

export { useDeleteJob };
