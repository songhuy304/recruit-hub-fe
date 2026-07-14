"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormFields } from "@/components/ui/tanstack-form";
import type { JobFormValues } from "../schemas/job.schema";
import {
  currencyOptions,
  employmentTypeOptions,
  levelOptions,
  statusOptions,
  workLocationTypeOptions,
} from "@/features/job/constants";
1;
export function JobBasicInfoCard() {
  const {
    FormTextField,
    FormSelectField,
    FormSwitchField,
    FormDatePickerField,
    FormTagInputField,
  } = useFormFields<JobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Basic information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <div className="col-span-1 md:col-span-4">
            <FormTextField
              name="title"
              label="Job title"
              required
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="status"
              label="Status"
              required
              options={statusOptions}
              placeholder="Select status"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="employmentType"
              label="Employment type"
              required
              options={employmentTypeOptions}
              placeholder="Select type"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="level"
              label="Level"
              required
              options={levelOptions}
              placeholder="Select level"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="departments"
              label="Department(s)"
              required
              options={[]}
              placeholder="Select departments"
            />
          </div>

          <div className="col-span-1 space-y-1.5 md:col-span-2">
            <span className="text-foreground/80 text-xs font-semibold">
              Salary range <span className="text-muted-foreground font-normal"></span>
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <FormTextField name="salaryMin" placeholder="Min" type="number" />
              </div>
              <span className="text-muted-foreground text-sm font-light">—</span>
              <div className="flex-1">
                <FormTextField name="salaryMax" placeholder="Max" type="number" />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="currency"
              label="Currency "
              options={currencyOptions}
              placeholder="Select currency"
            />
          </div>
          <div className="col-span-1 flex items-end pb-1 md:col-span-2">
            <FormSwitchField name="isNegotiable" label="Is negotiable?" />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormTextField
              name="location"
              label="Location"
              required
              placeholder="e.g. Ho Chi Minh City, Vietnam"
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <FormTextField
              name="officeAddress"
              label="Office address"
              required
              placeholder="e.g. 123 Nguyen Hue, District 1, Ho Chi Minh City"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="workLocationType"
              label="Work location type"
              required
              options={workLocationTypeOptions}
              placeholder="Select type"
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <FormTagInputField
              name="skills"
              label="Skills"
              required
              placeholder="Select skills (press Enter to add)"
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <FormDatePickerField
              name="opensAt"
              label="Opens at "
              placeholder="Select date"
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <FormDatePickerField
              name="expiresAt"
              label="Expires at "
              placeholder="Select date"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
