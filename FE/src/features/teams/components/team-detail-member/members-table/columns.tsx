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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { TEAM_ROLE_OPTIONS } from "@/constants/options";
import { ETEAM_ROLE } from "@/enums";
import { useRemoveMember, useUpdateMember } from "@/features/teams/hooks";
import { ITeamMember } from "@/features/teams/types";
import { TFunction } from "@/i18n/config";
import { formatDate } from "@/lib/format";
import { Column, ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
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
          <DropdownMenuItem onClick={() => setDeleteOpen(true)} disabled={currentUser}>
            <Icons.trash className="mr-2 h-4 w-4 text-destructive" />
            {t("Common.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

interface CellRoleProps {
  value: ETEAM_ROLE;
  teamId: number;
  userId: number;
  disabled?: boolean;
}

const CellRole = ({ value, teamId, userId, disabled }: CellRoleProps) => {
  const { handleUpdateMember, isPending } = useUpdateMember();

  const onValueChange = async (newRole: ETEAM_ROLE) => {
    if (newRole === value) return;
    handleUpdateMember(teamId, userId, newRole);
  };

  return (
    <Select disabled={isPending || disabled} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-26">
        <SelectValue placeholder="Chọn team" />
      </SelectTrigger>

      <SelectContent>
        {TEAM_ROLE_OPTIONS.map((option) => (
          <SelectItem
            disabled={ETEAM_ROLE.OWNER === option.value}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const columns = (
  teamId: number,
  t: TFunction,
  isTeamOwner: boolean,
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
              <AvatarImage src={row.original.avatar} alt={row.original.fullName} />
              <AvatarFallback>TN</AvatarFallback>
            </Avatar>
            <span className="truncate font-medium">{row.original.fullName}</span>
            {isCurrentUser && <Badge variant="secondary">You</Badge>}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      id: "email",
      enableSorting: true,
      header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
        <DataTableColumnHeader column={column} title={t("Column.email.label")} />
      ),
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
      cell: ({ row }) => {
        const currentUser = user?.id === row.original.id;

        return (
          <CellRole
            teamId={teamId}
            userId={row.original.id}
            value={row.original.teamRole}
            disabled={!isTeamOwner || currentUser}
          />
        );
      },
    },
    ...(isTeamOwner
      ? [
          {
            id: "actions",
            header: () => <div className="">{t("Column.actions")}</div>,
            cell: ({ row }: { row: any }) => (
              <CellAction data={row.original} teamId={teamId} t={t} user={user} />
            ),
          } satisfies ColumnDef<ITeamMember>,
        ]
      : []),
  ];
};
