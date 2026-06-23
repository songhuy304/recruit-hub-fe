"use client";

import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateTeamForm } from "../forms/create-team-form";
import { JoinTeamForm } from "../forms/join-team-form";
import { useCreateTeam, useGetTeams } from "../hooks";
import type {
  CreateTeamFormValues,
  JoinTeamFormValues,
} from "../schemas/team.schema";
import { TeamMainPanel } from "./team-main-panel";
import { TeamSidebar } from "./team-sidebar";
import { ITeam } from "../types";
import PageSkeleton from "@/components/page-skeleton";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "next-intl";

type TeamSetupView = "overview" | "create" | "join";

function TeamSetupFlow() {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUser();
  const { data: teams = [], isLoading, isPending, isFetching } = useGetTeams();
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const { mutate: createTeam, isPending: isCreatePending } = useCreateTeam();
  const [view, setView] = useState<TeamSetupView>("overview");

  useEffect(() => {
    setSelectedTeam(
      teams.find((team) => team.id === user?.currentTeamId) ?? null,
    );
  }, [teams, user?.currentTeamId]);

  const handleCreateTeam = async (values: CreateTeamFormValues, form: any) => {
    createTeam(
      {
        logoUrl: values.logoUrl || null,
        name: values.name,
        slug: values.slug,
      },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          toast.error(t(error.message));
        },
      },
    );
  };

  const handleJoinTeam = async (values: JoinTeamFormValues) => {
    try {
      // TODO: connect to team join API
      toast.success(`Joined team with code ${values.inviteCode}`);
      setView("overview");
    } catch {
      toast.error("Failed to join team");
    }
  };

  const viewConfig: Record<TeamSetupView, React.ReactNode> = {
    create: (
      <CreateTeamForm
        onCancel={() => setView("overview")}
        onSubmit={handleCreateTeam}
        isPending={isCreatePending}
      />
    ),
    join: (
      <JoinTeamForm
        onCancel={() => setView("overview")}
        onSubmit={handleJoinTeam}
        isPending={isPending}
      />
    ),
    overview: <TeamMainPanel user={user} selectedTeam={selectedTeam} />,
  };

  const mainContent = viewConfig[view];

  const loading = isLoading || isPending;

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <Card className="gap-0 py-0 md:min-h-175">
      <div className="flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0 h-full">
        <TeamSidebar
          onSelectView={setView}
          selectedTeam={selectedTeam}
          setSelectedTeam={(value) => {
            setSelectedTeam(value);
            setView("overview");
          }}
          user={user}
          teams={teams}
          isLoading={loading}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex min-w-0 flex-1 flex-col p-6 overflow-y-auto"
          >
            {mainContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}

export { TeamSetupFlow };
