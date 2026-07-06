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
import { useGetTeamStatistics, useSwitchTeam } from "../hooks";
import { ETEAM_TYPE, type ITeam } from "../types";
import { TeamDetailInvite } from "./team-detail-invite";
import { TeamDetailMember } from "./team-detail-member/team-detail-member";
import { TeamDetailOverview } from "./team-detail-overview";
import { TeamDetailSetting } from "./team-detail-setting/team-detail-setting";
import { TeamDetailRequest } from "./team-detail-request/team-detail-request";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useEffect } from "react";

interface TeamMainPanelProps {
  selectedTeam: ITeam | null;
  user: User | null;
}

enum TeamMainPanelTab {
  OVERVIEW = "overview",
  MEMBERS = "members",
  JOINS = "joins",
  INVITES = "invites",
  SETTINGS = "settings",
}

const TEAM_MAIN_PANEL_TABS = Object.values(TeamMainPanelTab);

function TeamMainPanel({ selectedTeam, user }: TeamMainPanelProps) {
  const [params, setParams] = useQueryStates({
    tab: parseAsStringEnum<TeamMainPanelTab>(TEAM_MAIN_PANEL_TABS).withDefault(
      TeamMainPanelTab.OVERVIEW
    ),
  });
  const isCurrentTeamId = user?.currentTeamId === selectedTeam?.id;
  const isPersonalAccount = selectedTeam?.type === ETEAM_TYPE.PERSONAL;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: switchTeam, isPending } = useSwitchTeam();
  const { isOwner } = useUser();
  const {
    data: teamStatistics,
    isPending: isTeamStatisticsPending,
    refetch: refetchTeamStatistics,
  } = useGetTeamStatistics({
    id: selectedTeam?.id || 0,
    enabled: !!selectedTeam?.id && selectedTeam?.type !== ETEAM_TYPE.PERSONAL,
  });

  const onSetTab = (tab: TeamMainPanelTab) => {
    void setParams({
      tab: tab,
    });
  };

  useEffect(() => {
    if (selectedTeam?.type !== ETEAM_TYPE.PERSONAL) {
      refetchTeamStatistics();
    }
  }, [selectedTeam]);

  const handleSwitchTeam = (teamId: number) => {
    switchTeam(teamId, {
      onSuccess: (data) => {
        dispatch(setTokens(data.data));
        router.refresh();
      },
    });
  };

  const TabsOptions = [
    {
      value: TeamMainPanelTab.OVERVIEW,
      label: "Overview",
      icon: Icons.adjustments,
      content: <TeamDetailOverview />,
    },
    {
      value: TeamMainPanelTab.MEMBERS,
      label: "Members",
      count: teamStatistics?.members || 0,
      isLoading: isTeamStatisticsPending,
      icon: Icons.user,
      content: <TeamDetailMember teamId={selectedTeam?.id || 0} />,
    },
    ...(isOwner(selectedTeam?.id || 0)
      ? [
          {
            value: TeamMainPanelTab.JOINS,
            label: "Join Requests",
            count: teamStatistics?.joinRequests || 0,
            isLoading: isTeamStatisticsPending,
            icon: Icons.userPlus,
            content: <TeamDetailRequest teamId={selectedTeam?.id || 0} />,
          },
        ]
      : []),
    {
      value: TeamMainPanelTab.INVITES,
      label: "Invites",
      count: teamStatistics?.invites || 0,
      isLoading: isTeamStatisticsPending,
      icon: Icons.mail,
      content: (
        <TeamDetailInvite
          teamId={selectedTeam?.id}
          onSkip={() => onSetTab(TeamMainPanelTab.OVERVIEW)}
        />
      ),
    },
    {
      value: TeamMainPanelTab.SETTINGS,
      label: "Settings",
      icon: Icons.settings,
      content: <TeamDetailSetting team={selectedTeam!} />,
    },
  ];

  if (!selectedTeam) {
    return (
      <div className="flex items-center justify-center h-full">
        <Typography
          as="p"
          variant="paragraph-sm"
          className="text-muted-foreground"
        >
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
          {!isPersonalAccount && (
            <Badge variant="secondary">
              <Typography as="p" variant="paragraph-xs" copy>
                #{selectedTeam?.inviteCode}
              </Typography>
            </Badge>
          )}
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
        <div className="relative flex h-full min-h-130 items-center justify-center overflow-hidden px-4 py-10 text-center shadow-sm sm:px-8">
          <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
            <span>
              <Image
                src={"/assets/project-management.png"}
                alt="Project Management"
                width={140}
                height={100}
              />
            </span>
            <div className="space-y-4 text-center max-w-2xl">
              <Typography
                as="h2"
                variant="h3"
                className="font-semibold"
                align="center"
              >
                Welcome to your Personal Account
              </Typography>
              <Typography
                as="p"
                align="center"
                variant="paragraph-sm"
                color="muted"
              >
                This is your personal workspace. You can use it to organize your
                work, manage your projects, and collaborate with others when
                you&apos;re ready.
              </Typography>
            </div>

            <div className="h-px w-full bg-border/70" />

            <div className="space-y-5">
              <Typography as="p" variant="paragraph-md" className="font-medium">
                Get started by creating a project or inviting teammates.
              </Typography>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button className="gap-2 px-8 py-6 text-base font-semibold">
                  <Icons.add className="size-5" />
                  Create a project
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 px-8 py-6 text-base font-semibold"
                >
                  <Icons.userPlus className="size-5" />
                  Invite people
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TabsUnderline
          value={params.tab || TeamMainPanelTab.OVERVIEW}
          onValueChange={(value) => onSetTab(value as TeamMainPanelTab)}
          className="gap-6"
          items={TabsOptions}
        />
      )}
    </div>
  );
}

export { TeamMainPanel };
