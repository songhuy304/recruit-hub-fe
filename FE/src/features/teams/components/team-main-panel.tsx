"use client";

import { Icons } from "@/components/icons";
import { TeamAvatar } from "@/components/team-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsUnderline } from "@/components/ui/tabs-underline";
import { Typography } from "@/components/ui/typography";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTokens } from "@/store";
import { useRouter } from "next/navigation";
import { parseAsStringEnum, useQueryStates } from "nuqs";
import { useState } from "react";
import { useGetTeamStatistics, useSwitchTeam } from "../hooks";
import { ETEAM_TYPE, type ITeam } from "../types";
import { TeamDetailInvite } from "./team-detail-invite";
import { TeamDetailMember } from "./team-detail-member/team-detail-member";
import { TeamDetailOverview } from "./team-detail-overview";
import { TeamDetailSetting } from "./team-detail-setting/team-detail-setting";

interface TeamMainPanelProps {
  selectedTeam: ITeam | null;
  user: User | null;
}

export type TeamMainPanelTab = 'overview' | 'members' | 'joins' | 'invites' | 'settings';

function TeamMainPanel({ selectedTeam, user }: TeamMainPanelProps) {
  const [params, setParams] = useQueryStates({
    tab: parseAsStringEnum<TeamMainPanelTab>(['overview', 'members', 'joins', 'invites', 'settings']).withDefault('overview'),
  });
  const isCurrentTeamId = user?.currentTeamId === selectedTeam?.id;
  const isPersonalAccount = selectedTeam?.type === ETEAM_TYPE.PERSONAL;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: switchTeam, isPending } = useSwitchTeam();
  const { data: teamStatistics, isPending: isTeamStatisticsPending } = useGetTeamStatistics(
    {
      id: selectedTeam?.id || 0,
      enabled: !!selectedTeam?.id && selectedTeam?.type !== ETEAM_TYPE.PERSONAL,
    }
  );


  const onSetTab = (tab: TeamMainPanelTab) => {
    void setParams({
      tab: tab as TeamMainPanelTab | undefined,
    });
  };

  const handleSwitchTeam = (teamId: number) => {
    switchTeam(teamId, {
      onSuccess: (data) => {
        dispatch(setTokens(data.data));
        router.refresh();
      },
    });
  };

  if (!selectedTeam) {
    return (
      <div className="flex items-center justify-center h-full">
        <Typography as="p" variant="paragraph-sm" className="text-muted-foreground">
          No team selected. Please select a team to view its details.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <TeamAvatar
          src={selectedTeam?.logoUrl || ""}
          fallback={selectedTeam?.name || ""}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Typography as="h3" variant="h4" className="font-semibold">
              {selectedTeam?.name}
            </Typography>
            {isCurrentTeamId && <Badge variant="success">Current</Badge>}
          </div>
          <Badge variant="secondary">
            <Typography as="p" variant="paragraph-xs" copy>
              #{selectedTeam?.inviteCode}
            </Typography>
          </Badge>
        </div>
        {!isCurrentTeamId && (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleSwitchTeam(selectedTeam?.id || 0)}
            disabled={isPending}
            isLoading={isPending}
          >
            <Icons.chevronLeft className="size-4" />
            Switch team
          </Button>
        )}
      </div>
      {isPersonalAccount ? (
        <div className="flex items-center justify-center gap-2 h-full">
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground"
          >
            This workspace belongs only to you. Create or switch to a team to
            collaborate with others.
          </Typography>
        </div>
      ) : (
        <TabsUnderline
          value={params.tab || 'overview'}
          onValueChange={(value) => onSetTab(value as TeamMainPanelTab)}
          className="gap-6"
          items={[
            {
              value: "overview",
              label: "Overview",
              icon: Icons.adjustments,
              content: <TeamDetailOverview />,
            },
            {
              value: "members",
              label: "Members",
              count: teamStatistics?.members || 0,
              isLoading: isTeamStatisticsPending,
              icon: Icons.user,
              content: <TeamDetailMember teamId={selectedTeam?.id} />,
            },
            {
              value: "joins",
              label: "Join Requests",
              count: teamStatistics?.joinRequests || 0,
              isLoading: isTeamStatisticsPending,
              icon: Icons.userPlus,
              content: <TeamDetailMember teamId={selectedTeam?.id} />,
            },
            {
              value: "invites",
              label: "Invites",
              count: teamStatistics?.invites || 0,
              isLoading: isTeamStatisticsPending,
              icon: Icons.mail,
              content: (
                <TeamDetailInvite
                  teamId={selectedTeam?.id}
                  onSkip={() => onSetTab("overview")}
                />
              ),
            },
            {
              value: "settings",
              label: "Settings",
              icon: Icons.settings,
              content: <TeamDetailSetting team={selectedTeam!} />,
            },
          ]}
        />
      )}
    </div >
  );
}

export { TeamMainPanel };

