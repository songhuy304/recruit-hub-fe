"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  inviteMemberSchema,
  type InviteMemberFormValues,
} from "../schemas/team.schema";
import { FieldLabelWithIcon } from "@/components/ui/field";
import { TEAM_ROLE_OPTIONS } from "@/constants/options";
import { ETEAM_ROLE } from "@/enums";

interface InviteMemberFormProps {
  onSkip?: () => void;
  onSubmit: (values: InviteMemberFormValues, form: any) => void;
  isPending?: boolean;
}

function InviteMemberForm({
  onSkip,
  onSubmit,
  isPending = false,
}: InviteMemberFormProps) {
  const t = useTranslations("Invite");

  const form = useAppForm({
    defaultValues: {
      emails: "",
      role: ETEAM_ROLE.MEMBER,
    } as InviteMemberFormValues,
    validators: {
      onSubmit: inviteMemberSchema(t),
    },
    onSubmit: ({ value }) => {
      onSubmit(value, form);
    },
  });

  const { FormTextareaField, FormSelectField } =
    useFormFields<InviteMemberFormValues>();

  return (
    <form.AppForm>
      <form.Form className="flex min-h-full flex-col p-0">
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <Typography variant="h4">{t("form-title")}</Typography>
            <Typography variant="paragraph-sm" className="text-muted-foreground">
              {t("form-description")}
            </Typography>
          </div>

          <div className="flex flex-col gap-5">
            <FormTextareaField
              name="emails"
              label={
                <FieldLabelWithIcon
                  icon={Icons.mail}
                  label={t("email-label")}
                />
              }
              placeholder={t("email-placeholder")}
              description={t("email-helper")}
              rows={4}
            />

            <FormSelectField
              name="role"
              label={
                <FieldLabelWithIcon icon={Icons.shield} label={t("role")} />
              }
              options={TEAM_ROLE_OPTIONS}
              placeholder={t("member")}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          {onSkip && (
            <Button type="button" variant="outline" onClick={onSkip}>
              {t("skip")}
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isPending}
            className={cn("gap-2")}
          >
            <Icons.send className="size-4" />
            {t("send")}
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { InviteMemberForm };
