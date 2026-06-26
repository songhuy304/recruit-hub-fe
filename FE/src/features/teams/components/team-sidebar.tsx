"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ITeam } from "../types";
import { TeamAvatar } from "../../../components/team-avatar";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface TeamSidebarProps {
  onSelectView: (view: "create" | "join") => void;
  teams: ITeam[];
  isLoading: boolean;
  selectedTeam: ITeam | null;
  setSelectedTeam: (team: ITeam | null) => void;
  user: User | null;
}

function TeamSidebarItem({
  team,
  isSelected,
  isCurrent,
  onSelect,
}: {
  team: ITeam;
  isSelected: boolean;
  isCurrent: boolean;
  onSelect: (team: ITeam) => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(team)}
      className={cn(
        "h-auto w-full justify-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-300 relative",
        isSelected && "bg-accent",
      )}
    >
      <TeamAvatar
        src={team.logoUrl || ""}
        fallback={team.name || ""}
        size="sm"
      />

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <Typography
            as="span"
            variant="label-sm"
            truncate
            className="block w-full"
          >
            {team.name}
          </Typography>

          <Typography
            as="span"
            variant="paragraph-xs"
            truncate
            color="muted"
            className="block w-full"
          >
            {team.slug}
          </Typography>
        </div>

        {isCurrent && (
          <Badge variant="success" className="text-xs">
            Current
          </Badge>
        )}
      </div>

      <div
        data-selected={isSelected}
        className="
          absolute left-0 top-1/4 bottom-1/4
          w-1 rounded-r-full
          hidden sm:block
          data-[selected=true]:bg-primary
          transition-all duration-300
          "
      />
    </Button>
  );
}

function TeamSidebar({
  onSelectView,
  teams,
  isLoading,
  selectedTeam,
  setSelectedTeam,
  user,
}: TeamSidebarProps) {
  const handleSelectTeam = (team: ITeam) => {
    setSelectedTeam(team);
  };


  return (
    <aside className="flex w-full shrink-0 flex-col lg:w-80 h-full relative overflow-hidden">
      <LoadingOverlay loading={isLoading} />
      <div className="mt-4 px-5">
        <div className="mb-2 flex items-center justify-between">
          <Typography
            as="span"
            variant="subheading-2xs"
            className="text-muted-foreground"
          >
            YOUR TEAMS ({teams.length - 1}/5)
          </Typography>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => onSelectView("create")}
          >
            <Icons.add className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-0.5">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-muted h-12 animate-pulse rounded-lg" />
            ))
          ) : teams.length === 0 ? (
            <Typography
              as="p"
              variant="paragraph-sm"
              className="
              text-muted-foreground 
              px-3 py-4 text-center
              "
            >
              No teams yet
            </Typography>
          ) : (
            teams.map((team) => (
              <TeamSidebarItem
                key={team.id}
                team={team}
                isSelected={selectedTeam?.id === team.id}
                isCurrent={user?.currentTeamId === team.id}
                onSelect={handleSelectTeam}
              />
            ))
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t p-4">
        <Button
          variant="outline"
          onClick={() => onSelectView("create")}
          className="h-auto flex-col items-start gap-1 rounded-lg px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <Icons.add className="size-4" />
            <Typography as="span" variant="label-sm">
              Create your team
            </Typography>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => onSelectView("join")}
          className="h-auto flex-col items-start gap-1 rounded-lg px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <Icons.user className="size-4" />
            <Typography as="span" variant="label-sm">
              Join team
            </Typography>
          </div>
        </Button>
      </div>
    </aside>
  );
}

export { TeamSidebar };
