"use client";

import PageContainer from "@/components/layout/page-container";
import { CreateJobForm } from "@/features/job/form";
import { useRef } from "react";
import { useCreateJob } from "../../hooks";
import { CreateJobFormValues } from "../../schemas";
import { JobSubmitAction } from "../../types";
import { CreateJobHeader } from "./create-job-header";

export default function CreateJobPage() {
  const { isPending, createInitValues, handleCreateJob } = useCreateJob();
  const submitActionRef = useRef<JobSubmitAction>("publish");

  const handleSubmit = async (values: CreateJobFormValues) => {
    await handleCreateJob(values, submitActionRef.current);
  };

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <CreateJobHeader
          onSaveDraft={() => {
            submitActionRef.current = "save";
          }}
          onPublish={() => {
            submitActionRef.current = "publish";
          }}
          isSubmitting={isPending}
          submittingAction={isPending ? submitActionRef.current : null}
        />

        <CreateJobForm onSubmit={handleSubmit} defaultValues={createInitValues} />
      </div>
    </PageContainer>
  );
}
