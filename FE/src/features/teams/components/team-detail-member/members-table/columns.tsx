"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Icons } from "@/components/icons";
import { Column, ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ITeamMember } from "@/features/teams/types";
import { formatDate } from "@/lib/format";
import { ETEAM_ROLE } from "@/enums";
import { useUser } from "@/hooks/useUser";

function getInitials(name: string) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function TeamRoleBadge({ role }: { role: ETEAM_ROLE }) {
  if (role === ETEAM_ROLE.OWNER) {
    return <Badge variant="default">Owner</Badge>;
  }

  return <Badge variant="secondary">Member</Badge>;
}

export const columns: ColumnDef<ITeamMember>[] = [
  {
    id: "name",
    accessorKey: "fullName",
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title="Member" />
    ),
    cell: ({ row }) => {
      const { user } = useUser();
      const isCurrentUser = row.original.id === user?.id;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage
              src={row.original.avatar}
              alt={row.original.fullName}
            />
            <AvatarFallback>
              {getInitials(row.original.fullName)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate font-medium">{row.original.fullName}</span>
          {isCurrentUser && <Badge variant="secondary">You</Badge>}
        </div>
      );
    },
    meta: {
      label: "Member",
      placeholder: "Search members...",
      variant: "text" as const,
      iconCustom: <Icons.search className="size-4" />,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm font-medium">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm font-medium">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "teamRole",
    accessorKey: "teamRole",
    enableSorting: false,
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title="Team Role" />
    ),
    cell: ({ row }) => <TeamRoleBadge role={row.original.teamRole} />,
  },
];
