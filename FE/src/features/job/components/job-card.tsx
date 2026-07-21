"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { employmentTypeOptions } from "@/features/job/constants/job-options.constant";
import { IJob } from "@/features/job/types";
import {
  formatJobExpiresIn,
  formatJobUpdatedAt,
} from "@/features/job/utils/format-job-time";
import { cn } from "@/lib/utils";
import { ILocation } from "@/services/common/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { JobCardAvatarGroup } from "./job-card-avatar-group";
import { JobCardStatusBadge } from "./job-card-status-badge";
import { MetaItem } from "@/features/job/components/meta-item";
import { getEmploymentTypeLabel, getNameLocation } from "@/features/job/utils";

interface JobCardProps {
  job: IJob;
  className?: string;
  onPinToggle?: (job: IJob) => void;
  onEdit?: (job: IJob) => void;
  onDetail?: (job: IJob) => void;
  onCopy?: (job: IJob) => void;
  onDelete?: (job: IJob) => void;
  locations?: ILocation[];
  loading?: boolean;
}

export function JobCard({
  job,
  className,
  onPinToggle,
  onEdit,
  onDelete,
  onDetail,
  onCopy,
  loading,
  locations = [],
}: JobCardProps) {
  const t = useTranslations();
  const expiresInDays = formatJobExpiresIn(job.expiresAt);
  const hasStats = job.viewCount != null || job.applicantCount != null || !!expiresInDays;

  return (
    <Card
      className={cn(
        "hover:border-border/90 group cursor-pointer gap-3 py-4 shadow-xs transition-colors relative",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
          <Icons.spinner className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      <CardHeader className="px-4 pb-0">
        <JobCardStatusBadge status={job.status} />
        <CardAction>
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "text-muted-foreground hover:text-foreground h-7 w-7",
                job.isPinned && "text-primary"
              )}
              onClick={() => onPinToggle?.(job)}
              aria-label={job.isPinned ? t("Jobs.card.unpin") : t("Jobs.card.pin")}
            >
              <Icons.pin className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-7 w-7"
                  aria-label={t("Jobs.card.actions")}
                >
                  <Icons.ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {onEdit ? (
                  <DropdownMenuItem onClick={() => onEdit(job)}>
                    <Icons.edit className="mr-2 h-4 w-4" />
                    {t("Common.edit")}
                  </DropdownMenuItem>
                ) : null}
                {onCopy ? (
                  <DropdownMenuItem onClick={() => onCopy(job)}>
                    <Icons.copy className="mr-2 h-4 w-4" />
                    {t("Common.copy")}
                  </DropdownMenuItem>
                ) : null}
                {onDelete ? (
                  <DropdownMenuItem onClick={() => onDelete(job)}>
                    <Icons.trash className="mr-2 h-4 w-4 text-destructive" />
                    {t("Common.delete")}
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2 px-4" onClick={() => onDetail?.(job)}>
        <div className="min-w-0">
          <Typography variant="h5" className="line-clamp-1 font-semibold">
            {job.title}
          </Typography>
          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
            <MetaItem icon={Icons.briefcase}>
              {/* {getDepartmentLabel(job.departments)} */}
              {job.department?.name}
            </MetaItem>
            <span aria-hidden="true">·</span>
            <MetaItem icon={Icons.mapPin}>
              {getNameLocation(job.location, locations)}
            </MetaItem>
            <span aria-hidden="true">·</span>
            <MetaItem icon={Icons.building}>
              {getEmploymentTypeLabel(job.employmentType)}
            </MetaItem>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between px-4 pt-0 mt-auto">
        <JobCardAvatarGroup members={job.team?.members || []} className="shrink-0" />
        <span className="text-muted-foreground/70 shrink-0 text-[11px]">
          {t("Jobs.card.updated", { time: formatJobUpdatedAt(job.updatedAt) })}
        </span>
      </CardFooter>
    </Card>
  );
}
