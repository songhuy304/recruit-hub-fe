'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { useMutationJoinRequest } from '@/features/teams/hooks';
import { ITeamMember } from '@/features/teams/types';
import { TFunction } from '@/i18n/config';
import { formatDate } from '@/lib/format';
import { Column, ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

interface CellActionProps {
  data: ITeamMember;
  teamId: number;
}

function CellAction({ data, teamId }: CellActionProps) {
  const t = useTranslations();
  const { mutate, isPending } = useMutationJoinRequest();

  const handleJoinRequest = (action: 'approve' | 'reject') => {
    mutate({
      action,
      payload: {
        teamId,
        id: data.id
      }
    });
  };

  return (
    <div className='flex gap-2 items-center justify-center'>
      <Button variant='success' isLoading={isPending} onClick={() => handleJoinRequest('approve')}>
        <Icons.checks className='size-4' />
        {t('Common.approve')}
      </Button>

      <Button variant='destructive' isLoading={isPending} onClick={() => handleJoinRequest('reject')}>
        <Icons.xCircle className='size-4' />
        {t('Common.reject')}
      </Button>
    </div >
  );
}

export const columns = (teamId: number, t: TFunction): ColumnDef<ITeamMember>[] => [
  {
    id: 'name',
    accessorKey: 'fullName',
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <Avatar className='size-10'>
          <AvatarImage src={row.original.avatar} alt={row.original.fullName} />
          <AvatarFallback>{(row.original.fullName)}</AvatarFallback>
        </Avatar>
        <span className='truncate font-medium'>{row.original.fullName}</span>
      </div>
    ),
    meta: {
      label: 'User',
      placeholder: 'Search members...',
      variant: 'text' as const,
      iconCustom: <Icons.search className='size-4' />
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      row.original.email
    )
  },

  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm font-medium'>
        {formatDate(row.original.createdAt)}
      </span>
    )
  },
  {
    id: 'actions',
    header: () => (
      <div className='text-center'>
        Actions
      </div>
    ),
    cell: ({ row }) => (
      <CellAction data={row.original} teamId={teamId} />
    )
  }
];
