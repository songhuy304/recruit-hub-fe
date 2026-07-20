import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IJob } from "@/features/job/types";
import { ITeamMember } from "@/features/teams/types";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
] as const;

const MAX_VISIBLE = 3;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

interface JobCardAvatarGroupProps {
  members: ITeamMember[] | undefined;
  className?: string;
}

export function JobCardAvatarGroup({ members, className }: JobCardAvatarGroupProps) {
  const visibleMembers = members?.slice(0, MAX_VISIBLE) || [];
  const overflowCount = (members?.length || 0) - visibleMembers.length;

  if (members?.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)}>
      {visibleMembers.map((member, index) => (
        <Avatar
          key={member.id}
          className={cn("border-background size-7 border-2", index > 0 && "-ml-2")}
        >
          {member.avatar ? (
            <AvatarImage src={member.avatar} alt={member.fullName} />
          ) : null}
          <AvatarFallback
            className={cn("text-[10px] font-semibold", getAvatarColor(index))}
          >
            {getInitials(member.fullName)}
          </AvatarFallback>
        </Avatar>
      ))}
      {overflowCount > 0 && (
        <div className="border-background bg-muted text-muted-foreground -ml-2 flex size-7 items-center justify-center rounded-full border-2 text-[10px] font-medium">
          +{overflowCount}
        </div>
      )}
    </div>
  );
}
