"use client";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { InviteMemberForm } from "../forms/invite-member-form";
import { useInviteMembers } from "../hooks";
import { type InviteMemberFormValues } from "../schemas/team.schema";

import Image from "next/image";
import { Typography } from "@/components/ui/typography";

interface TeamDetailInviteProps {
  teamId?: number;
  onSkip?: () => void;
}

const TeamDetailInvite = ({ teamId, onSkip }: TeamDetailInviteProps) => {
  const t = useTranslations();
  const { mutate: inviteMembers, isPending } = useInviteMembers();

  const handleSubmit = (values: InviteMemberFormValues, form: any) => {
    if (!teamId) {
      toast.error(t("error.team.not-found"));
      return;
    }

    const emailList = values.emails.map((tag) => tag.text);

    inviteMembers(
      {
        teamId,
        emails: emailList,
        role: values.role,
      },
      {
        onSuccess: () => {
          toast.success(t("Invite.success"));
          form.reset();
        },
        onError: (error) => {
          toast.error(t(error.message || "Invite.error"));
        },
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
        <div className="grid md:grid-cols-[minmax(220px,1fr)_minmax(0,1.6fr)]">
          <div className="bg-muted/30 flex flex-col items-center justify-center gap-4 border-b p-8 text-center md:border-r md:border-b-0">
            <div className="relative size-40 mb-2">
              <Image
                src="/assets/invitation.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center">
              <Typography align="center" variant="h4">{t("Invite.sidebar-title")}</Typography>
              <Typography align="center" variant="paragraph-sm" className="text-muted-foreground">
                {t("Invite.sidebar-description")}
              </Typography>
            </div>
          </div>
          <InviteMemberForm
            onSkip={onSkip}
            onSubmit={handleSubmit}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export { TeamDetailInvite };
