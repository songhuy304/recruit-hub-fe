"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { TeamAvatar } from "@/components/team-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";
import { useUploadFile } from "@/hooks/use-upload-file";
import { cn } from "@/lib/utils";

import { useDeleteTeam, useLeaveTeam } from "../../hooks";
import {
  createTeamSchema,
  type CreateTeamFormValues,
} from "../../schemas/team.schema";
import type { ITeam } from "../../types";

interface TeamDetailSettingProps {
  team: ITeam;
}

interface SettingsCardProps {
  title: string;
  description: string;
  variant?: "default" | "danger";
  children: React.ReactNode;
}

interface TeamAvatarUploadProps {
  value?: string;
  teamName: string;
  onChange: (url: string) => void;
}

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

function SettingsCard({
  title,
  description,
  variant = "default",
  children,
}: SettingsCardProps) {
  return (
    <Card
      className={cn(
        "gap-0 py-0",
        variant === "danger" && "border-destructive/40",
      )}
    >
      <CardContent className="flex flex-col gap-8 p-6 lg:flex-row lg:gap-12">
        <div className="shrink-0 lg:w-56 xl:w-64">
          <Typography
            as="h4"
            variant="label-lg"
            className={cn(variant === "danger" && "text-destructive")}
          >
            {title}
          </Typography>
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground mt-1.5"
          >
            {description}
          </Typography>
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </CardContent>
    </Card>
  );
}

function TeamAvatarUpload({
  value,
  teamName,
  onChange,
}: TeamAvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFile, isPending } = useUploadFile();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error("Image must be 2MB or smaller");
      return;
    }

    try {
      const response = await uploadFile({
        file,
        folderPath: "teams",
      });
      onChange(response.data.url);
    } catch {
      toast.error("Failed to upload avatar");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel>Team Avatar</FieldLabel>
      <div className="flex items-start gap-4">
        <TeamAvatar
          src={value || ""}
          fallback={teamName}
          className="size-16 rounded-xl"
        />
        <div className="flex flex-col gap-1.5">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => inputRef.current?.click()}
            isLoading={isPending}
          >
            <Icons.upload className="size-4" />
            Change Avatar
          </Button>
          <Typography
            as="p"
            variant="paragraph-xs"
            className="text-muted-foreground"
          >
            JPG, PNG or GIF. Max size 2MB.
          </Typography>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

function DangerActionRow({
  icon: Icon,
  title,
  description,
  actionLabel,
  confirmTitle,
  confirmDescription,
  onConfirm,
  isPending = false,
}: DangerActionRowProps) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <div className="bg-destructive/15 flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-destructive size-5" />
        </div>
        <div className="min-w-0">
          <Typography as="p" variant="label-sm">
            {title}
          </Typography>
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground mt-1"
          >
            {description}
          </Typography>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
          >
            {actionLabel}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={isPending}
              onClick={onConfirm}
            >
              {isPending ? "Processing..." : actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function TeamDetailSetting({ team }: TeamDetailSettingProps) {
  const router = useRouter();
  const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam();
  const { mutate: leaveTeam, isPending: isLeaving } = useLeaveTeam();

  const form = useAppForm({
    defaultValues: {
      name: team.name,
      slug: team.slug,
      logoUrl: team.logoUrl ?? "",
    } as CreateTeamFormValues,
    validators: {
      onSubmit: createTeamSchema,
    },
    onSubmit: () => {
      toast.info("Team update will be available soon");
    },
  });

  const { FormTextField } = useFormFields<CreateTeamFormValues>();

  useEffect(() => {
    form.reset({
      name: team.name,
      slug: team.slug,
      logoUrl: team.logoUrl ?? "",
    });
  }, [form, team.id, team.logoUrl, team.name, team.slug]);

  const handleDeleteTeam = () => {
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
        <form.AppForm>
          <form.Form className="flex flex-col gap-5 p-0">
            <FormTextField
              name="name"
              label="Team Name"
              placeholder="Enter team name"
            />

            <div className="flex flex-col gap-2">
              <FormTextField
                name="slug"
                label="Team Slug"
                placeholder="team-slug"
                disabled
              />
              <Typography
                as="p"
                variant="paragraph-xs"
                className="text-muted-foreground"
              >
                This is your team&apos;s unique identifier in URLs.
              </Typography>
            </div>

            <form.AppField name="logoUrl">
              {(field) => (
                <TeamAvatarUpload
                  value={field.state.value}
                  teamName={form.getFieldValue("name") || team.name}
                  onChange={field.handleChange}
                />
              )}
            </form.AppField>

            <div className="flex justify-end pt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form.Form>
        </form.AppForm>
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
            confirmDescription="You will lose access to all projects and resources in this team. You can rejoin later with an invite code."
            onConfirm={handleLeaveTeam}
            isPending={isLeaving}
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
          />
        </div>
      </SettingsCard>
    </div>
  );
}

export { TeamDetailSetting };
