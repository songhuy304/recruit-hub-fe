"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { useFormFields } from "@/components/ui/tanstack-form";
import { Icons } from "@/components/icons";
import { useGetMembers } from "@/features/teams/hooks";
import { ITeamMember } from "@/features/teams/types";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { CreateJobFormValues } from "../schemas";
import { MemberOptionRow } from "./job-member-option-row";

function buildCurrentMemberFromUser(user: User): ITeamMember {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    avatar: user.avatar,
    role: "",
    isVerified: user.isVerified,
    teamRole: user.currentTeam?.teamRole ?? user.role,
    createdAt: "",
    updatedAt: "",
  };
}

export function JobHiringTeamCard() {
  const t = useTranslations();
  const { user } = useUser();
  const teamId = user?.currentTeamId ?? 0;
  const { FormComboboxField } = useFormFields<CreateJobFormValues>();

  const { data: membersResponse, isPending } = useGetMembers({
    teamId,
    page: 1,
    limit: 100,
    enabled: !!teamId,
  });

  const members = membersResponse?.data ?? [];

  const assigneeOptions = useMemo(
    () =>
      members.map((member) => ({
        value: String(member.id),
        label: <MemberOptionRow member={member} />,
        searchValue: `${member.fullName} ${member.email} ${member.role}`,
      })),
    [members]
  );

  const currentMember = useMemo(() => {
    const matchedMember = members.find((member) => member.id === user?.id);
    if (matchedMember) {
      return matchedMember;
    }

    return user ? buildCurrentMemberFromUser(user) : null;
  }, [members, user]);

  return (
    <Card className="border-primary/20 border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          {t("Jobs.hiring-team-title")}
        </CardTitle>
        <CardDescription className="text-xs">
          {t("Jobs.hiring-team-description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <FormComboboxField
          name="assigneeId"
          label={t("Jobs.hiring-team-assign-to")}
          required
          options={assigneeOptions}
          placeholder={t("Jobs.hiring-team-assign-to-placeholder")}
          searchPlaceholder={t("Jobs.hiring-team-assign-to-placeholder")}
          emptyText={isPending ? t("Common.loading") : t("Jobs.hiring-team-no-members")}
        />

        <div className="bg-muted/50 text-muted-foreground flex gap-2 rounded-md px-3 py-2.5 text-xs leading-relaxed">
          <Icons.info className="mt-0.5 size-4 shrink-0" />
          <p>{t("Jobs.hiring-team-info")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
