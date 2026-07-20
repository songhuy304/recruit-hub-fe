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

  const onReset = () => {
    handleReset();
  };

  return (
    <div className="space-y-6">
      <JobListHeader />
      <JobListFilter
        params={params}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        setParams={setParams}
      />
      <JobListContent params={params} setParams={setParams} />
    </div>
  );
}
