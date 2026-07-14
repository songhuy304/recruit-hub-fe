"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormFields } from "@/components/ui/tanstack-form";
import type { JobFormValues } from "../schemas/job.schema";

export function JobPublishOptionsCard() {
  const { FormSwitchField } = useFormFields<JobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Publish options</CardTitle>
        <CardDescription className="text-xs">
          Control how this job will be visible to candidates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-1">
        <div className="border-border/50 flex items-center justify-between border-b pb-4">
          <div className="space-y-0.5">
            <h4 className="text-foreground/90 text-sm font-semibold">Published</h4>
            <p className="text-muted-foreground text-xs">
              Show this job on the career page.
            </p>
          </div>
          <FormSwitchField name="published" label="" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-0.5">
            <h4 className="text-foreground/90 text-sm font-semibold">Pinned</h4>
            <p className="text-muted-foreground text-xs">
              Highlight this job on top of the list.
            </p>
          </div>
          <FormSwitchField name="pinned" label="" />
        </div>
      </CardContent>
    </Card>
  );
}
