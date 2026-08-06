import { Icons } from "@/components/icons";
import { TextEditor } from "@/components/rte-editor/text-editor";
import { Typography } from "@/components/ui/typography";
import { IJobDetail } from "@/features/job/types";
import {
  formatJobSalaryRange,
  getEmploymentTypeLabel,
  getJobLevelLabel,
  getNameLocation,
  getWorkLocationTypeLabel,
} from "@/features/job/utils";
import { useGetLocation } from "@/hooks/options";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

interface JobTabOverviewProps {
  jobDetail: IJobDetail | undefined;
}

interface JobInfoRow {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const EMPTY_VALUE = "--";

function JobInfoRow({ icon: Icon, label, value }: JobInfoRow) {
  return (
    <div className="grid grid-cols-[auto_9rem_1fr] items-center gap-x-3">
      <Icon className="text-muted-foreground size-4 shrink-0" />
      <Typography variant="paragraph-sm" color="muted" className="font-medium">
        {label}
      </Typography>
      <Typography variant="paragraph-sm" className="font-medium">
        {value}
      </Typography>
    </div>
  );
}

const JobTabOverview = ({ jobDetail }: JobTabOverviewProps) => {
  const t = useTranslations();
  const { data: locations = [] } = useGetLocation();

  const getSalaryText = (): string => {
    if (!jobDetail) return EMPTY_VALUE;

    if (jobDetail.salaryMin != null || jobDetail.salaryMax != null) {
      return formatJobSalaryRange(jobDetail) ?? EMPTY_VALUE;
    }

    if (jobDetail.isNegotiable) {
      return t("field.is-negotiable.label");
    }

    return EMPTY_VALUE;
  };

  const infoRows: JobInfoRow[] = [
    {
      icon: Icons.building,
      label: t("field.departments.label"),
      value: jobDetail?.department?.name ?? EMPTY_VALUE,
    },
    {
      icon: Icons.mapPin,
      label: t("field.location.label"),
      value: jobDetail?.location
        ? getNameLocation(jobDetail.location, locations)
        : EMPTY_VALUE,
    },
    {
      icon: Icons.calendarClock,
      label: t("field.employment-type.label"),
      value: jobDetail?.employmentType
        ? getEmploymentTypeLabel(jobDetail.employmentType)
        : EMPTY_VALUE,
    },
    {
      icon: Icons.medal,
      label: t("field.level.label"),
      value: jobDetail?.level ? getJobLevelLabel(jobDetail.level) : EMPTY_VALUE,
    },
    {
      icon: Icons.laptop,
      label: t("field.work-location-type.label"),
      value: jobDetail?.workLocationType
        ? getWorkLocationTypeLabel(jobDetail.workLocationType)
        : EMPTY_VALUE,
    },
    {
      icon: Icons.cashBanknote,
      label: t("Jobs.salary-range"),
      value: getSalaryText(),
    },
    {
      icon: Icons.teams,
      label: t("Jobs.detail.reports-to"),
      value: jobDetail?.assignee?.fullName ?? EMPTY_VALUE,
    },
  ];

  return (
    <div className="space-y-6 pb-2">
      <div className="space-y-6">
        <TextEditor value={jobDetail?.description} editable={false} />
        <TextEditor value={jobDetail?.requirements} editable={false} />
        <TextEditor value={jobDetail?.benefits} editable={false} />
      </div>

      <div className="space-y-4 border-t pt-5">
        <Typography variant="label-md" className="text-base font-semibold">
          {t("Jobs.detail.job-information")}
        </Typography>

        <div className="space-y-3">
          {infoRows.map((row) => (
            <JobInfoRow key={row.label} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobTabOverview;
