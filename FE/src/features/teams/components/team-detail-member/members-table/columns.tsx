'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Icons } from '@/components/icons';
import { Column, ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { ITeamMember } from '@/features/teams/types';

function getInitials(name: string) {
  if (!name) return '?';

  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function TeamRoleBadge({ role }: { role: string }) {
  const normalizedRole = role?.toUpperCase();

  if (normalizedRole === 'OWNER') {
    return (
      <Badge
        variant='default'
        className='bg-indigo-600 font-medium text-white hover:bg-indigo-600'
      >
        Owner
      </Badge>
    );
  }

  if (normalizedRole === 'ADMIN') {
    return (
      <Badge variant='default' className='bg-blue-600 font-medium text-white hover:bg-blue-600'>
        Admin
      </Badge>
    );
  }

  return <Badge variant='secondary'>Member</Badge>;
}

export const columns: ColumnDef<ITeamMember>[] = [
  {
    id: 'name',
    accessorKey: 'fullName',
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title='Member' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <Avatar className='size-10'>
          <AvatarImage src={row.original.avatar} alt={row.original.fullName} />
          <AvatarFallback>{getInitials(row.original.fullName)}</AvatarFallback>
        </Avatar>
        <span className='truncate font-medium'>{row.original.fullName}</span>
      </div>
    ),
    meta: {
      label: 'Member',
      placeholder: 'Search members...',
      variant: 'text' as const,
      icon: Icons.text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
    cell: ({ cell }) => (
      <span className='text-muted-foreground text-sm font-medium'>
        {cell.getValue<ITeamMember['email']>()}
      </span>
    )
  },
  {
    id: 'role',
    accessorKey: 'role',
    enableSorting: false,
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title='System Role' />
    ),
    cell: ({ cell }) => (
      <Badge variant='outline' className='capitalize'>
        {cell.getValue<ITeamMember['role']>()?.toLowerCase() || 'member'}
      </Badge>
    )
  },
  {
    id: 'teamRole',
    accessorKey: 'teamRole',
    enableSorting: false,
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title='Team Role' />
    ),
    cell: ({ cell }) => <TeamRoleBadge role={cell.getValue<ITeamMember['teamRole']>()} />
  },
  {
    id: 'status',
    accessorKey: 'isVerified',
    enableSorting: false,
    header: 'STATUS',
    cell: ({ cell }) => {
      const isVerified = cell.getValue<ITeamMember['isVerified']>();

      if (isVerified) {
        return (
          <Badge variant='success' className='gap-1'>
            <Icons.check className='size-3' />
            Verified
          </Badge>
        );
      }

      return (
        <Badge variant='secondary' className={cn('text-muted-foreground')}>
          Pending
        </Badge>
      );
    }
  }
];
