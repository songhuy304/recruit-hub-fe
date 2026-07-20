"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext, useFormFields } from "@/components/ui/tanstack-form";
import {
  currencyOptions,
  employmentTypeOptions,
  levelOptions,
  statusOptions,
  workLocationTypeOptions,
} from "@/features/job/constants";
import { CreateJobFormValues } from "../schemas";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { useStore } from "@tanstack/react-store";
import { ECurrency } from "../enums";
import { useGetDepartment, useGetLocation } from "@/hooks/options";

export function JobBasicInfoCard() {
  const t = useTranslations();
  const form = useFormContext();
  const { options: locationOptions } = useGetLocation();
  const { options: departmentOptions } = useGetDepartment();

  const currency = useStore(form.store, (state) => state.values.currency);

  const getCurrencySymbol = () => {
    switch (currency) {
      case ECurrency.USD:
        return <Icons.dollar />;
      case ECurrency.VND:
        return "VND";
      default:
        return "";
    }
  };

  const {
    FormTextField,
    FormSelectField,
    FormSwitchField,
    FormDatePickerField,
    FormTagsField,
    FormComboboxField,
  } = useFormFields<CreateJobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {t("Jobs.basic-info-title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <div className="col-span-1 md:col-span-4">
            <FormTextField
              name="title"
              label={t("field.job-title.label")}
              required
              placeholder={t("field.job-title.placeholder")}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="status"
              label={t("field.status.label")}
              required
              options={statusOptions}
              placeholder={t("field.status.placeholder")}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="employmentType"
              label={t("field.employment-type.label")}
              required
              options={employmentTypeOptions}
              placeholder={t("field.employment-type.placeholder")}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="level"
              label={t("field.level.label")}
              required
              options={levelOptions}
              placeholder={t("field.level.placeholder")}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormComboboxField
              name="departments"
              label={t("field.departments.label")}
              required
              options={departmentOptions}
              placeholder={t("field.departments.placeholder")}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormTextField
              name="salaryMin"
              leftIcon={getCurrencySymbol()}
              label={t("field.salary-min.label")}
              placeholder={t("field.salary-min.placeholder")}
              type="number"
              min={0}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FormTextField
              leftIcon={getCurrencySymbol()}
              name="salaryMax"
              label={t("field.salary-max.label")}
              placeholder={t("field.salary-max.placeholder")}
              type="number"
              min={0}
            />
          </div>
          <div className="col-span-1">
            <FormSelectField
              name="currency"
              label={t("field.currency.label")}
              options={currencyOptions}
              className="min-w-8"
              placeholder={t("field.currency.placeholder")}
            />
          </div>
          <div className="col-span-1 flex items-start pt-7.5">
            <FormSwitchField name="isNegotiable" label={t("field.is-negotiable.label")} />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              options={locationOptions}
              name="location"
              label={t("field.location.label")}
              required
              placeholder={t("field.location.placeholder")}
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <FormTextField
              name="officeAddress"
              label={t("field.office-address.label")}
              placeholder={t("field.office-address.placeholder")}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FormSelectField
              name="workLocationType"
              label={t("field.work-location-type.label")}
              required
              options={workLocationTypeOptions}
              placeholder={t("field.work-location-type.placeholder")}
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <FormTagsField
              name="skills"
              label={t("field.skills.label")}
              required
              placeholder={t("field.skills.placeholder")}
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <FormDatePickerField
              name="openedAt"
              label={t("field.opened-at.label")}
              placeholder={t("field.opened-at.placeholder")}
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <FormDatePickerField
              name="expiresAt"
              label={t("field.expires-at.label")}
              placeholder={t("field.expires-at.placeholder")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
