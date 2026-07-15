"use client";

import { useAppForm } from "@/components/ui/tanstack-form";
import { JobBasicInfoCard } from "@/features/job/form/job-basic-info-card";
import { JobDescriptionCard } from "@/features/job/form/job-description-card";
import { JobHiringTeamCard } from "@/features/job/form/job-hiring-team-card";
import { JobPublishOptionsCard } from "@/features/job/form/job-publish-options-card";
import { useTranslations } from "next-intl";
import { CreateJobFormValues, createJobSchema } from "../schemas";

interface CreateJobFormProps {
  onSubmit: (values: CreateJobFormValues, form: any) => void | Promise<void>;
  defaultValues?: Partial<CreateJobFormValues>;
}

function CreateJobForm({ onSubmit, defaultValues }: CreateJobFormProps) {
  const t = useTranslations();

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onChange: createJobSchema(t),
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await onSubmit(value as CreateJobFormValues, form);
    },
  });

  return (
    <form.AppForm>
      <form.Form id="job-form" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 space-y-2 lg:col-span-9">
          <JobBasicInfoCard />
          <JobDescriptionCard />
        </div>

        <div className="space-y-2 lg:col-span-3">
          <JobPublishOptionsCard />
          <JobHiringTeamCard />
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { CreateJobForm };
