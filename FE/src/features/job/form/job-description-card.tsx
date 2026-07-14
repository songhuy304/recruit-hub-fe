"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormFields } from "@/components/ui/tanstack-form";
import { JobFormValues } from "../schemas";

export function JobDescriptionCard() {
  const { FormTextEditorField } = useFormFields<JobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Job description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <FormTextEditorField
            name="description"
            label="Description"
            required
            placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
          />
        </div>

        <div className="space-y-1">
          <FormTextEditorField
            name="requirements"
            label="Requirements"
            required
            placeholder="List the must-have skills, experience, and qualifications..."
          />
        </div>

        <div className="space-y-1">
          <FormTextEditorField
            name="benefits"
            label="Benefits "
            placeholder="List the benefits, perks, and why candidates will love working with you..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
