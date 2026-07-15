import { QUERY_KEY } from "@/config/query-keys";
import { invalidateQueries } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { CreateJobFormValues } from "../schemas";
import { jobService } from "../services";
import { ICreateJobEntity, JobSubmitAction } from "../types";
import { ECurrency, EEmploymentType, EJobStatus, EWorkLocationType } from "../enums";
import { mutationJobMapper } from "../mappers";

const useCreateJob = () => {
  const t = useTranslations();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (payload: ICreateJobEntity) => jobService.createJob(payload),
    onSuccess: () => {
      invalidateQueries([QUERY_KEY.JOB.LIST]);
      toast.success(t("Jobs.create-success"));
    },
    onError: (error: Error) => {
      toast.error(error?.message || t("Jobs.create-failed"));
    },
  });

  const createInitValues: Partial<CreateJobFormValues> = useMemo(
    () => ({
      workLocationType: EWorkLocationType.AT_OFFICE,
      currency: ECurrency.USD,
      status: EJobStatus.DRAFT,
      employmentType: EEmploymentType.FULL_TIME,
      openedAt: new Date(),
    }),
    []
  );

  const handleCreateJob = useCallback(
    async (values: CreateJobFormValues, action: JobSubmitAction) => {
      try {
        const payload = mutationJobMapper.toEntity(values, action);
        console.log(payload);
        await mutateAsync(payload);
      } catch {}
    },
    []
  );

  return { handleCreateJob, isPending, isError, error, createInitValues };
};

export { useCreateJob };
