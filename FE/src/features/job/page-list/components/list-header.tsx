"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/ui/can";
import { Heading } from "@/components/ui/heading";
import { JOB_PATHS } from "@/config/paths.config";
import { ETEAM_ROLE } from "@/enums";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { jobStatusConfig } from "../../constants";
import { EJobStatus } from "../../enums";
import { useGetJobSummary } from "@/features/job/hooks";
import { NumberTicker } from "@/components/ui/number-ticker";

function JobStatItem({
  label,
  value,
  isLoading,
  status,
}: {
  label: string;
  value: number;
  isLoading?: boolean;
  status?: EJobStatus | undefined;
}) {
  const config = status ? jobStatusConfig[status] : undefined;
  return (
    <div className="flex min-w-14 flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-1.5">
        {config && <span className={cn("size-2 rounded-full", config?.dot)} />}
        <span className="text-muted-foreground text-[10px] font-medium tracking-[0.12em]">
          {label}
        </span>
      </div>

      {isLoading ? (
        <span className="bg-muted h-7 w-9 animate-pulse rounded" />
      ) : (
        <NumberTicker value={value} className="tabular-nums" />
      )}
    </div>
  );
}

export function JobListHeader({ className }: { className?: string }) {
  const t = useTranslations("Jobs");

  const { data: summary, isPending } = useGetJobSummary({});
  const { hasCurrentTeamRole } = useUser();

  const data = summary?.data;

  const stats = [
    { label: t("stats.total"), value: data?.total, status: undefined },
    { label: t("stats.open"), value: data?.open, status: EJobStatus.OPEN },
    { label: t("stats.archived"), value: data?.achieved, status: EJobStatus.ARCHIVED },
    { label: t("stats.draft"), value: data?.draft, status: EJobStatus.DRAFT },
    { label: t("stats.closed"), value: data?.closed, status: EJobStatus.CLOSED },
  ] as const;

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-6", className)}>
      <div>
        <Heading title={t("title")} description={t("description")} />
      </div>
      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-6 sm:gap-6">
          {stats.map((stat) => (
            <JobStatItem
              key={stat.label}
              status={stat.status}
              label={stat.label}
              value={stat.value ?? 0}
              isLoading={isPending}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Can can={hasCurrentTeamRole([ETEAM_ROLE.ADMIN, ETEAM_ROLE.OWNER])}>
            <Button asChild>
              <Link href={JOB_PATHS.CREATE_JOB}>
                <Icons.add className="h-4 w-4" />
                {t("create-job")}
              </Link>
            </Button>
          </Can>
          <Button type="button" variant="outline">
            <span>Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
