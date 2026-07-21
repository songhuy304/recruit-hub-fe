"use client";

import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useGetTeamRequest } from "@/features/teams/hooks";
import { useDataTable } from "@/hooks/use-data-table";
import { useFilterParams } from "@/hooks/use-filter-params";
import { useTranslations } from "next-intl";
import { inferParserType, parseAsInteger, parseAsString } from "nuqs";
import { columns } from "./columns";
import { getSortingStateParser } from "@/lib/parsers";

const requestSearchParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  search: parseAsString,
  sort: getSortingStateParser(),
};

type RequestSearchParams = inferParserType<typeof requestSearchParsers>;

interface TeamRequestTableProps {
  teamId: number;
}

export function TeamRequestTable({ teamId }: TeamRequestTableProps) {
  const t = useTranslations();
  const { params, handleSubmit, handleReset } = useFilterParams({
    parsers: requestSearchParsers,
  });

  const {
    data: requestsResponse,
    isPending,
    isFetching,
  } = useGetTeamRequest({
    teamId,
    page: params.page,
    limit: params.limit,
    search: params.search ?? undefined,
    sort: params.sort ? JSON.stringify(params.sort) : undefined,
  });

  const requests = requestsResponse?.data ?? [];
  const pageCount = requestsResponse?.meta?.totalPages ?? 1;
  const tableColumns = columns(teamId, t);

  const { table } = useDataTable({
    data: requests,
    columns: tableColumns,
    pageCount,
    shallow: true,
    debounceMs: 500,
  });

  if (isPending) {
    return (
      <DataTableSkeleton columnCount={tableColumns.length} filterCount={1} rowCount={5} />
    );
  }

  return (
    <div>
      <FormFilter<RequestSearchParams>
        className="mb-4"
        defaultValues={params}
        fields={[
          {
            type: "text",
            name: "search",
            placeholder: "Search by name or email",
            leftIcon: <Icons.search className="size-4" />,
          },
        ]}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
      <DataTable table={table} isLoading={isFetching} />
    </div>
  );
}
