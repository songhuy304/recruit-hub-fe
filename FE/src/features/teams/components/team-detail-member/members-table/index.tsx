"use client";

import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useGetMembers } from "@/features/teams/hooks";
import { useDataTable } from "@/hooks/use-data-table";
import { useFilterParams } from "@/hooks/use-filter-params";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "next-intl";
import { inferParserType, parseAsInteger, parseAsString } from "nuqs";
import { columns } from "./columns";
import { getSortingStateParser } from "@/lib/parsers";

const membersSearchParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  search: parseAsString,
  sort: getSortingStateParser(),
};

type MembersSearchParams = inferParserType<typeof membersSearchParsers>;

interface TeamMembersTableProps {
  teamId: number;
}

export function TeamMembersTable({ teamId }: TeamMembersTableProps) {
  const t = useTranslations();
  const { user, isTeamOwner } = useUser();
  const { params, handleSubmit, handleReset } = useFilterParams({
    parsers: membersSearchParsers,
  });

  const {
    data: membersResponse,
    isPending,
    isFetching,
  } = useGetMembers({
    teamId,
    page: params.page,
    limit: params.limit,
    search: params.search ?? undefined,
    sort: params.sort ? JSON.stringify(params.sort) : undefined,
  });

  const members = membersResponse?.data ?? [];
  const pageCount = membersResponse?.meta?.totalPages ?? 1;
  const tableColumns = columns(teamId, t, isTeamOwner(teamId), user);

  const { table } = useDataTable({
    data: members,
    columns: tableColumns,
    pageCount,
    shallow: true,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  if (isPending) {
    return (
      <DataTableSkeleton columnCount={tableColumns.length} filterCount={1} rowCount={5} />
    );
  }

  return (
    <div>
      <FormFilter<MembersSearchParams>
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
