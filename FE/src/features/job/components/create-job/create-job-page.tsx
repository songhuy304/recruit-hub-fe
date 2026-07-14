"use client";

import PageContainer from "@/components/layout/page-container";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createJobMutation } from "../../api/mutations";
import type { JobFormValues } from "../../schemas/job.schema";
import { JobSubmitAction } from "../../types";
import { CreateJobForm } from "@/features/job/form";

export default function CreateJobPage() {
  const mutation = useMutation({
    ...createJobMutation,
    onSuccess: (_data, variables) => {
      toast.success(
        `Job successfully ${variables.status === "DRAFT" ? "saved as draft" : "published"}!`,
        {
          description: `Job title: ${variables.title}`,
        }
      );
    },
    onError: () => {
      toast.error("Failed to create job");
    },
  });

  const handleSubmit = (values: JobFormValues, action: JobSubmitAction) => {
    mutation.mutate({
      ...values,
      status: action === "draft" ? "DRAFT" : "PUBLISHED",
      published: action === "publish" ? true : values.published,
    });
  };

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <CreateJobForm
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
          submittingAction={
            mutation.isPending
              ? mutation.variables?.status === "DRAFT"
                ? "draft"
                : "publish"
              : null
          }
        />
      </div>
    </PageContainer>
  );
}
