"use client";

import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useGetMembers } from "@/features/teams/hooks";
import { IGetMembers } from "@/features/teams/types";
import { useDataTable } from "@/hooks/use-data-table";
import { useFilterParams } from "@/hooks/use-filter-params";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsString } from "nuqs";
import { columns } from "./columns";

interface TeamMembersTableProps {
  teamId: number;
}

export function TeamMembersTable({ teamId }: TeamMembersTableProps) {
  const t = useTranslations();
  const { user, isOwner } = useUser();
  const { params, handleSubmit, handleReset } = useFilterParams({
    parsers: {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(10),
      search: parseAsString,
    },
  });

  const {
    data: membersResponse,
    isPending,
    isFetching,
  } = useGetMembers({
    teamId,
    page: params.page,
    limit: params.perPage,
    search: params.search,
  });

  const members = membersResponse?.data ?? [];
  const pageCount = membersResponse?.meta?.totalPages ?? 1;
  const tableColumns = columns(teamId, t, isOwner(teamId), user);

  const { table } = useDataTable({
    data: members,
    columns: tableColumns,
    pageCount,
    shallow: true,
  });

  if (isPending) {
    return (
      <DataTableSkeleton columnCount={columns.length} filterCount={1} rowCount={5} />
    );
  }

  return (
    <>
      <FormFilter<IGetMembers>
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
    </>
  );
}
