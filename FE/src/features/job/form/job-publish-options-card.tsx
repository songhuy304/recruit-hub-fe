"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormFields } from "@/components/ui/tanstack-form";
import type { CreateJobFormValues } from "../schemas";
import { useTranslations } from "next-intl";

export function JobPublishOptionsCard() {
  const t = useTranslations();
  const { FormSwitchField } = useFormFields<CreateJobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{t('Jobs.publish-options-title')}</CardTitle>
        <CardDescription className="text-xs">
          {t('Jobs.publish-options-description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-1">
        <div className="border-border/50 flex items-center justify-between border-b pb-4">
          <div className="space-y-0.5">
            <h4 className="text-foreground/90 text-sm font-semibold">{t('Jobs.published-title')}</h4>
            <p className="text-muted-foreground text-xs">
              {t('Jobs.published-description')}
            </p>
          </div>
          <FormSwitchField name="published" label="" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-0.5">
            <h4 className="text-foreground/90 text-sm font-semibold">{t('Jobs.pinned-title')}</h4>
            <p className="text-muted-foreground text-xs">
              {t('Jobs.pinned-description')}
            </p>
          </div>
          <FormSwitchField name="pinned" label="" />
        </div>
      </CardContent>
    </Card>
  );
}
