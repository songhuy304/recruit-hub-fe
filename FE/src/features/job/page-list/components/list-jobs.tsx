"use client";

import { Empty } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { ETEAM_ROLE } from "@/enums";
import { JobCard } from "@/features/job/components";
import { useDeleteJob, usePinnedJob } from "@/features/job/hooks";
import { IJob } from "@/features/job/types";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { ILocation } from "@/services/common/types";
import { useRouter } from "next/navigation";

interface JobListProps {
  jobs: IJob[];
  locations: ILocation[];
  isFetching?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  loading?: boolean;
}

export function JobList({
  jobs,
  locations,
  loading = false,
  isFetching,
  emptyTitle = "No jobs found",
  emptyDescription = "Create your first job to start attracting great candidates",
  className,
}: JobListProps) {
  const router = useRouter();
  const { isCurrentTeamOwner, hasCurrentTeamRole } = useUser();
  const { handleTogglePinned, isPending: isTogglingPinned } = usePinnedJob();
  const { handleDeleteJob, isPending: isDeletingJob } = useDeleteJob();

  const handleEdit = (job: IJob) => {
    router.push(`/jobs/edit/${job.id}`);
  };

  const handleDelete = async (job: IJob) => {
    await handleDeleteJob(job.id);
  };

  const onPinToggle = async (job: IJob) => {
    const pinned = !job.isPinned;
    await handleTogglePinned(pinned, job.id);
  };

  const canDelete = isCurrentTeamOwner() ? handleDelete : undefined;
  const canEdit = hasCurrentTeamRole([ETEAM_ROLE.ADMIN, ETEAM_ROLE.OWNER])
    ? handleEdit
    : undefined;

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-background p-4 space-y-4">
            <Skeleton className="h-10 w-10 rounded-full" />

            <Skeleton className="h-5 w-3/4" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return <Empty title={emptyTitle} description={emptyDescription} className="py-10" />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
        isFetching && "opacity-60",
        className
      )}
    >
      {jobs.map((job) => (
        <JobCard
          loading={isTogglingPinned || isDeletingJob}
          key={job.id}
          job={job}
          locations={locations}
          onEdit={canEdit}
          onPinToggle={onPinToggle}
          onDelete={canDelete}
        />
      ))}
    </div>
  );
}
