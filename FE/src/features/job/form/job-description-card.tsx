"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormFields } from "@/components/ui/tanstack-form";
import { CreateJobFormValues } from "../schemas";
import { useTranslations } from "next-intl";

export function JobDescriptionCard() {
  const t = useTranslations();
  const { FormTextEditorField } = useFormFields<CreateJobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t('Jobs.description-title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <FormTextEditorField
            name="description"
            label={t('field.description.label')}
            required
            placeholder={t('field.description.placeholder')}
          />
        </div>

        <div className="space-y-1">
          <FormTextEditorField
            name="requirements"
            label={t('field.requirements.label')}
            required
            placeholder={t('field.requirements.placeholder')}
          />
        </div>

        <div className="space-y-1">
          <FormTextEditorField
            name="benefits"
            label={t('field.benefits.label')}
            placeholder={t('field.benefits.placeholder')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
