"use client";

import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";

import { generateSlug } from "@/lib/utils";
import {
  createTeamSchema,
  UpdateTeamFormValues,
  updateTeamSchema,
} from "../schemas/team.schema";
import { ITeam } from "../types";
import { useStore } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
interface UpdateTeamFormProps {
  team: ITeam;
  onSubmit: (teamId: number, values: UpdateTeamFormValues, form: any) => void;
  isPending?: boolean;
  isOwner: boolean;
}

const UpdateTeamForm = ({
  team,
  onSubmit,
  isPending,
  isOwner,
}: UpdateTeamFormProps) => {
  const t = useTranslations();

  const form = useAppForm({
    defaultValues: {
      name: team.name,
      slug: team.slug,
      logoUrl: team.logoUrl ?? "",
    },
    validators: {
      onChange: updateTeamSchema(t),
    },
    onSubmit: ({ value }) => {
      onSubmit(team.id, value, form);
    },
  });

  const { FormTextField, FormFileUploadField } =
    useFormFields<UpdateTeamFormValues>();

  const { isDirty, isValid } = useStore(form.store, (state) => ({
    isDirty: state.isDirty,
    isValid: state.isValid,
  }));

  return (
    <form.AppForm>
      <form.Form className="flex flex-col gap-5 p-0">
        <FormTextField
          disabled={!isOwner}
          name="name"
          label="Team Name"
          placeholder="Enter team name"
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue("slug", generateSlug((value as string) ?? ""));
            },
          }}
        />

        <div className="flex flex-col gap-2">
          <FormTextField
            disabled={true}
            name="slug"
            label="Team Slug"
            placeholder="team-slug"
          />
          <Typography
            as="p"
            variant="paragraph-xs"
            className="text-muted-foreground"
          >
            This is your team&apos;s unique identifier in URLs.
          </Typography>
        </div>

        <FormFileUploadField
          disabled={!isOwner}
          name="logoUrl"
          label="Logo"
          className="m-h-24"
          description="Recommended size 1:1, up to 10MB."
          maxSize={10 * 1024 * 1024}
        />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            disabled={!isOwner || !isDirty || !isValid}
          >
            {t("Common.save-changes")}
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
};

export { UpdateTeamForm };
