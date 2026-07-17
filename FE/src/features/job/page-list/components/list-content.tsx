"use client";

import { Icons } from "@/components/icons";
import { PagePagination } from "@/components/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { JOB_PATHS } from "@/config/paths.config";
import { JobCard } from "@/features/job/components/job-card";
import { useGetJobs } from "@/features/job/hooks";
import { IJob } from "@/features/job/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { SetValues } from "nuqs";
import { JobSearchParams, jobSearchParsers } from "../job-search-params";

interface JobListContentProps {
  params: JobSearchParams;
  setParams: SetValues<typeof jobSearchParsers>;
}

export function JobListContent({ params, setParams }: JobListContentProps) {
  const router = useRouter();

  const {
    data: jobsResponse,
    isPending,
    isFetching,
  } = useGetJobs({
    page: params.page,
    limit: params.limit,
  });

  const jobs = jobsResponse?.data ?? [];
  const meta = jobsResponse?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.currentPage ?? params.page;

  const handlePageChange = (page: number) => {
    void setParams({ page });
  };

  const handleEdit = (job: IJob) => {
    router.push(`/jobs/edit/${job.id}`);
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="bg-muted h-40 animate-pulse rounded-xl border" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {jobs.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4",
            isFetching && "opacity-60"
          )}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <Empty
              title="No jobs found"
              description="Create your first job to start attracting great candidates"
              buttonText={
                <>
                  <Icons.plusCircle className="mr-2 h-4 w-4" />
                  Create your first job
                </>
              }
              onButtonClick={() => router.push(JOB_PATHS.CREATE_JOB)}
            />
          </CardContent>
        </Card>
      )}

      <PagePagination
        className="mt-10"
        currentPage={currentPage}
        totalPages={totalPages}
        isDisabled={isFetching}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
