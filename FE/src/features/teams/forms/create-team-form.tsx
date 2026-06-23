"use client";

import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";
import { generateSlug } from "@/lib/utils";
import {
  createTeamSchema,
  type CreateTeamFormValues,
} from "../schemas/team.schema";

interface CreateTeamFormProps {
  onCancel: () => void;
  onSubmit: (values: CreateTeamFormValues, form: any) => void;
  isPending?: boolean;
}

function CreateTeamForm({
  onCancel,
  onSubmit,
  isPending = false,
}: CreateTeamFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
      logoUrl: "",
    } as CreateTeamFormValues,
    validators: {
      onSubmit: createTeamSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value, form);
    },
  });

  const { FormTextField, FormFileUploadField } =
    useFormFields<CreateTeamFormValues>();

  return (
    <form.AppForm>
      <form.Form className="p-0 max-w-lg">
        <Typography variant={"h4"}>Create your team</Typography>
        <Typography variant={"paragraph-sm"}>
          set up your team and start collaborating
        </Typography>

        <div className="flex flex-col gap-4 mt-4">
          <FormFileUploadField
            name="logoUrl"
            label="Logo"
            className="m-h-24"
            description="Recommended size 1:1, up to 10MB."
            maxSize={10 * 1024 * 1024}
          />

          <FormTextField
            name="name"
            label="Name"
            placeholder="Enter your team name"
            listeners={{
              onChange: ({ value }) => {
                form.setFieldValue(
                  "slug",
                  generateSlug((value as string) ?? ""),
                );
              },
            }}
          />
          <FormTextField
            name="slug"
            label="Slug"
            placeholder="Enter team slug"
            disabled
          />
        </div>

        <div className="flex items-center justify-end gap-4 mt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            Create team
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { CreateTeamForm };
