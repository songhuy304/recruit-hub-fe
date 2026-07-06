"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";

import { useDeleteTeam, useLeaveTeam, useUpdateTeam } from "../../hooks";
import type { ITeam } from "../../types";

import { UpdateTeamForm } from "../../forms/update-team-form";
import { SettingsCard } from "../settings-card";
import { DangerActionRow } from "./danger-action-row";

interface TeamDetailSettingProps {
  team: ITeam;
}

function TeamDetailSetting({ team }: TeamDetailSettingProps) {
  const router = useRouter();
  const { user, isOwner } = useUser();
  const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam();
  const { mutate: leaveTeam, isPending: isLeaving } = useLeaveTeam();
  const { handleUpdateTeam, isPending: isUpdating } = useUpdateTeam();
  const [isActiveTeamWarningOpen, setIsActiveTeamWarningOpen] = useState(false);

  const checkActiveTeam = () => {
    if (user?.currentTeamId === team.id) {
      setIsActiveTeamWarningOpen(true);
      return false;
    }
    return true;
  };

  const handleDeleteTeam = () => {
    if (!checkActiveTeam()) return;
    deleteTeam(team.id, {
      onSuccess: () => {
        toast.success("Team deleted successfully");
        router.refresh();
      },
      onError: () => {
        toast.error("Failed to delete team");
      },
    });
  };

  const handleLeaveTeam = () => {
    if (!checkActiveTeam()) return;
    leaveTeam(team.id, {
      onSuccess: () => {
        toast.success("You have left the team");
        router.refresh();
      },
      onError: () => {
        toast.error("Failed to leave team");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <SettingsCard
        title="General Settings"
        description="Update your team's basic information and avatar."
      >
        <UpdateTeamForm
          team={team}
          onSubmit={handleUpdateTeam}
          isPending={isUpdating}
          isOwner={isOwner(team.id)}
        />
      </SettingsCard>

      <SettingsCard
        title="Danger Zone"
        description="Irreversible and destructive actions for this team."
        variant="danger"
      >
        <div className="flex flex-col">
          <DangerActionRow
            icon={Icons.logout}
            title="Leave Team"
            description="Remove yourself from this workspace. You will lose access to all projects and team resources."
            actionLabel="Leave Team"
            confirmTitle="Leave this team?"
            confirmDescription="You'll lose access to this team's projects and resources. If you're the owner, leaving will permanently delete the team."
            onConfirm={handleLeaveTeam}
            isPending={isLeaving}
            onBeforeOpen={checkActiveTeam}
          />

          <Separator />

          <DangerActionRow
            icon={Icons.trash}
            title="Delete Team"
            description="Permanently delete this team and all of its data. This action cannot be undone."
            actionLabel="Delete Team"
            confirmTitle="Delete this team?"
            confirmDescription="This will permanently delete the team and all associated data. This action cannot be undone."
            onConfirm={handleDeleteTeam}
            isPending={isDeleting}
            onBeforeOpen={checkActiveTeam}
            disabled={!isOwner(team.id)}
          />
        </div>
      </SettingsCard>

      <AlertDialog
        open={isActiveTeamWarningOpen}
        onOpenChange={setIsActiveTeamWarningOpen}
      >
        <AlertDialogContent className="max-w-100">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full text-amber-600 dark:text-amber-500 mb-2">
              <Icons.warning className="size-6" />
            </div>
            <AlertDialogTitle className="text-xl font-bold">
              Không thể tiếp tục
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm text-center">
              Vui lòng chuyển sang một team khác trước khi tiếp tục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={() => setIsActiveTeamWarningOpen(false)}
            >
              Hủy bỏ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { TeamDetailSetting };
