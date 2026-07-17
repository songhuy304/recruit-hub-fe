"use client";

import { JobListHeader } from "@/features/job/page-list/components/list-header";
import { JobListContent } from "@/features/job/page-list/components/list-content";
import { JobListFilter } from "@/features/job/page-list/components/list-filter";
import { useFilterParams } from "@/hooks/use-filter-params";
import { jobSearchParsers } from "@/features/job/page-list/job-search-params";

export function ListJobPage() {
  const { params, handleSubmit, handleReset, setParams } = useFilterParams({
    parsers: jobSearchParsers,
  });

  return (
    <div className="space-y-6">
      <JobListFilter
        params={params}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
      <JobListHeader />
      <JobListContent params={params} setParams={setParams} />
    </div>
  );
}
