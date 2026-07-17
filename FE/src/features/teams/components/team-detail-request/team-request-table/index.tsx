"use client";

import { FormFilter } from "@/components/forms/form-filter";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useGetTeamRequest } from "@/features/teams/hooks";
import { IFormFilterJoinRequest } from "@/features/teams/types";
import { useDataTable } from "@/hooks/use-data-table";
import { useFilterParams } from "@/hooks/use-filter-params";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsString } from "nuqs";
import { columns } from "./columns";
import { Icons } from "@/components/icons";

interface TeamRequestTableProps {
  teamId: number;
}

export function TeamRequestTable({ teamId }: TeamRequestTableProps) {
  const t = useTranslations();
  const { params, handleSubmit, handleReset } = useFilterParams({
    parsers: {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(10),
      search: parseAsString,
    },
  });

  const {
    data: requestsResponse,
    isPending,
    isFetching,
  } = useGetTeamRequest({
    teamId,
    page: params.page,
    limit: params.perPage,
    search: params.search,
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
    <FormFilter<IFormFilterJoinRequest>
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
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        onReset={() => {
          handleReset();
        }}
      />
      <DataTable table={table} isLoading={isFetching} />
    </div>
      
  );
}
