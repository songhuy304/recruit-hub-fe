"use client";

import { PagePagination } from "@/components/pagination";
import { useGetJobs } from "@/features/job/hooks";
import { JobList } from "@/features/job/page-list/components/list-jobs";
import { useGetLocation } from "@/hooks/options";
import type { SetValues } from "nuqs";
import { JobSearchParams, jobSearchParsers } from "../job-search-params";

interface JobListContentProps {
  params: JobSearchParams;
  setParams: SetValues<typeof jobSearchParsers>;
}

export function JobListContent({ params, setParams }: JobListContentProps) {
  const { data: locations = [] } = useGetLocation();

  const {
    data: jobsResponse,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useGetJobs({
    page: params.page,
    limit: params.limit,
    status: params.status ?? undefined,
    jobType: params.jobType ?? undefined,
    location: params.location ?? undefined,
    q: params.q ?? undefined,
    level: params.level ?? undefined,
  });

  const jobs = jobsResponse?.data ?? [];
  const meta = jobsResponse?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.currentPage ?? params.page;
  const isLoading = isPending || (isFetching && isPlaceholderData);

  const handlePageChange = (page: number) => {
    void setParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    void setParams({ limit, page: 1 });
  };

  return (
    <div className="space-y-10">
      <JobList
        loading={isLoading}
        jobs={jobs}
        locations={locations}
        isFetching={isFetching}
      />

      <PagePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={meta?.totalItems ?? 0}
        pageSize={params.limit}
        isDisabled={isFetching}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
