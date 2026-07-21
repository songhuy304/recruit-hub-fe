import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Can } from "@/components/ui/can";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { JobCardStatusBadge, MetaItem } from "@/features/job/components";
import { IJobDetail } from "@/features/job/types";
import {
  formatJobSalaryRange,
  getEmploymentTypeLabel,
  getNameLocation,
} from "@/features/job/utils";
import {
  formatJobDaysOpen,
  formatJobUpdatedAt,
} from "@/features/job/utils/format-job-time";
import { useGetLocation } from "@/hooks/options";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface JobDetailHeaderProps {
  jobDetail: IJobDetail | undefined;
}

const EMPTY_VALUE = "--";

const JobDetailHeader = ({ jobDetail }: JobDetailHeaderProps) => {
  const t = useTranslations();
  const { data: locations = [] } = useGetLocation();

  if (!jobDetail) return null;

  const salaryText = jobDetail.isNegotiable
    ? t("field.is-negotiable.label")
    : jobDetail.salaryMin != null || jobDetail.salaryMax != null
      ? formatJobSalaryRange(jobDetail)
      : EMPTY_VALUE;

  const daysOpen = jobDetail.openedAt
    ? formatJobDaysOpen(jobDetail.openedAt)
    : EMPTY_VALUE;

  const expiresInDays = jobDetail.expiresAt
    ? formatDate(jobDetail.expiresAt)
    : EMPTY_VALUE;

  const updatedAt = jobDetail.updatedAt
    ? formatJobUpdatedAt(jobDetail.updatedAt)
    : EMPTY_VALUE;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <JobCardStatusBadge status={jobDetail.status} />

        <span className="bg-border/70 h-3.5 w-px" aria-hidden="true" />

        <Typography
          variant="subheading-xs"
          color="muted"
          className="font-medium uppercase tracking-wide"
        >
          {t("Jobs.detail.job-id", { id: jobDetail.id })}
        </Typography>

        <span className="bg-border/70 h-3.5 w-px" aria-hidden="true" />

        <div
          className={cn(
            jobDetail.isPublished
              ? "text-green-500 [&_svg]:text-green-500"
              : "text-muted-foreground [&_svg]:text-muted-foreground"
          )}
        >
          <MetaItem icon={jobDetail.isPublished ? Icons.eye : Icons.eyeOff}>
            {jobDetail.isPublished
              ? t("Jobs.published-title")
              : t("Jobs.detail.unpublished")}
          </MetaItem>
        </div>

        <Can can={jobDetail.isPinned}>
          <span className="text-primary bg-primary/10 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
            <Icons.pin className="size-3" />
            {t("Jobs.pinned-title")}
          </span>
        </Can>
      </div>

      <Typography variant="h4" className="font-semibold tracking-tight">
        {jobDetail.title}
      </Typography>

      <div className="text-muted-foreground flex flex-wrap items-center text-sm">
        <MetaItem icon={Icons.briefcase}>{jobDetail.department?.name ?? "--"}</MetaItem>

        <Separator
          orientation="vertical"
          className="mx-3 h-4 data-[orientation=vertical]:h-4"
        />

        <MetaItem icon={Icons.mapPin}>
          {jobDetail.location ? getNameLocation(jobDetail.location, locations) : "--"}
        </MetaItem>

        <Separator
          orientation="vertical"
          className="mx-3 h-4 data-[orientation=vertical]:h-4"
        />

        <MetaItem icon={Icons.building}>
          {jobDetail.employmentType
            ? getEmploymentTypeLabel(jobDetail.employmentType)
            : "--"}
        </MetaItem>

        <Separator
          orientation="vertical"
          className="mx-3 h-4 data-[orientation=vertical]:h-4"
        />

        <MetaItem icon={Icons.clock}>
          {updatedAt === "--" ? "--" : t("Jobs.card.updated", { time: updatedAt })}
        </MetaItem>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Badge variant="secondary" className="text-green-500 px-3 py-1">
          <span className="text-green-500">{salaryText}</span>
        </Badge>

        <MetaItem icon={Icons.teams}>
          {t("Jobs.card.applicants", {
            count: jobDetail.applicantCount ?? 0,
          })}
        </MetaItem>

        <MetaItem icon={Icons.clock}>
          {daysOpen === EMPTY_VALUE
            ? EMPTY_VALUE
            : t("Jobs.detail.posted", {
                date: daysOpen,
              })}
        </MetaItem>

        <MetaItem icon={Icons.calendar}>
          {expiresInDays === EMPTY_VALUE
            ? EMPTY_VALUE
            : t("Jobs.card.expires-in", {
                days: expiresInDays ?? "--",
              })}
        </MetaItem>
      </div>
    </div>
  );
};

export { JobDetailHeader };
