import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { MetaItem } from "@/features/job/components";
import { IJobDetail } from "@/features/job/types";
import {
  formatJobSalaryRange,
  getEmploymentTypeLabel,
  getNameLocation,
} from "@/features/job/utils";
import { useGetLocation } from "@/hooks/options";
import { formatDate } from "@/lib/format";
import { EMPTY_VALUE } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface JobDetailHeaderProps {
  jobDetail: IJobDetail | undefined;
}

const JobDetailHeader = ({ jobDetail }: JobDetailHeaderProps) => {
  const t = useTranslations();
  const { data: locations = [] } = useGetLocation();

  if (!jobDetail) return null;

  const isNegotiable = () => {
    return (
      <div>
        <Icons.dollar className="size-4 mr-1 inline-block" />
        {t("field.is-negotiable.label")}
      </div>
    );
  };

  const salaryText =
    jobDetail.salaryMin != null || jobDetail.salaryMax != null
      ? formatJobSalaryRange(jobDetail)
      : isNegotiable();

  const daysOpen = jobDetail.openedAt ? formatDate(jobDetail.openedAt) : EMPTY_VALUE;

  const expiresInDays = jobDetail.expiresAt
    ? formatDate(jobDetail.expiresAt)
    : EMPTY_VALUE;

  return (
    <div className="space-y-4">
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
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Badge variant="secondary" className="text-green-500 px-3 py-1">
          {jobDetail.isNegotiable ? (
            isNegotiable()
          ) : (
            <span className="text-green-500">{salaryText}</span>
          )}
        </Badge>

        <MetaItem icon={Icons.teams}>
          {t("Jobs.card.applicants", {
            count: jobDetail.applicantCount ?? 0,
          })}
        </MetaItem>

        <MetaItem icon={Icons.clock}>
          {daysOpen === EMPTY_VALUE ? EMPTY_VALUE : daysOpen}
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
