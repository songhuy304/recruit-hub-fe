import { JOB_PATHS } from "@/config/paths.config";
import { QUERY_KEY } from "@/config/query-keys";
import { invalidateQueries } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { mutationJobMapper } from "../mappers";
import { CreateJobFormValues } from "../schemas";
import { jobService } from "../services";
import { ICreateJobEntity, JobSubmitAction } from "../types";

const useEditJob = (jobId: number) => {
  const t = useTranslations();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: ICreateJobEntity) => jobService.updateJob(payload, jobId),

    onSuccess: () => {
      invalidateQueries([QUERY_KEY.JOB.LIST, QUERY_KEY.JOB.DETAIL(jobId)]);
      toast.success(t("Jobs.update-success"));
      router.push(JOB_PATHS.JOBS);
    },

    onError: (error) => {
      const message = error?.message || t("Jobs.edit-failed");
      toast.error(message);
    },
  });

  const handleEditJob = useCallback(
    (values: CreateJobFormValues, action: JobSubmitAction) => {
      return mutation.mutateAsync(mutationJobMapper.toEntity(values, action));
    },
    [mutation]
  );

  return {
    handleEditJob,
    ...mutation,
  };
};

export { useEditJob };
