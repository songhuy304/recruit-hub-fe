import { Icons } from "@/components/icons";
import { Typography } from "@/components/ui/typography";
import { JobCardStatusBadge, MetaItem } from "@/features/job/components";
import { IJobDetail } from "@/features/job/types";
import { formatJobUpdatedAt } from "@/features/job/utils/format-job-time";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface JobDetailTitleProps {
  jobDetail: IJobDetail | undefined;
}

const JobDetailTitle = ({ jobDetail }: JobDetailTitleProps) => {
  const t = useTranslations();
  const updatedAt = jobDetail?.updatedAt ? formatJobUpdatedAt(jobDetail.updatedAt) : "--";

  if (!jobDetail) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <JobCardStatusBadge status={jobDetail.status} />

      <span className="bg-border/70 h-3.5 w-px" aria-hidden="true" />

      <Typography
        variant="subheading-xs"
        color="muted"
        className="font-medium uppercase tracking-wide"
      >
        {t("Jobs.detail.job-id", { id: jobDetail?.id })}
      </Typography>

      <span className="bg-border/70 h-3.5 w-px" aria-hidden="true" />

      <div
        className={cn(
          jobDetail?.isPublished
            ? "text-green-500 [&_svg]:text-green-500"
            : "text-muted-foreground [&_svg]:text-muted-foreground"
        )}
      >
        <MetaItem icon={jobDetail?.isPublished ? Icons.eye : Icons.eyeOff}>
          {jobDetail?.isPublished
            ? t("Jobs.published-title")
            : t("Jobs.detail.unpublished")}
        </MetaItem>
      </div>

      <span className="bg-border/70 h-3.5 w-px" aria-hidden="true" />

      <MetaItem icon={Icons.clock}>
        {updatedAt === "--" ? "--" : t("Jobs.card.updated", { time: updatedAt })}
      </MetaItem>

      <Icons.pin
        className={cn(
          "size-4 text-muted-foreground ml-auto",
          jobDetail?.isPinned && "text-primary"
        )}
      />
    </div>
  );
};

export { JobDetailTitle };
