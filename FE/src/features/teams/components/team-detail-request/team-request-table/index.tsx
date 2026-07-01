'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useGetTeamRequest } from '@/features/teams/hooks';
import { useDataTable } from '@/hooks/use-data-table';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { columns } from './columns';
import { useTranslations } from 'next-intl';

interface TeamRequestTableProps {
  teamId: number;
}

export function TeamRequestTable({ teamId }: TeamRequestTableProps) {
  const t = useTranslations();
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString
  });

  const { data: requestsResponse, isPending, isFetching } = useGetTeamRequest({
    teamId,
    page: params.page,
    limit: params.perPage,
    ...(params.name && { search: params.name })
  });

  const requests = requestsResponse?.data ?? [];
  const pageCount = requestsResponse?.meta?.totalPages ?? 1;
  const tableColumns = columns(teamId, t);

  const { table } = useDataTable({
    data: requests,
    columns: tableColumns,
    pageCount,
    shallow: true,
    debounceMs: 500
  });

  if (isPending) {
    return <DataTableSkeleton columnCount={tableColumns.length} filterCount={1} rowCount={5} />;
  }

  return (
    <DataTable table={table} isLoading={isFetching}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
