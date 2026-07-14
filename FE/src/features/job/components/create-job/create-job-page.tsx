"use client";

import PageContainer from "@/components/layout/page-container";
import { CreateJobForm } from "@/features/job/form";
import { CreateJobFormValues } from "../../schemas";
import { JobSubmitAction } from "../../types";

export default function CreateJobPage() {
  const handleSubmit = (values: CreateJobFormValues, action: JobSubmitAction) => {
    console.log(values, action);
  };

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <CreateJobForm onSubmit={handleSubmit} isSubmitting={false} />
      </div>
    </PageContainer>
  );
}
