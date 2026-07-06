"use client";

import { Icons } from "@/components/icons";
import { AlertModal } from "@/components/modal/alert-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { ETEAM_ROLE } from "@/enums";
import { useRemoveMember } from "@/features/teams/hooks";
import { ITeamMember } from "@/features/teams/types";
import { TFunction } from "@/i18n/config";
import { formatDate } from "@/lib/format";
import { Column, ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

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

export interface CellActionProps {
  data: ITeamMember;
  teamId: number;
  t: TFunction;
  user: User | null;
}

export function CellAction({ data, teamId, t, user }: CellActionProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const currentUser = user?.id === data.id;
  const { mutate: removeMember, isPending } = useRemoveMember();

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          removeMember(
            { teamId, userId: data.id },
            {
              onSuccess: () => {
                setDeleteOpen(false);
              },
            }
          );
        }}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="flex justify-center">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Icons.ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            disabled={currentUser}
          >
            <Icons.trash className="mr-2 h-4 w-4 text-destructive" />
            {t("Common.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const columns = (
  teamId: number,
  t: TFunction,
  isOwner: boolean,
  user: User | null
): ColumnDef<ITeamMember>[] => {
  return [
    {
      id: "name",
      accessorKey: "fullName",
      header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
        <DataTableColumnHeader column={column} title={t("Column.user")} />
      ),
      cell: ({ row }) => {
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
            <span className="truncate font-medium">
              {row.original.fullName}
            </span>
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
      header: t("Column.email.label"),
      cell: ({ cell }) => (
        <span className="text-muted-foreground text-sm font-medium">
          {cell.getValue<ITeamMember["email"]>()}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("Column.joined.label"),
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
        <DataTableColumnHeader column={column} title={t("Column.role.label")} />
      ),
      cell: ({ cell }) => (
        <TeamRoleBadge role={cell.getValue<ITeamMember["teamRole"]>()} />
      ),
    },
    ...(isOwner
      ? [
          {
            id: "actions",
            header: () => <div className="">{t("Column.actions")}</div>,
            cell: ({ row }: { row: any }) => (
              <CellAction
                data={row.original}
                teamId={teamId}
                t={t}
                user={user}
              />
            ),
          } satisfies ColumnDef<ITeamMember>,
        ]
      : []),
  ];
};
