'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useGetMembers } from '@/features/teams/hooks';
import { useDataTable } from '@/hooks/use-data-table';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { columns } from './columns';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useTranslations } from 'next-intl';
import { useUser } from '@/hooks/useUser';

interface TeamMembersTableProps {
  teamId: number;
}

export function TeamMembersTable({ teamId }: TeamMembersTableProps) {
  const t = useTranslations();
  const { user, isOwner } = useUser()
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString
  });

  const { data: membersResponse, isPending, isFetching } = useGetMembers({
    teamId,
    page: params.page,
    limit: params.perPage,
    ...(params.name && { search: params.name })
  });

  const members = membersResponse?.data ?? [];
  const pageCount = membersResponse?.meta?.totalPages ?? 1;
  const tableColumns = columns(teamId, t, isOwner(teamId), user);

  const { table } = useDataTable({
    data: members,
    columns: tableColumns,
    pageCount,
    shallow: true,
    debounceMs: 500
  });

  if (isPending) {
    return <DataTableSkeleton columnCount={columns.length} filterCount={1} rowCount={5} />;
  }

  return (
    <DataTable table={table} isLoading={isFetching}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
