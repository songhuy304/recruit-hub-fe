"use client";

import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";
import { generateSlug } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  createTeamSchema,
  UpdateTeamFormValues,
  type CreateTeamFormValues,
} from "../schemas/team.schema";
import { Icons } from "@/components/icons";
import { useStore } from "@tanstack/react-form";

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
  const t = useTranslations();
  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
      logoUrl: "",
    } as CreateTeamFormValues,
    validators: {
      onSubmit: createTeamSchema(t),
    },
    onSubmit: ({ value }) => {
      onSubmit(value, form);
    },
  });

  const { isDirty, isValid } = useStore(form.store, (state) => ({
    isDirty: state.isDirty,
    isValid: state.isValid,
  }));

  const { FormTextField, FormFileUploadField } =
    useFormFields<CreateTeamFormValues>();

  return (
    <form.AppForm>
      <form.Form className="p-0 max-w-lg">
        <div className="flex gap-5 items-center mb-4">
          <div>
            <Typography variant={"h4"}>
              {t("Teams.CreateTeam.title")}
            </Typography>
            <Typography variant={"paragraph-sm"} color={"muted"}>
              {t("Teams.CreateTeam.description")}
            </Typography>
          </div>
        </div>

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
            leftIcon={
              <Icons.userPlus className="size-4 text-muted-foreground" />
            }
            placeholder="Enter your team name"
            listeners={{
              onChange: ({ value }) => {
                form.setFieldValue(
                  "slug",
                  generateSlug((value as string) ?? "")
                );
              },
            }}
          />
          <FormTextField
            name="slug"
            label="Slug"
            leftIcon={<Icons.link className="size-4 text-muted-foreground" />}
            placeholder="Enter team slug"
            disabled
          />
        </div>

        <div className="flex items-center justify-end gap-4 mt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t("Common.cancel")}
          </Button>
          <Button
            type="submit"
            isLoading={isPending}
            disabled={!isDirty || !isValid}
          >
            {t("Common.submit")}
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { CreateTeamForm };
