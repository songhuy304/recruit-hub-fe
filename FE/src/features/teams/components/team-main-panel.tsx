"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsUnderline } from "@/components/ui/tabs-underline";
import { Typography } from "@/components/ui/typography";
import { ETEAM_TYPE, type ITeam } from "../types";
import { TeamDetailInvite } from "./team-detail-invite";
import { TeamDetailMember } from "./team-detail-member";
import { TeamDetailOverview } from "./team-detail-overview";
import { TeamDetailSetting } from "./team-detail-setting/team-detail-setting";
import { useSwitchTeam } from "../hooks";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTokens } from "@/store";
import { TeamAvatar } from "@/components/team-avatar";

interface TeamMainPanelProps {
  selectedTeam: ITeam | null;
  user: User | null;
}

function TeamMainPanel({ selectedTeam, user }: TeamMainPanelProps) {
  const isCurrentTeamId = user?.currentTeamId === selectedTeam?.id;
  const isPersonalAccount = selectedTeam?.type === ETEAM_TYPE.PERSONAL;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: switchTeam, isPending } = useSwitchTeam();

  const handleSwitchTeam = (teamId: number) => {
    switchTeam(teamId, {
      onSuccess: (data) => {
        dispatch(setTokens(data.data));
        router.refresh();
      },
    });
  };
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 pb-4 sm:gap-6">
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
            {isCurrentTeamId && <Badge variant="success">Active</Badge>}
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
          defaultValue="overview"
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
              icon: Icons.user,
              content: <TeamDetailMember />,
            },
            {
              value: "invites",
              label: "Invites",
              icon: Icons.mail,
              content: <TeamDetailInvite />,
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
    </div>
  );
}

export { TeamMainPanel };
